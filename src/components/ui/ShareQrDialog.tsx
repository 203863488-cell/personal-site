import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink, QrCode, X } from "lucide-react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "../../languageContext";

function getShareUrl() {
  return window.location.href;
}

interface ShareQrDialogProps {
  buttonClassName?: string;
  buttonLabel?: string;
  compactDialog?: boolean;
}

export function ShareQrDialog({ buttonClassName = "", buttonLabel, compactDialog = false }: ShareQrDialogProps = {}) {
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { siteCopy } = useLanguage();
  const labels = siteCopy.topShowcase;
  const shareUrl = getShareUrl();

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch (error: unknown) {
      console.error("Failed to copy portfolio URL.", error);
      setCopyState("failed");
    }
  };

  const dialog = open ? (
    <div className={"fixed inset-0 z-[120] grid place-items-center px-4 py-8 sm:px-8" + (compactDialog ? " presentation-share-overlay" : "")}>
      <button
        type="button"
        className="absolute inset-0 bg-[#08111D]/72 backdrop-blur-md"
        aria-label={labels.closeShare}
        onClick={() => setOpen(false)}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-portfolio-title"
        aria-describedby="share-portfolio-description"
        className={"relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-[#F8FAF7] p-6 shadow-[0_30px_100px_rgba(8,17,29,0.36)] sm:p-8" + (compactDialog ? " presentation-share-dialog" : "")}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#4F9CF9]/18 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#5CC8A7]/18 blur-3xl" />

        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D8E0E7] bg-white/80 text-[#1F2933] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]"
          aria-label={labels.closeShare}
        >
          <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
        </button>

        <div className="relative text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#1F2933] text-white shadow-lg">
            <QrCode aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <h2 id="share-portfolio-title" className="mt-5 text-2xl font-semibold text-[#111827]">
            {labels.shareTitle}
          </h2>
          <p id="share-portfolio-description" className="mt-3 text-sm leading-6 text-[#5D6673]">
            {labels.shareDescription}
          </p>

          <div className="mx-auto mt-6 w-fit rounded-[1.5rem] border border-[#D8E0E7] bg-white p-4 shadow-[0_18px_55px_rgba(31,41,51,0.1)]">
            <QRCodeSVG
              value={shareUrl}
              size={232}
              level="H"
              marginSize={1}
              bgColor="#FFFFFF"
              fgColor="#111827"
              title={labels.shareTitle}
            />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{labels.shareUrlLabel}</p>
          <p className="mx-auto mt-2 max-w-sm break-all rounded-xl border border-[#E4E9EF] bg-white/72 px-4 py-3 text-xs leading-5 text-[#425466]">
            {shareUrl}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={copyShareUrl} className="primary-button min-h-12 gap-2 rounded-xl">
              {copyState === "copied" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              {copyState === "copied" ? labels.copied : copyState === "failed" ? labels.copyFailed : labels.copyLink}
            </button>
            <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="secondary-button min-h-12 gap-2 rounded-xl">
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              {labels.openShareLink}
            </a>
          </div>
        </div>
      </section>
    </div>
  ) : null;

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className={`secondary-button gap-2 ${buttonClassName}`}>
        <QrCode aria-hidden="true" className="h-4 w-4" />
        {buttonLabel ?? labels.shareAction}
      </button>
      {dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}

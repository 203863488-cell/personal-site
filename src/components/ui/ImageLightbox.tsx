import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { PortfolioImage } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { ZoomableImage } from "./ZoomableImage";

interface ImageLightboxProps {
  images: PortfolioImage[];
  activeIndex: number | null;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
  swipeEnabled?: boolean;
}

export function ImageLightbox({ images, activeIndex, onActiveIndexChange, onClose, swipeEnabled = false }: ImageLightboxProps) {
  const { language } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const isOpen = activeIndex !== null;
  const touchViewer = swipeEnabled || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onActiveIndexChange((activeIndex - 1 + images.length) % images.length);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onActiveIndexChange((activeIndex + 1) % images.length);
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusableElements[0];
        const last = focusableElements.at(-1);

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus({ preventScroll: true });
      previouslyFocusedRef.current = null;
    };
  }, [activeIndex, images.length, isOpen, onActiveIndexChange, onClose]);

  if (!isOpen || !images[activeIndex]) {
    return null;
  }

  const image = images[activeIndex];
  const hasMultipleImages = images.length > 1;
  const copy =
    language === "zh"
      ? {
          close: "关闭图片预览",
          dialog: "项目图片高清预览",
          next: "下一张图片",
          original: "在新窗口查看原图",
          previous: "上一张图片"
        }
      : {
          close: "Close image viewer",
          dialog: "Full-resolution project image",
          next: "Next image",
          original: "Open original image",
          previous: "Previous image"
        };

  return createPortal(
    <div
      ref={dialogRef}
      className={touchViewer ? "image-lightbox image-lightbox--touch" : "image-lightbox"}
      role="dialog"
      aria-modal="true"
      aria-label={copy.dialog}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="image-lightbox__toolbar">
        <span className="image-lightbox__counter">
          {activeIndex + 1} / {images.length}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={assetUrl(image.src)}
            target="_blank"
            rel="noopener noreferrer"
            className="image-lightbox__action"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">{copy.original}</span>
          </a>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="image-lightbox__icon-button" aria-label={copy.close}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {hasMultipleImages ? (
        <button
          type="button"
          className="image-lightbox__nav image-lightbox__nav--previous"
          aria-label={copy.previous}
          onClick={() => onActiveIndexChange((activeIndex - 1 + images.length) % images.length)}
        >
          <ChevronLeft aria-hidden="true" className="h-7 w-7" />
        </button>
      ) : null}

      <figure className="image-lightbox__figure">
        {touchViewer ? <ZoomableImage key={image.src} src={assetUrl(image.src)} alt={image.title} zh={language === "zh"}
          onSwipe={direction => { if (hasMultipleImages) onActiveIndexChange((activeIndex + direction + images.length) % images.length); }} />
          : <img src={assetUrl(image.src)} alt={image.title} className="image-lightbox__image" draggable={false} />}
        <figcaption className="image-lightbox__caption">
          <strong>{image.title}</strong>
          {image.description ? <span>{image.description}</span> : null}
        </figcaption>
      </figure>

      {hasMultipleImages ? (
        <button
          type="button"
          className="image-lightbox__nav image-lightbox__nav--next"
          aria-label={copy.next}
          onClick={() => onActiveIndexChange((activeIndex + 1) % images.length)}
        >
          <ChevronRight aria-hidden="true" className="h-7 w-7" />
        </button>
      ) : null}
    </div>,
    document.body
  );
}

import { assetUrl } from "../../utils/assetUrl";

const CLOSING_IMAGE = "images/ed3b9c61-6574-47e7-9f1f-f1a1d9248eb8.png";

export function ClosingVisual() {
  return (
    <section className="content-auto relative overflow-hidden border-b border-[#D8E0E7] bg-[#111827]" aria-label="Closing visual">
      <div className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[760px]">
        <img
          src={assetUrl(CLOSING_IMAGE)}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,247,0.5)_0%,rgba(248,250,247,0.22)_31%,rgba(17,24,39,0.08)_58%,rgba(17,24,39,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,247,0.16)_0%,rgba(248,250,247,0)_38%,rgba(17,24,39,0.16)_100%)]" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl px-5 py-16 sm:min-h-[620px] sm:px-8 lg:min-h-[760px] lg:px-10 lg:py-24">
          <div className="mt-8 max-w-xl text-[#111827] sm:mt-14 lg:mt-20">
            <h2 className="text-4xl font-semibold leading-[1.18] tracking-normal sm:text-5xl lg:text-6xl">
              追风赶月
              <span className="block">莫停留</span>
            </h2>
            <p className="mt-5 max-w-sm text-lg font-medium leading-8 text-[#1F2933]/82">
              平芜尽处是春山。
            </p>
            <div className="mt-8 h-px w-20 bg-[#111827]/70" />
          </div>
        </div>
      </div>
    </section>
  );
}

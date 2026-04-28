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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,247,0.68)_0%,rgba(248,250,247,0.22)_28%,rgba(17,24,39,0.05)_58%,rgba(17,24,39,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_19%_26%,rgba(248,250,247,0.78)_0%,rgba(248,250,247,0.26)_24%,rgba(248,250,247,0)_45%)]" />
        <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(248,250,247,0.22),rgba(248,250,247,0))]" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-14 sm:min-h-[620px] sm:px-8 lg:min-h-[760px] lg:px-10 lg:py-20">
          <div className="w-full max-w-[19rem] text-[#0F172A] sm:max-w-[24rem] lg:ml-4 lg:max-w-[30rem]">
            <div className="inline-flex flex-col [text-shadow:0_12px_30px_rgba(248,250,247,0.32)]">
              <h2 className="font-['STKaiti','KaiTi','FangSong','Songti_SC',serif] text-[3.15rem] font-semibold leading-[1.08] tracking-[0.14em] sm:text-[4.4rem] lg:text-[5.25rem]">
                <span className="block">追风赶月</span>
                <span className="mt-1 block">莫停留</span>
              </h2>
              <p className="mt-6 font-['FangSong','STFangsong','Songti_SC',serif] text-base leading-7 tracking-[0.28em] text-[#1E293B]/80 sm:text-[1.45rem] sm:leading-9">
                平芜尽处是春山。
              </p>
              <div className="mt-5 h-px w-18 bg-[#2563EB]/75 shadow-[0_0_24px_rgba(37,99,235,0.28)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

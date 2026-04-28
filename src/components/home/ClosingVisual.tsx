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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,247,0.62)_0%,rgba(248,250,247,0.28)_26%,rgba(17,24,39,0.04)_58%,rgba(17,24,39,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(248,250,247,0.72)_0%,rgba(248,250,247,0.32)_24%,rgba(248,250,247,0)_44%)]" />
        <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(248,250,247,0.22),rgba(248,250,247,0))]" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl px-5 py-14 sm:min-h-[620px] sm:px-8 lg:min-h-[760px] lg:px-10 lg:py-20">
          <div className="mt-4 max-w-[30rem] text-[#111827] sm:mt-8 lg:ml-2 lg:mt-10">
            <div className="inline-block rounded-sm border-l-4 border-[#2563EB] bg-white/28 px-6 py-5 shadow-[0_18px_55px_rgba(17,24,39,0.08)] backdrop-blur-[2px]">
              <h2 className="font-['STKaiti','KaiTi','FangSong','Songti_SC',serif] text-4xl font-semibold leading-[1.2] tracking-[0.04em] sm:text-5xl lg:text-6xl">
                追风赶月
                <span className="block">莫停留</span>
              </h2>
              <p className="mt-5 font-['FangSong','STFangsong','Songti_SC',serif] text-xl leading-8 tracking-[0.08em] text-[#1F2933]/88 sm:text-2xl">
                平芜尽处是春山。
              </p>
              <div className="mt-6 h-px w-24 bg-[#111827]/55" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

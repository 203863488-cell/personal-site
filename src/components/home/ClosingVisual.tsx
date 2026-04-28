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

        <div className="relative flex min-h-[520px] items-end px-5 pb-14 pt-14 sm:min-h-[620px] sm:px-8 sm:pb-18 sm:pt-16 lg:min-h-[760px] lg:px-14 lg:pb-24 lg:pt-20 xl:px-20">
          <div className="w-full max-w-[16rem] text-[#0F172A] sm:max-w-[20rem] lg:max-w-[24rem]">
            <div className="inline-flex flex-col">
              <h2 className="font-['STKaiti','KaiTi','FangSong','Songti_SC',serif] text-[3rem] font-semibold leading-[1.04] tracking-[0.16em] sm:text-[4.15rem] lg:text-[4.9rem]">
                <span className="block">追风赶月</span>
                <span className="mt-1 block">莫停留</span>
              </h2>
              <p className="mt-6 font-['FangSong','STFangsong','Songti_SC',serif] text-sm leading-7 tracking-[0.3em] text-[#1E293B]/76 sm:text-[1.2rem] sm:leading-8">
                平芜尽处是春山。
              </p>
              <div className="mt-5 h-px w-16 bg-[#2563EB]/72" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

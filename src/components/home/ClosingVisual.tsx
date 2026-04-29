import { assetUrl } from "../../utils/assetUrl";

const CLOSING_IMAGE = "images/ed3b9c61-6574-47e7-9f1f-f1a1d9248eb8.png";

export function ClosingVisual() {
  return (
    <section className="content-auto relative overflow-hidden border-b border-[#D8E0E7] bg-[#111827]" aria-label="Closing visual">
      <div className="relative min-h-[420px] sm:min-h-[620px] lg:min-h-[760px]">
        <img
          src={assetUrl(CLOSING_IMAGE)}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
        />

        <div className="relative flex min-h-[420px] items-end px-5 pb-10 pt-12 sm:min-h-[620px] sm:px-8 sm:pb-18 sm:pt-16 lg:min-h-[760px] lg:px-14 lg:pb-24 lg:pt-20 xl:px-20">
          <div className="w-full max-w-[13rem] text-[#0F172A] sm:max-w-[20rem] lg:max-w-[24rem]">
            <div className="inline-flex flex-col">
              <h2 className="font-['STKaiti','KaiTi','FangSong','Songti_SC',serif] text-[2.35rem] font-semibold leading-[1.02] tracking-[0.14em] sm:text-[4.15rem] sm:leading-[1.04] sm:tracking-[0.16em] lg:text-[4.9rem]">
                <span className="block">{"\u8FFD\u98CE\u8D76\u6708"}</span>
                <span className="mt-1 block">{"\u83AB\u505C\u7559"}</span>
              </h2>
              <p className="mt-4 font-['FangSong','STFangsong','Songti_SC',serif] text-[0.82rem] leading-6 tracking-[0.22em] text-[#1E293B]/76 sm:mt-6 sm:text-[1.2rem] sm:leading-8 sm:tracking-[0.3em]">
                {"\u5E73\u829C\u5C3D\u5904\u662F\u6625\u5C71\u3002"}
              </p>
              <div className="mt-4 h-px w-14 bg-[#2563EB]/72 sm:mt-5 sm:w-16" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

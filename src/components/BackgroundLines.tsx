export function BackgroundLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="vintage-canvas absolute inset-0" />
      <div className="vintage-bloom-left absolute -left-[14%] top-[-8%] h-[40rem] w-[40rem] rounded-full" />
      <div className="vintage-bloom-right absolute right-[-12%] top-[6%] h-[34rem] w-[34rem] rounded-full" />
      <div className="vintage-shadow-cast absolute left-[8%] top-[16%] h-[30rem] w-[58rem] rounded-full" />
      <div className="vintage-perspective-plane absolute bottom-[-18%] left-[-12%] h-[62%] w-[126%]" />
      <svg
        className="vintage-traces absolute left-1/2 top-[-4%] h-full w-[1680px] -translate-x-[53%]"
        viewBox="0 0 1680 1200"
        fill="none"
        aria-hidden="true"
      >
        <path d="M70 250H304C356 250 356 166 408 166H636" stroke="currentColor" strokeWidth="1.05" />
        <path d="M994 112H1194C1248 112 1248 226 1302 226H1518" stroke="currentColor" strokeWidth="1.05" />
        <path d="M126 826H386C430 826 430 722 474 722H740" stroke="currentColor" strokeWidth="1.05" />
        <path
          d="M864 850C934 782 996 920 1066 850C1136 782 1198 920 1268 850C1338 782 1400 920 1470 850"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect x="512" y="132" width="142" height="96" rx="8" stroke="currentColor" strokeWidth="0.95" />
        <rect x="1224" y="500" width="182" height="116" rx="12" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="836" cy="364" r="116" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 10" />
        <path d="M1054 610L1256 534" stroke="currentColor" strokeWidth="0.85" />
        <path d="M208 1036C300 960 392 1090 484 1012C576 934 668 1062 760 986" stroke="currentColor" strokeWidth="0.9" />
      </svg>
      <svg
        className="vintage-traces absolute left-1/2 top-[6%] hidden h-[92%] w-[1400px] -translate-x-[46%] opacity-65 md:block"
        viewBox="0 0 1400 980"
        fill="none"
        aria-hidden="true"
        style={{ animationDuration: "22s", animationDelay: "2s" }}
      >
        <path d="M102 144H286C330 144 330 88 374 88H518" stroke="currentColor" strokeWidth="0.85" />
        <path d="M882 314H1038C1076 314 1076 250 1114 250H1294" stroke="currentColor" strokeWidth="0.85" />
        <path d="M286 726H462C502 726 502 648 542 648H728" stroke="currentColor" strokeWidth="0.85" />
        <path d="M646 492C706 432 766 552 826 492C886 432 946 552 1006 492" stroke="currentColor" strokeWidth="0.95" />
        <rect x="954" y="104" width="124" height="92" rx="12" stroke="currentColor" strokeWidth="0.75" />
        <path d="M328 238C386 200 444 310 502 270" stroke="currentColor" strokeWidth="0.78" strokeDasharray="5 12" />
      </svg>
      <div className="vintage-foreground-mist absolute inset-0" />
      <div className="vintage-paper-grain absolute inset-0" />
      <div className="vintage-vignette absolute inset-0" />
    </div>
  );
}

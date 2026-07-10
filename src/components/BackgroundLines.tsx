export function BackgroundLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(89,108,130,0.052)_1px,transparent_1px),linear-gradient(90deg,rgba(89,108,130,0.052)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="ambient-lines absolute inset-0 opacity-70" />
      <svg
        className="signal-drawing absolute left-1/2 top-0 h-full w-[1500px] -translate-x-1/2 text-[#7AA2F7]/22"
        viewBox="0 0 1500 1100"
        fill="none"
        aria-hidden="true"
      >
        <path d="M80 230H320C360 230 360 160 400 160H620" stroke="currentColor" strokeWidth="1" />
        <path d="M940 120H1110C1160 120 1160 230 1210 230H1420" stroke="currentColor" strokeWidth="1" />
        <path d="M130 810H390C430 810 430 710 470 710H720" stroke="currentColor" strokeWidth="1" />
        <path
          d="M830 830C900 760 960 900 1030 830C1100 760 1160 900 1230 830C1300 760 1360 900 1430 830"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
    </div>
  );
}

import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";

interface NavbarProps {
  currentRoute: string;
}

const navItems = [
  { label: "首页", href: "#/" },
  { label: "电赛项目", href: "#/competition" },
  { label: "个人项目", href: "#/personal" },
  { label: "联系", href: "#/contact" }
];

export function Navbar({ currentRoute }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "#/") {
      return currentRoute === "/";
    }

    return currentRoute.startsWith(href.replace("#", ""));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8E0E7]/70 bg-[#F8FAF7]/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#/" className="text-base font-semibold text-[#111827]" onClick={() => setOpen(false)}>
          蓝宏涛
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition hover:text-[#111827] ${
                isActive(item.href) ? "font-semibold text-[#111827]" : "text-[#55616E]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a href={assetUrl("resume.pdf")} download className="secondary-button py-2">
            下载简历
          </a>
        </nav>

        <button
          type="button"
          aria-label="切换菜单"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D8E0E7] bg-white/70 text-[#1F2933] md:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <div className={`${open ? "block" : "hidden"} border-t border-[#D8E0E7]/70 bg-[#F8FAF7]/95 md:hidden`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-sm ${isActive(item.href) ? "font-semibold text-[#111827]" : "text-[#55616E]"}`}
            >
              {item.label}
            </a>
          ))}
          <a href={assetUrl("resume.pdf")} download className="secondary-button mt-2 w-fit py-2" onClick={() => setOpen(false)}>
            下载简历
          </a>
        </div>
      </div>
    </header>
  );
}

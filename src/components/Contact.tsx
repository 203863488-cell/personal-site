import type { Language } from "../types/language";

interface ContactProps {
  language: Language;
}

export function Contact({ language }: ContactProps) {
  return (
    <section id="contact" className="section-shell">
      <div className="border-t border-[#D8E0E7] pt-16">
        <p className="section-kicker">{language === "zh" ? "联系" : "Contact"}</p>
        <h2 className="section-title">
          {language === "zh"
            ? "欢迎交流电力电子硬件、嵌入式控制和功率变换器相关岗位机会"
            : "Open to opportunities in power electronics hardware, embedded control, and converter systems"}
        </h2>
        <p className="section-copy">
          {language === "zh"
            ? "当前内容先使用静态占位信息，后续你可以直接替换为真实邮箱、GitHub 地址、简历 PDF 和微信或电话。"
            : "The contact details are placeholders for now and can be replaced with your real email, GitHub, resume PDF, and phone or WeChat."}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="contact-card">
            <p className="contact-label">{language === "zh" ? "邮箱" : "Email"}</p>
            <p className="contact-value">your-email@example.com</p>
          </div>
          <div className="contact-card">
            <p className="contact-label">GitHub</p>
            <p className="contact-value">github.com/yourname</p>
          </div>
          <div className="contact-card">
            <p className="contact-label">{language === "zh" ? "简历 PDF" : "Resume PDF"}</p>
            <a href="./resume.pdf" download className="contact-link">
              {language === "zh" ? "点击下载" : "Download"}
            </a>
          </div>
          <div className="contact-card">
            <p className="contact-label">{language === "zh" ? "微信 / 电话" : "WeChat / Phone"}</p>
            <p className="contact-value">{language === "zh" ? "可按需补充" : "Available on request"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

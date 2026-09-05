import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, Award, ChevronLeft, ChevronRight, FileText, Grid2X2, Mail, Maximize, X } from "lucide-react";
import { DocumentMetadata } from "../components/DocumentMetadata";
import { ImageLightbox } from "../components/ui/ImageLightbox";
import { ShareQrDialog } from "../components/ui/ShareQrDialog";
import { projectCollections } from "../data/projectCatalog";
import { localizeProject } from "../data/siteCopy";
import { useLanguage } from "../languageContext";
import { getProjectHref } from "../routes/portfolioRoutes";
import { assetUrl } from "../utils/assetUrl";
import { responsiveImageSources } from "../utils/responsiveImage";
import { capabilities, powerProjects, slideNames } from "./content";
import { readSession, swipeDirection, writeSession, type SwipePoint } from "./interaction";
import { OfflinePreparation } from "./OfflinePreparation";

interface Props {
  onExit: () => void;
  onOpenProject: () => void;
}

function Photo({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const image = responsiveImageSources(src);
  return <img src={image.original} srcSet={image.srcSet} sizes="(max-width: 767px) 92vw, 48vw" alt={alt}
    className={className} loading={priority ? "eager" : "lazy"} decoding="async" draggable={false} />;
}

function initialSlide() {
  const value = Number(readSession("portfolio-presentation-slide", "0"));
  return Number.isInteger(value) && value >= 0 && value < 6 ? value : 0;
}

export function PresentationPage({ onExit, onOpenProject }: Props) {
  const { language, setLanguage, siteCopy } = useLanguage();
  const zh = language === "zh";
  const names = slideNames[language];
  const [active, setActive] = useState(initialSlide);
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const menuRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<(SwipePoint & { pointerId: number; locked: boolean }) | null>(null);
  const suppressClickUntil = useRef(0);
  const slideRef = useRef(active);
  const gallery = capabilities.map(item => ({
    src: item.image, title: zh ? item.title : item.en,
    description: zh ? item.description : item.descriptionEn, kind: "prototype" as const
  }));

  useEffect(() => {
    writeSession("portfolio-presentation-slide", String(active));
    slideRef.current = active;
  }, [active]);

  function goTo(index: number) {
    const next = Math.max(0, Math.min(5, index));
    if (next !== slideRef.current) {
      stageRef.current?.querySelectorAll<HTMLElement>(".presentation-slide")[next]?.scrollTo({ top: 0, behavior: "instant" });
      setActive(next);
      slideRef.current = next;
      writeSession("portfolio-presentation-slide", String(next));
    }
  }

  function clearGesture() {
    gesture.current = null;
    stageRef.current?.style.setProperty("--drag-x", "0px");
    stageRef.current?.classList.remove("is-dragging");
  }

  function pointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) { clearGesture(); return; }
    if (event.button !== 0 || (event.target as Element).closest("input, textarea, select, [data-no-swipe]")) return;
    gesture.current = { x: event.clientX, y: event.clientY, time: performance.now(), pointerId: event.pointerId, locked: false };
  }

  function pointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (!start.locked && Math.abs(y) > 14 && Math.abs(y) > Math.abs(x)) { clearGesture(); return; }
    if (Math.abs(x) > 12 && Math.abs(x) > Math.abs(y) * 1.5) {
      start.locked = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add("is-dragging");
      const resistance = (active === 0 && x > 0) || (active === 5 && x < 0) ? 0.18 : 0.65;
      event.currentTarget.style.setProperty("--drag-x", Math.max(-180, Math.min(180, x * resistance)) + "px");
    }
  }

  function pointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (start?.pointerId === event.pointerId && start.locked) {
      suppressClickUntil.current = performance.now() + 400;
      const direction = swipeDirection(start, { x: event.clientX, y: event.clientY, time: performance.now() }, event.currentTarget.clientWidth);
      if (direction) goTo(slideRef.current + direction);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    clearGesture();
  }

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else setNotice(zh ? "可从浏览器菜单选择全屏或添加到桌面。" : "Use your browser menu to enter fullscreen or add to home screen.");
    } catch {
      setNotice(zh ? "浏览器暂不支持全屏，可直接横屏展示。" : "Fullscreen is unavailable; landscape presentation still works.");
    }
  }

  function projectLink(id: string, label?: string) {
    return <a className="presentation-detail-link" href={getProjectHref(id)} onClick={onOpenProject}>
      {label ?? (zh ? "查看项目详情" : "Explore project")}<ArrowRight size={17} aria-hidden="true" />
    </a>;
  }

  function pageHeading(kicker: string, title: string, description?: string) {
    return <div className="presentation-page-heading">
      <p className="presentation-kicker">{kicker}</p><h2>{title}</h2>
      {description && <p className="presentation-description">{description}</p>}
    </div>;
  }

  const slides: ReactNode[] = [
    <div className="presentation-cover" key="intro">
      <Photo src="images/electronics-lab-oscilloscope.jpg" alt="" className="presentation-cover-photo" priority />
      <div className="presentation-cover-wash" />
      <div className="presentation-cover-copy">
        <p className="presentation-kicker">POWER ELECTRONICS PORTFOLIO / 2027</p>
        <h1>{zh ? "蓝宏涛" : "Hongtao Lan"}<span>{zh ? "电源硬件研发" : "Power Hardware Engineering"}</span></h1>
        <p className="presentation-intro">{zh ? "从电路与磁件设计，到 PCB、样机和实测验证。" : "From circuits and magnetics to PCB, working prototypes and measured results."}</p>
        <p className="presentation-education">{zh ? "深圳技术大学 · 应用物理学本科 · 2027 届" : "Shenzhen Technology University · Applied Physics · Class of 2027"}</p>
        <div className="presentation-cover-roles">
          <span><Award size={19} aria-hidden="true" />{zh ? "电赛队长兼硬件负责人" : "Contest captain & hardware lead"}</span>
          <span>{zh ? "三个电源项目 · 硬件负责人" : "Hardware lead · three power projects"}</span>
        </div>
        <button className="presentation-primary" onClick={() => goTo(1)}>{zh ? "开始了解我的项目" : "Explore my work"}<ArrowRight size={19} aria-hidden="true" /></button>
      </div>
      <aside className="presentation-cover-award">
        <Award size={29} aria-hidden="true" /><span>{zh ? "2026 全国大学生电子设计竞赛" : "2026 National Undergraduate Electronics Design Contest"}</span>
        <strong>{zh ? "省级一等奖" : "Provincial first prize"}</strong>
        <p>{zh ? "方案统筹 · 硬件设计 · 整机联调" : "Architecture · Hardware · System integration"}</p>
      </aside>
    </div>,
    <div className="presentation-page" key="contest">
      {pageHeading("01 / COMPETITION", zh ? "电赛成果" : "Competition", zh ? "图腾柱 PFC + 三相逆变 · AC-AC 变换系统" : "Totem-pole PFC + three-phase inverter · AC-AC conversion")}
      <div className="presentation-contest-grid">
        <div className="presentation-contest-photo">
          <Photo src="images/contest-2026-three-phase-waveform.jpg" alt={zh ? "三相逆变输出波形" : "Three-phase inverter output waveforms"} />
          <span className="presentation-photo-caption">{zh ? "三相逆变输出波形 · 整机联调记录" : "Three-phase inverter output · system integration record"}</span>
        </div>
        <div className="presentation-contest-copy">
          <span className="presentation-role">{zh ? "队长兼硬件负责人" : "Team captain & hardware lead"}</span>
          <ul className="presentation-work-list">
            <li><strong>{zh ? "竞赛描述：" : "Overview: "}</strong>{zh ? "主导并带领完成“市电输入—PFC 整流—三相逆变”两级功率变换系统的设计、级联与整机调试。" : "Led the design, cascading and system debugging of a two-stage power conversion system: mains input, PFC rectification and three-phase inversion."}</li>
            <li><strong>{zh ? "竞赛职责：" : "Responsibilities: "}</strong>{zh ? "担任队长兼硬件负责人，独立完成隔离采样、驱动及辅助模块的设计与调试，统筹前级 PFC 与后级三相逆变级联。" : "Team captain and hardware lead. Independently designed and debugged isolated sensing, drive and auxiliary modules, and coordinated cascading of the PFC front end with the three-phase inverter."}</li>
            <li><strong>{zh ? "竞赛成果：" : "Results: "}</strong>{zh ? "三相输出电压总谐波畸变率（THD）1.3%，交流输入功率因数（PF）0.99，获省一等奖。" : "Three-phase output voltage THD of 1.3%, AC input PF of 0.99, and a provincial first prize."}</li>
          </ul>
          <p className="presentation-team-note">{zh ? "团队协作：SVPWM 控制软件由队友负责。" : "Team contribution: a teammate implemented the SVPWM control software."}</p>
          <div className="presentation-contest-metrics">
            <div><small>{zh ? "竞赛成果" : "Award"}</small><strong>{zh ? "省一等奖" : "1st prize"}</strong></div>
            <div><small>{zh ? "功率因数 PF" : "Power factor"}</small><strong>0.99</strong></div>
            <div><small>{zh ? "输出 THD" : "Output THD"}</small><strong>1.3%</strong></div>
          </div>
          {projectLink("2026-contest-ac-ac", zh ? "查看电赛详情与实测图片" : "View contest details and evidence")}
        </div>
      </div>
    </div>,
    <div className="presentation-page" key="power">
      {pageHeading("02 / POWER PROJECTS", zh ? "三个电源项目" : "Three power projects", zh ? "三个项目均担任硬件负责人 · 从设计到样机验证" : "Hardware lead on all three · from design to prototype validation")}
      <div className="presentation-power-grid">
        {powerProjects.map(project => <article className="presentation-power-card" key={project.id}>
          <div className="presentation-power-photo"><Photo src={project.image} alt={project.short} /><span className="presentation-role">{zh ? "硬件负责人" : "Hardware lead"}</span></div>
          <div className="presentation-power-content">
            <h3>{project.short}</h3><p className="presentation-spec">{project.specification}</p>
            <ul className="presentation-work-list">{(zh ? project.work : project.workEn).map(work => <li key={work}>{work}</li>)}</ul>
            <div className="presentation-power-result"><strong>{project.result}</strong><span>{zh ? project.resultZh : project.resultEn}</span></div>
            <p className="presentation-evidence">{zh ? project.evidence : project.evidenceEn}</p>
            {projectLink(project.id)}
          </div>
        </article>)}
      </div>
    </div>,
    <div className="presentation-page presentation-engineering" key="engineering">
      {pageHeading("03 / ENGINEERING", zh ? "把设计变成可验证的样机" : "Turning designs into tested prototypes", zh ? "计算 → 磁件 → PCB → 驱动与控制 → 调试 → 测试记录" : "Calculations → magnetics → PCB → drive & control → debugging → validation")}
      <div className="presentation-capability-grid">
        {capabilities.map((item, index) => <button key={item.image} className="presentation-capability" onClick={() => setImageIndex(index)}
          aria-label={(zh ? "查看工程图片：" : "View engineering image: ") + (zh ? item.title : item.en)}>
          <Photo src={item.image} alt={zh ? item.title : item.en} />
          <span className="presentation-capability-copy"><small>{"0" + (index + 1)}</small><strong>{zh ? item.title : item.en}</strong><span>{zh ? item.description : item.descriptionEn}</span></span>
        </button>)}
      </div>
    </div>,
    <div className="presentation-page" key="catalog">
      {pageHeading("04 / PROJECT DIRECTORY", zh ? "全部项目目录" : "Project directory", zh ? "按交流方向选择项目，点击进入完整详情。" : "Choose a project to explore its complete details and engineering evidence.")}
      <div className="presentation-catalog">
        {(["competition", "personal"] as const).map(category => <section className="presentation-catalog-group" key={category}>
          <h3>{category === "competition" ? (zh ? "电赛项目体系" : "Competition projects") : (zh ? "个人电源项目" : "Personal power projects")}</h3>
          <div>{projectCollections[category].map(source => {
            const project = localizeProject(source, language);
            return <a className="presentation-catalog-item" key={project.id} href={getProjectHref(project.id)} onClick={onOpenProject}>
              <Photo src={project.image} alt="" /><span><strong>{project.title}</strong><small>{project.subtitle}</small></span><ArrowRight size={17} aria-hidden="true" />
            </a>;
          })}</div>
        </section>)}
      </div>
    </div>,
    <div className="presentation-page" key="contact">
      {pageHeading("05 / LET’S CONNECT", zh ? "期待加入电源研发团队" : "Let’s build power electronics", zh ? "2027 届 · 电源硬件研发岗" : "Class of 2027 · Power hardware engineering")}
      <div className="presentation-contact-grid">
        <div className="presentation-contact-card">
          <p className="presentation-contact-name">{zh ? "蓝宏涛" : "Hongtao Lan"}</p>
          <p className="presentation-description">{zh ? "欢迎继续交流项目设计、硬件实现和调试过程。" : "Happy to discuss the design, hardware implementation and debugging behind these projects."}</p>
          <a className="presentation-email" href="mailto:203863488@qq.com"><Mail size={20} aria-hidden="true" />203863488@qq.com</a>
          <div className="presentation-contact-actions">
            <a className="presentation-primary" href={assetUrl("resume.pdf")} target="_blank" rel="noopener noreferrer"><FileText size={18} aria-hidden="true" />{zh ? "查看简历" : "View resume"}</a>
            <a className="presentation-secondary" href={assetUrl("resume.pdf")} download><ArrowDownToLine size={18} aria-hidden="true" />{zh ? "保存简历" : "Save resume"}</a>
            <ShareQrDialog buttonClassName="presentation-secondary" compactDialog />
          </div>
          <a className="presentation-github" href="https://github.com/203863488-cell" target="_blank" rel="noopener noreferrer">GitHub / 203863488-cell<ArrowRight size={15} aria-hidden="true" /></a>
        </div>
        <OfflinePreparation />
      </div>
    </div>
  ];

  return <div className="presentation-deck" onKeyDown={event => {
    if (event.altKey || event.ctrlKey || event.metaKey || (event.target as Element).closest("dialog, [role=dialog], input, textarea")) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault(); goTo(active + (event.key === "ArrowRight" ? 1 : -1));
    }
  }}>
    <DocumentMetadata title={siteCopy.meta.title} description={siteCopy.meta.description} />
    <header className="presentation-header">
      <button className="presentation-brand" onClick={() => goTo(0)} aria-label={zh ? "回到个人开场" : "Back to introduction"}>{zh ? "蓝宏涛" : "Hongtao Lan"}<span>2027</span></button>
      <span className="presentation-header-label">{zh ? "电源硬件研发作品集" : "Power Hardware Portfolio"}</span>
      <div className="presentation-header-actions">
        <button onClick={() => setLanguage(zh ? "en" : "zh")} aria-label={zh ? "Switch to English" : "切换中文"}>{zh ? "EN" : "中文"}</button>
        <button className="presentation-fullscreen" onClick={fullscreen} aria-label={zh ? "切换全屏" : "Toggle fullscreen"}><Maximize size={18} aria-hidden="true" /></button>
        <button onClick={() => menuRef.current?.showModal()}><Grid2X2 size={17} aria-hidden="true" /><span>{zh ? "目录" : "Menu"}</span></button>
      </div>
    </header>
    <div ref={stageRef} className="presentation-stage" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={clearGesture}
      onClickCapture={event => { if (performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); } }}>
      <div className="presentation-track" style={{ transform: "translate3d(calc(" + (-active * 100) + "% + var(--drag-x, 0px)), 0, 0)" }}>
        {slides.map((slide, index) => <section className="presentation-slide" key={names[index]} inert={index !== active} aria-hidden={index !== active}
          aria-label={(index + 1) + " / 6 · " + names[index]}>{slide}</section>)}
      </div>
    </div>
    <footer className="presentation-footer">
      <span className="presentation-swipe-hint">{zh ? "左右滑动翻页" : "Swipe to explore"}</span>
      <nav className="presentation-pagination" aria-label={zh ? "演示页导航" : "Presentation pages"}>
        {names.map((name, index) => <button key={name} aria-label={(zh ? "跳转到" : "Go to ") + name} aria-current={active === index ? "step" : undefined} onClick={() => goTo(index)}><span /></button>)}
      </nav>
      <div className="presentation-page-controls"><button aria-label={zh ? "上一页" : "Previous slide"} disabled={active === 0} onClick={() => goTo(active - 1)}><ChevronLeft size={20} /></button>
        <span aria-live="polite" aria-atomic="true"><b>{"0" + (active + 1)}</b><span> / 06</span></span>
        <button aria-label={zh ? "下一页" : "Next slide"} disabled={active === 5} onClick={() => goTo(active + 1)}><ChevronRight size={20} /></button></div>
    </footer>
    <dialog ref={menuRef} className="presentation-menu">
      <div className="presentation-menu-heading"><h2>{zh ? "演示目录" : "Presentation menu"}</h2><button onClick={() => menuRef.current?.close()} aria-label={zh ? "关闭目录" : "Close menu"}><X size={22} /></button></div>
      <div className="presentation-menu-pages">{names.map((name, index) => <button key={name} onClick={() => { goTo(index); menuRef.current?.close(); }} aria-current={active === index ? "step" : undefined}><span>{"0" + (index + 1)}</span>{name}<ArrowRight size={18} /></button>)}</div>
      <div className="presentation-menu-actions"><button onClick={fullscreen}><Maximize size={18} />{zh ? "切换全屏" : "Toggle fullscreen"}</button><button onClick={() => { menuRef.current?.close(); onExit(); }}><ArrowLeft size={18} />{zh ? "普通浏览" : "Standard website"}</button></div>
      {notice && <p className="presentation-notice" role="status">{notice}</p>}
    </dialog>
    <ImageLightbox images={gallery} activeIndex={imageIndex} onActiveIndexChange={setImageIndex} onClose={() => setImageIndex(null)} swipeEnabled />
  </div>;
}

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const assetVersion = "project-content-20260619-5";

const chineseProject = `{id:\`personal-portfolio-site\`,category:\`personal\`,title:\`个人求职网站\`,subtitle:\`面向电力电子岗位的中英双语、数据驱动作品集\`,summary:\`围绕电力电子硬件与嵌入式控制求职场景构建的个人作品集。网站将 9 个项目组织为首页入口、分类列表和可复用详情页，并完整覆盖中英双语、响应式适配、按路由加载、弱网降级、离线缓存和 GitHub Pages 发布。\`,image:\`images/portfolio-site-project-card.png\`,detailImages:[{src:\`images/portfolio-site-projects-overview.png\`,title:\`个人项目作品列表\`,description:\`个人项目页采用响应式卡片网格展示 PFC、LLC、反激电源、STM32G4 上位机和个人求职网站等项目；每张卡片统一呈现项目定位、状态、标签、关键指标和详情入口。\`},{src:\`images/portfolio-site-project-card.png\`,title:\`个人求职网站项目卡片\`,description:\`项目卡片由同一份项目数据驱动，列表页无需为单个项目重复编写页面结构；标题、摘要、技术标签、状态和指标会自动映射到统一组件。\`},{src:\`images/portfolio-site-project-detail.png\`,title:\`数据驱动的项目详情页\`,description:\`详情页复用职责、技术指标、系统结构、关键设计点、当前进度、测试验证和后续改进模块，使硬件项目与软件项目都能沿同一条工程叙事展开。\`}],tags:[\`React 19\`,\`TypeScript\`,\`Tailwind CSS\`,\`中英双语\`,\`GitHub Pages\`,\`Service Worker\`],status:\`已上线，持续迭代\`,goal:\`为电力电子与嵌入式控制岗位建立一个可直接交付给招聘方浏览的在线作品集：让访问者先在首页快速判断技术方向，再进入分类项目列表，并在详情页查看职责、设计依据、实测指标和验证证据；同时保证手机、电脑和横屏平板均可访问，在 GitHub Pages 静态托管、弱网或短时离线条件下仍具备稳定的浏览体验。\`,responsibilities:[\`按招聘方的阅读路径设计信息架构，将内容拆分为首页能力概览、电赛项目、个人项目、项目详情、联系方式和简历下载，避免把全部信息堆叠在单一长页面中。\`,\`建立统一的项目数据模型，把标题、摘要、状态、图片、标签、职责、指标、系统节点、设计要点、验证记录和改进计划集中管理，再由通用卡片与详情组件负责渲染。\`,\`使用 React 19、TypeScript、Vite 和 Tailwind CSS 组织组件与样式，拆分导航、轮播、能力分区、项目卡片、指标网格、图片画廊、详情列表和系统结构图等可复用模块。\`,\`实现自定义 Hash 路由与项目 ID 查询，使首页、项目分类页和详情页在 GitHub Pages 子路径下可直接访问，并通过 React.lazy 与 Suspense 对分类页和详情页进行路由级按需加载。\`,\`实现中文/英文语言上下文和项目翻译映射，保证导航、页面说明、项目卡片与详情字段共用同一套结构，切换语言时不复制页面组件。\`,\`完成手机、桌面和 1024-1180px 横屏平板适配，处理卡片网格、详情指标、首屏轮播、导航菜单和长文本换行，并尊重 prefers-reduced-motion 设置。\`,\`针对弱网和静态托管场景加入图片懒加载、首屏资源预加载、低带宽视觉降级、Service Worker 缓存、4.5 秒导航超时回退和图片失败占位图。\`,\`配置本地静态预览、GitHub Actions 与 GitHub Pages 发布流程，使用独立静态快照分支和缓存版本号控制线上资源更新，避免旧 Service Worker 长期持有过期页面。\`],metrics:[{label:\`项目数据\`,value:\`9 个\`},{label:\`语言\`,value:\`中 / EN\`},{label:\`前端\`,value:\`React 19\`},{label:\`路由\`,value:\`Hash + 懒加载\`},{label:\`部署\`,value:\`GitHub Pages\`},{label:\`离线兜底\`,value:\`Service Worker\`}],diagramTitle:\`作品集内容、界面与发布链路\`,diagramNodes:[\`项目数据与双语文案\`,\`React 复用组件\`,\`Hash 路由与按需加载\`,\`GitHub Pages + 离线缓存\`],designPoints:[\`信息架构围绕“快速判断方向 → 浏览项目组合 → 查看工程证据 → 获取联系方式”设计，首页负责建立定位，分类页负责比较项目，详情页负责解释设计与验证过程。\`,\`项目内容与页面结构解耦。新增项目时只需补充符合统一字段的数据记录，列表卡片、指标网格、系统结构和详情模块会自动生成，降低后续维护成本。\`,\`中英文共用同一项目 ID 和组件树，英文层只覆盖需要翻译的内容字段，从结构上避免两套页面长期迭代后出现信息不一致。\`,\`使用 Hash 路由而不是依赖服务器重写规则，适配 GitHub Pages 的静态托管限制；所有静态资源通过统一 base 路径解析，保证 /personal-site/ 子目录部署。\`,\`首屏与非首屏采用不同加载策略：关键图片预加载，项目图片 lazy loading，分类页和详情页拆分为独立 JavaScript chunk，减少首次访问必须下载的代码与媒体。\`,\`弱网模式会关闭非必要动画、毛玻璃和复杂背景过渡；减少动态效果不是单纯视觉取舍，而是为了降低低端设备合成开销并保持正文优先可读。\`,\`Service Worker 对导航采用网络优先并设置超时，对脚本、样式和图片采用缓存优先；版本升级时清理旧缓存，并为图片请求提供轻量 SVG 兜底。\`,\`交互组件补充键盘焦点、ARIA 状态和减少动画偏好支持；轮播在悬停、聚焦、页面不可见或用户启用减少动画时暂停，避免无控制的自动播放。\`],progress:\`网站已部署到 GitHub Pages，当前线上版本包含 4 个电赛模块和 5 个个人项目，共 9 个可独立访问的项目条目；已完成中英文切换、响应式导航、首页轮播、分类列表、数据驱动详情页、简历下载、路由级代码拆分、弱网模式和离线缓存。现阶段重点从“搭出页面”转向“持续补充可核验的项目图片、实测数据和设计复盘”，并同步收敛源码分支与静态发布快照之间的维护流程。\`,validation:[\`执行生产 JavaScript 语法检查，确保入口、项目目录、分类页和详情页等构建产物可被浏览器正确解析。\`,\`通过本地静态服务器验证 /personal-site/ 基础路径，以及首页、#/personal、#/competition 和 #/project/:id 等 Hash 路由入口。\`,\`检查中文与英文切换，确认项目标题、摘要、职责、指标、结构节点和验证内容在同一详情页正确替换。\`,\`检查手机、桌面及 1024×768、1180×820 横屏布局，确认项目卡片、六项指标、长列表和系统结构图不存在横向溢出或文字遮挡。\`,\`验证图片懒加载、路由级 chunk 加载和首屏预加载策略，确认非当前页面资源不会全部阻塞首次渲染。\`,\`验证 Service Worker 安装、旧缓存清理、导航超时回退、静态资源缓存和图片失败占位逻辑，并通过版本号更新避免用户继续命中旧项目文案。\`],improvements:[\`恢复完整源码到统一、可复现的构建链路，使 main 分支源码、构建产物和静态快照由同一次 CI 生成，避免在发布分支维护压缩后的资源。\`,\`替换当前联系区域中的示例邮箱，补充真实 GitHub、邮箱和可选的项目仓库链接，并为公开信息增加基础反爬和隐私边界。\`,\`增加项目数据 Schema 校验、路由冒烟测试、关键视口截图对比和 Lighthouse 检查，让文案或样式更新可以在发布前自动发现字段缺失与布局回归。\`,\`将大尺寸 JPG/PNG 生成 WebP 或 AVIF 响应式版本，补充宽高和 srcset，进一步降低移动网络下的图片传输量与布局偏移。\`]}`;

const englishProject = `"personal-portfolio-site":{title:\`Personal Portfolio Website\`,subtitle:\`Bilingual, data-driven portfolio for power-electronics roles\`,summary:\`A portfolio built for power-electronics hardware and embedded-control recruiting. It organizes nine projects into a homepage, category collections, and reusable detail pages, with Chinese/English content, responsive layouts, route-level loading, low-bandwidth fallbacks, offline caching, and GitHub Pages delivery.\`,image:\`images/portfolio-site-project-card.png\`,detailImages:[{src:\`images/portfolio-site-projects-overview.png\`,title:\`Personal Project Collection\`,description:\`The responsive project grid presents PFC, LLC, flyback, STM32G4 telemetry, and this portfolio with a consistent set of positioning, status, tags, metrics, and detail links.\`},{src:\`images/portfolio-site-project-card.png\`,title:\`Portfolio Project Card\`,description:\`Each card is generated from the shared project catalog. The collection page does not duplicate page markup for individual projects; titles, summaries, tags, status, and metrics are mapped into reusable components.\`},{src:\`images/portfolio-site-project-detail.png\`,title:\`Data-Driven Project Detail Page\`,description:\`The detail template reuses role, metrics, system structure, design decisions, progress, validation, and improvement modules so hardware and software projects follow one reviewable engineering narrative.\`}],tags:[\`React 19\`,\`TypeScript\`,\`Tailwind CSS\`,\`Chinese / English\`,\`GitHub Pages\`,\`Service Worker\`],status:\`Live and iterating\`,goal:\`Deliver an online portfolio that a recruiter can review directly: establish the engineering focus on the homepage, compare projects in category collections, and inspect responsibilities, design reasoning, measured results, and validation evidence on detail pages. The site also needs to remain usable on phones, desktops, and landscape tablets, including GitHub Pages hosting, constrained networks, and short offline periods.\`,responsibilities:[\`Designed the information architecture around the recruiter journey: capability overview, competition projects, personal projects, project details, contact entry, and resume download instead of one oversized scrolling page.\`,\`Defined a shared project model for titles, summaries, status, images, tags, responsibilities, metrics, system nodes, design decisions, validation records, and improvement plans, then rendered it through reusable collection and detail components.\`,\`Structured the interface with React 19, TypeScript, Vite, and Tailwind CSS, separating navigation, carousel, capability tracks, project cards, metric grids, image galleries, detail lists, and system diagrams into reusable modules.\`,\`Implemented custom hash routing and project-ID lookup for GitHub Pages subpath hosting, then used React.lazy and Suspense to load category and project-detail routes on demand.\`,\`Implemented a Chinese/English language context and project translation mapping so navigation, page copy, cards, and detail fields share one component structure instead of duplicating pages.\`,\`Adapted the layout for phones, desktops, and 1024-1180px landscape tablets, including card grids, detail metrics, hero controls, navigation, long-form copy, and prefers-reduced-motion behavior.\`,\`Added image lazy loading, critical-image preload, low-bandwidth visual reduction, Service Worker caching, a 4.5-second navigation fallback, and an offline image placeholder for static-hosting resilience.\`,\`Configured local static preview, GitHub Actions, and GitHub Pages delivery with a reviewed static-snapshot branch and explicit cache versions to prevent stale Service Workers from retaining old content.\`],metrics:[{label:\`Project Records\`,value:\`9\`},{label:\`Languages\`,value:\`ZH / EN\`},{label:\`Frontend\`,value:\`React 19\`},{label:\`Routing\`,value:\`Hash + Lazy\`},{label:\`Delivery\`,value:\`GitHub Pages\`},{label:\`Offline Fallback\`,value:\`Service Worker\`}],diagramTitle:\`Portfolio Content, Interface, and Delivery Path\`,diagramNodes:[\`Project Data + Bilingual Copy\`,\`Reusable React Components\`,\`Hash Routes + Lazy Loading\`,\`GitHub Pages + Offline Cache\`],designPoints:[\`The information flow follows “identify the focus → compare the project set → inspect engineering evidence → reach contact details.” Each page has a distinct decision-making role.\`,\`Project content is decoupled from layout. Adding a project means adding one structured record; cards, metrics, system nodes, and detail sections are generated by shared components.\`,\`Chinese and English content share project IDs and the same component tree. The translation layer overrides content fields only, reducing long-term drift between two site versions.\`,\`Hash routing avoids server rewrite requirements and fits GitHub Pages constraints. Assets use a common base path so the application remains valid under the /personal-site/ subdirectory.\`,\`Critical and non-critical resources use different strategies: the first hero image is preloaded, project media is lazy-loaded, and category/detail pages are emitted as separate JavaScript chunks.\`,\`Low-bandwidth mode disables nonessential animation, backdrop blur, and complex transitions to reduce compositing cost and keep the project copy readable on constrained devices.\`,\`The Service Worker uses network-first navigation with a timeout and cache-first handling for scripts, styles, and images. Upgrades delete old caches, while failed images fall back to a small SVG.\`,\`Interactive components include keyboard focus, ARIA state, and reduced-motion support. The carousel pauses on hover, focus, hidden tabs, and reduced-motion preferences.\`],progress:\`The site is live on GitHub Pages with four competition modules and five personal projects, for nine independently addressable project records. Chinese/English switching, responsive navigation, the homepage carousel, category collections, data-driven details, resume download, route-level code splitting, low-bandwidth mode, and offline caching are implemented. Current work is focused on adding verifiable project media, measured data, and design reviews while simplifying the source-to-static release workflow.\`,validation:[\`Run production JavaScript syntax checks for the entry bundle, catalog, collection pages, and detail page chunks.\`,\`Use the local static server to verify the /personal-site/ base path plus home, #/personal, #/competition, and #/project/:id hash routes.\`,\`Check Chinese/English switching across project titles, summaries, responsibilities, metrics, diagram nodes, and validation content.\`,\`Check phone, desktop, 1024×768, and 1180×820 landscape layouts for card, six-metric, long-list, and system-diagram overflow.\`,\`Verify image lazy loading, route-level chunk loading, and critical-image preload so non-current routes do not block first render.\`,\`Verify Service Worker installation, stale-cache cleanup, navigation timeout fallback, static-asset caching, image fallback, and the cache-version update used for this content release.\`],improvements:[\`Restore one reproducible source build so the main source branch, production bundle, and static snapshot are generated by the same CI run instead of maintaining minified release assets.\`,\`Replace the placeholder contact email with real GitHub and email destinations, add selected repository links, and define privacy boundaries for public contact details.\`,\`Add project-schema validation, route smoke tests, key-viewport visual regression, and Lighthouse checks before deployment.\`,\`Generate responsive WebP or AVIF variants for large JPG/PNG assets, including dimensions and srcset, to reduce mobile transfer size and layout shift.\`]}`;

function replaceSection(filePath, startMarker, endMarker, replacement) {
  const source = fs.readFileSync(filePath, "utf8");
  const startIndex = source.indexOf(startMarker);
  const endIndex = source.indexOf(endMarker, startIndex);

  if (startIndex < 0 || endIndex < 0) {
    throw new Error(`Unable to locate replacement range in ${filePath}`);
  }

  fs.writeFileSync(
    filePath,
    `${source.slice(0, startIndex)}${replacement}${source.slice(endIndex)}`,
    "utf8",
  );
}

replaceSection(
  path.join(root, "assets", "projectCatalog-BAmWV_MF.js"),
  "{id:`personal-portfolio-site`,category:`personal`,",
  "],i=[...n,...r],a={competition:n,personal:r};",
  chineseProject,
);

replaceSection(
  path.join(root, "assets", "MetricGrid-DIUXxQ8O.js"),
  '"personal-portfolio-site":{',
  "}};function j(e,t){",
  englishProject,
);

const metricGridPath = path.join(root, "assets", "MetricGrid-DIUXxQ8O.js");
let metricGrid = fs.readFileSync(metricGridPath, "utf8");
metricGrid = metricGrid
  .replace(
    "imagesTitle:`项目图纸与板卡`",
    "imagesTitle:`项目图片与验证材料`",
  )
  .replace(
    "imagesTitle:`Schematics and Board`",
    "imagesTitle:`Project Images and Evidence`",
  )
  .replace(
    "diagramPlaceholder:`后续可替换为真实系统框图`",
    "diagramPlaceholder:`根据项目数据生成的结构示意`",
  )
  .replace(
    "diagramPlaceholder:`Can be replaced with the real system diagram later`",
    "diagramPlaceholder:`Structure generated from the project data model`",
  );
fs.writeFileSync(metricGridPath, metricGrid, "utf8");

for (const fileName of fs.readdirSync(path.join(root, "assets"))) {
  if (!fileName.endsWith(".js")) {
    continue;
  }

  const filePath = path.join(root, "assets", fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const versioned = source.replace(
    /competition-four-20260618|portfolio-detail-20260619(?:-\d+)?|project-content-20260619(?:-\d+)?/g,
    assetVersion,
  );

  if (versioned !== source) {
    fs.writeFileSync(filePath, versioned, "utf8");
  }
}

console.log("Updated personal portfolio project content and asset versions.");

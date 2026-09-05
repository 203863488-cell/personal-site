# 蓝宏涛个人求职作品集

面向电源硬件研发岗位的中英双语作品集，集中展示 CCM Boost PFC、数控 SiC 半桥 LLC、反激电源、STM32G4 控制、竞赛硬件模块和工程调试记录。

- 在线地址：<https://203863488-cell.github.io/personal-site/>
- 联系邮箱：<203863488@qq.com>
- GitHub：<https://github.com/203863488-cell>

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GitHub Actions / GitHub Pages
- Service Worker
- Sharp 响应式图片生成

## 主要功能

- 首页求职定位和核心实测指标
- 电赛项目、个人项目和数据驱动详情页
- 中文 / English 切换
- 手机、横屏平板和桌面响应式布局
- 项目图片 WebP 预览和高清原图查看器
- 键盘导航、焦点管理和减少动画偏好支持
- 真实简历下载、邮箱和 GitHub 联系入口
- SEO、Open Graph、JSON-LD、robots.txt 和 sitemap.xml
- 离线页面与图片缓存兜底

## 平板与手机演示

横屏触屏平板和竖屏手机默认进入六页演示，普通电脑首页保持原有布局。也可直接访问 `#/present` 进入演示。

1. 个人开场
2. 电赛成果：队长兼硬件负责人，PF 0.99、输出 THD 1.3%
3. LLC、160W CCM Boost PFC、72W Flyback：同一页展示，突出硬件职责与实测结果
4. 工程能力
5. 全部项目目录
6. 联系与简历

左右滑动、底部按钮或方向键翻页；目录可直接跳页。手机可在当前页内上下阅读。进入项目详情后使用“返回演示”回到原页；详情图片里的左右滑动只切换图片。目录中的“普通浏览”可退出演示，触屏设备保留重新进入的按钮。

出发前，在实际使用的浏览器中打开最后一页并点击“准备离线展示”。等待显示“已准备完成 · 可以断网展示”后，页面、项目详情、高清原图和当前公开简历均可离线读取。完整资源约 50 MB，以页面显示为准；邮箱、GitHub 和另一台设备扫码打开仍需要网络。每次发布后应重新检查离线状态。

构建会生成带 SHA-256 校验值的资源清单；只有当前版本所有文件下载和校验成功后才标记完成。失败可重试，已校验资源会复用。演示专用文案位于 `src/presentation/content.ts`，默认桌面的项目数据独立保留。

## 本地开发

```bash
npm install
npm run dev
```

Vite 默认开发地址为 `http://localhost:5173/personal-site/`。

## 质量检查

```bash
npm run check
```

该命令依次执行：

1. ESLint
2. 设备判定、手势和离线缓存行为测试
3. 响应式 WebP 图片生成
4. TypeScript 与 Vite 生产构建、离线资源清单生成
5. `dist` 必需文件、版本一致性和元信息检查

## 项目数据

项目内容集中维护在：

- `src/data/competitionProjects.ts`
- `src/data/personalProjects.ts`
- `src/data/siteCopy.ts`

新增项目时应补齐标题、摘要、30 秒概览、状态、职责、指标、系统节点、设计要点、验证结果和成果沉淀；详情图片必须标注实物、原理图、波形、测试记录或软件界面类型。不要在组件中硬编码单个项目内容。

## 图片策略

原始项目图片存放于 `public/images/`。构建前，`scripts/generate-responsive-images.mjs` 使用 Sharp 生成 480px 和 960px WebP 预览：

- 列表和画廊优先加载 WebP
- 点击图片后加载原始 JPG / PNG
- `public/images/generated/` 为构建生成目录，不提交到 Git

## 部署

`main` 是唯一源码事实来源。推送到 `main` 后，GitHub Actions 会：

1. 安装锁定依赖
2. 执行 `npm run check`
3. 上传 `dist`
4. 部署到 GitHub Pages

不再手工维护或修改压缩后的 JavaScript 静态快照。

## 公开信息边界

网页正文只公开邮箱和 GitHub。电话、微信等信息仅保留在用户主动下载的简历中。项目页面不应提交公司机密、未授权原理图、密钥或个人隐私数据。

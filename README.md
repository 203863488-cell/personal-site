# 蓝宏涛个人作品集（静态发布快照）

这是当前 GitHub Pages 使用的可直接部署版本，包含已经构建完成的 HTML、CSS、JavaScript 和项目图片。

## 目录

- `index.html`：站点入口、首屏加载状态和 Service Worker 注册。
- `assets/`：Vite 构建生成的 JavaScript 与主样式文件。
- `images/`：项目照片、测试记录和板卡图片。
- `site-overrides.css`：弱网和平板横屏等发布层样式修正。
- `sw.js`：离线缓存、弱网导航回退和图片失败兜底。
- `offline-image.svg`：图片请求失败时的低体积占位图。
- `local-preview-server.cjs`：本地静态预览服务器。
- `scripts/update-portfolio-site-content.cjs`：可重复执行的“个人求职网站”中英文内容更新脚本。
- `scripts/update-pfc-content.cjs`：可重复执行的 PFC 中英文项目内容更新脚本。
- `DEPLOYMENT.md`：分支关系、预览、验证和发布流程。

## 本地预览

```powershell
node local-preview-server.cjs
```

打开：

```text
http://127.0.0.1:4173/personal-site/
```

## 修改原则

`assets/` 内是构建产物，不适合直接做大范围结构重构。发布相关的响应式和性能修正统一放在 `site-overrides.css`；项目内容仍由构建产物中的数据模块提供。后续若恢复完整源代码，应在源项目中修改并重新构建，再更新此静态快照。

当前完整源码分支与线上静态快照的数据已经存在差异。修改对应项目时，应先编辑更新脚本中的中英文项目对象，再执行：

```powershell
node scripts/update-portfolio-site-content.cjs
node scripts/update-pfc-content.cjs
```

脚本会定点更新项目目录与英文翻译数据，并同步刷新 JavaScript 模块引用版本。两个脚本共用同一发布版本常量，修改内容时需要保持一致。执行后仍需检查 `index.html` 与 `sw.js` 的发布版本号，并按 `DEPLOYMENT.md` 完成本地路由、响应式和缓存验证。

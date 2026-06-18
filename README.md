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

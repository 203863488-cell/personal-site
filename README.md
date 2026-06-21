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
2. 响应式 WebP 图片生成
3. TypeScript 与 Vite 生产构建
4. `dist` 必需文件和元信息检查

## 项目数据

项目内容集中维护在：

- `src/data/competitionProjects.ts`
- `src/data/personalProjects.ts`
- `src/data/siteCopy.ts`

新增项目时应补齐标题、摘要、状态、职责、指标、系统节点、设计要点、验证结果和成果沉淀。不要在组件中硬编码单个项目内容。

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

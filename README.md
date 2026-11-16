# GANGDAO · THE CUBE

刘博 / 港岛的个人作品集。首页保留 THE CUBE 交互，站内包含 AI 影像、视觉与空间、简历及联系页面；`/interior-design` 是独立的室内设计作品集板块，收录三个有原始资料支撑的项目及手绘练习。

## 运行

```sh
npm ci
npm run dev
```

终端打印本地地址后，打开该地址的 `/interior-design` 路径；每个项目有独立详情页。生产构建运行 `npm run build`，静态导出位于 `dist/client`。类型检查运行 `./node_modules/.bin/tsc --noEmit`。

## Cloudflare Pages 部署

此项目已配置为静态导出。连接 GitHub 仓库时，生产分支选 `main`，根目录留空（仓库根目录），框架预设选 `None`，构建命令填 `npm run build`，构建输出目录填 `dist/client`。仓库中的 `.node-version` 将 Pages 构建环境固定为 Node 22.16.0。请勿直接把源码目录或未导出的 `dist/client` 当作网站上传：网站首页需要构建后生成的 `dist/client/index.html`。

## 技术

React 19、Vite / Vinext 路由、Tailwind CSS、Framer Motion、Three.js、React Three Fiber、Drei。原网站组件位于 `components/portfolio`，整体样式位于 `app/globals.css`。室内项目事实、图像说明及来源页码集中在 `lib/interior-projects.ts`，页面位于 `app/interior-design`，板块样式位于 `app/interior-design/interior.css`。

## 交互

- 首页的魔方与“探索魔方”进入目录，复用同一个 WebGL 场景完成约 1.8 秒转场。
- 目录魔方支持拖动和惯性；获得键盘焦点后，方向键旋转，Home 复位。
- 六个魔方目录和原有 AI 影像、视觉、简历、联系等内容保留；主导航与“视觉与空间”页可进入室内设计作品集。
- 室内设计板块提供三个独立项目页、手绘补充区、图像放大浏览、原始图纸说明与响应式排版。
- 支持浏览器后退、桌面与手机布局、系统减少动态效果设置。
- WebGL 采用按需渲染，像素比上限 1.5，人物素材为 WebP。

## 素材

人物素材 public/portrait.webp 使用内置 imagegen 进行一次编辑，以原始第一屏为编辑目标，移除界面文字、线条与手中的静态魔方，保留人物、姿态及蓝色摄影背景。它是独立照片层；网页文字为 HTML，连线为 SVG，魔方为 WebGL。手部前景使用同一照片层的 CSS 裁切合成。生成补全的局部手指细节可能与原稿有细小差异。

编辑提示词：Surgical cleanup preserving exact photograph and framing; remove all UI, text, lines and cube, retain both hands in the same holding pose, reconstruct dark jacket behind cube. Preserve identity, clothing, placement, lighting and the original blue background; no redesign.

字体 Six Caps 与 Anton 来自 Google Fonts，授权见 public/fonts/*-OFL.txt。

室内项目展示图位于 `public/media/interior`，由原始 PPTX / PDF 的内嵌图像提取并优化；原始文件应单独保存，不放入公开仓库。项目时间和个人职责由用户在后续对话中补充；图像均确认为方案效果图。龙华梅关代表项目按概念、草图与空间推演、模型、效果表现、方案深化和实施状态展示；用户确认它尚未建成，原 PDF 没有草图、模型过程截图或建成照片。空间节点图是网站整理示意。其余项目的施工状态尚未确认。

## 检查范围

当前室内设计板块已通过 TypeScript 检查、生产构建、静态 HTML 路由检查，以及展示图路径和尺寸一致性检查。当前执行环境中的 Chromium 无法完成页面截图，因此桌面与手机的实际浏览器视觉检查尚待可用的预览环境。



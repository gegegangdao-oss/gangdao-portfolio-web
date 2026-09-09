# GANGDAO · THE CUBE

基于两张已确认设计稿实现的连续交互网页。当前范围为首页与 THE CUBE 目录；六个分类的具体内容暂不展开。

## 运行

```sh
npm install
npm run dev
```

生产构建：`npm run build`。默认本地地址以终端输出为准。

## 技术

React 19、Vite / Vinext 路由、Tailwind CSS、Framer Motion、Three.js、React Three Fiber、Drei。组件位于 components/portfolio，整体样式位于 app/globals.css。

## 交互

- 首页的魔方与“探索魔方”进入目录，复用同一个 WebGL 场景完成约 1.8 秒转场。
- 目录魔方支持拖动和惯性；获得键盘焦点后，方向键旋转，Home 复位。
- 六个目录保留悬停与轻微分离转场；后续内容目前仅作占位。关于页仅使用已提供的简介，联系信息待补充。
- 支持浏览器后退、桌面与手机布局、系统减少动态效果设置。
- WebGL 采用按需渲染，像素比上限 1.5，人物素材为 WebP。

## 素材

人物素材 public/portrait.webp 使用内置 imagegen 进行一次编辑，以原始第一屏为编辑目标，移除界面文字、线条与手中的静态魔方，保留人物、姿态及蓝色摄影背景。它是独立照片层；网页文字为 HTML，连线为 SVG，魔方为 WebGL。手部前景使用同一照片层的 CSS 裁切合成。生成补全的局部手指细节可能与原稿有细小差异。

编辑提示词：Surgical cleanup preserving exact photograph and framing; remove all UI, text, lines and cube, retain both hands in the same holding pose, reconstruct dark jacket behind cube. Preserve identity, clothing, placement, lighting and the original blue background; no redesign.

字体 Six Caps 与 Anton 来自 Google Fonts，授权见 public/fonts/*-OFL.txt。

## 检查范围

通过 TypeScript 检查、生产构建和首页／目录 HTTP 响应检查。已在浏览器复现并修复缓存图片先于 React 加载事件完成时，首页文字与魔方被永久隐藏的问题；通过连续刷新、1672×941 与 1440×900 截图检查，以及点击后每 100ms 读取魔方位置／尺寸和人物透明度，验证约 1.85 秒连续转场。用户主动点击的核心转场保持完整，减少动态效果偏好只简化附加效果。六个分类的真实作品与联系方式未提供，未虚构这些内容。



# 作品集导航、案例与简历维护

当前预览 Site：`appgprj_6ae8a59fb3688191a95d25ac942593ea`。

## 导航与首页

- `lib/site-navigation.ts`：全站主导航。
- `components/portfolio/SiteHeader.tsx`：深色首页、浅色案例和简历共用的 Header，包含手机菜单、键盘操作和当前栏目状态。
- `components/portfolio/HeroScreen.tsx`：首页两个直接作品入口，以及简历、魔方探索入口。
- `app/navigation.css`：共用导航、首页入口及简历、联系页的配套样式。

## 项目列表和前后导航

- `lib/portfolio-projects.ts`：室内与产品项目的统一索引。列表、项目总数、上一个和下一个项目均取自这里。
- 室内项目原始内容在 `lib/interior-projects.ts`；新增 `decision` 为对应图纸旁的设计解读，基于既有方案资料，不视为新增项目事实。
- 栖风素材和文字在 `lib/windhaven-project.ts`。原始附件及资源映射见 `sources/windhaven-01/README.md`。
- `components/portfolio/ProjectPager.tsx`：所有四个案例共用的前后项目导航。
- 龙华案例先展示封面图，再显示概况、职责与设计解读。缺失过程资料集中在一个可展开说明里。

## 简历与联系

- `lib/resume-profile.json`：网页简历、联系页与下载 PDF 共用的个人资料。
- 原网站工作经历、工具与教育信息保留；项目经历优先展示用户确认的室内项目及栖风概念，原有 AI 研究项目保留在可展开列表里。
- 不使用未经明确统计的 `20+` 项目数量或 `2yr` 年限。
- PDF：`public/documents/LIU-BO-Resume.pdf`，共 2 页。
- 修改简历数据后，在具备 Python Playwright 与 Chromium 的制作环境运行 `python3 scripts/render-resume.py` 重新生成 PDF；生成结果需随网站一并提交。

## 本地开发

首次运行 `npm ci`，之后 `npm run dev`。使用终端显示的地址，访问 `/`、`/interior-design`、`/workflow`、`/contact`。构建为 `npm run build`。

## 栖风视频

网页视频由上传的 Muse 原片重新排列，将原片尾部的整椅画面放到开头，之后呈现编织、扶手与空间细节。仅改变剪辑顺序，未生成新产品造型。原始竖片与原始 PPT 仍保存在 `sources/windhaven-01/`。当前仍无第二条影片或原生横版素材。

import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'刘博 / 港岛 · 空间设计与 AIGC 视觉创作作品集',description:'刘博的空间设计、AIGC 视觉与影像作品集。查看深圳相关岗位方向、真实项目经历、原始方案与 AI 视觉延展。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}

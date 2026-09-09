import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'GANGDAO · 刘博 / 港岛',description:'从空间设计，走向 AI 创作。视觉叙事 · 交互体验 · AI 工作流。每一面，都是我的一种可能。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}

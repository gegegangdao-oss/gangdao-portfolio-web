import type {ReactNode} from 'react';
import './interior.css';
import SiteHeader from '../../components/portfolio/SiteHeader';

export default function InteriorLayout({children}:{children:ReactNode}){
  return <div className="interior-shell">
    <a className="interior-skip" href="#interior-main">跳转到正文</a>
    <SiteHeader currentPath="/interior-design" theme="editorial"/>
    <main id="interior-main">{children}</main>
    <footer className="interior-footer"><div><span>GANGDAO / LIU BO</span><p>空间、产品与视觉表达。</p></div><div><a href="/interior-design">室内与产品项目</a><a href="/visual-space">AI 空间探索</a><a href="/contact">联系我 ↗</a></div><small>© {new Date().getFullYear()} LIU BO</small></footer>
  </div>;
}

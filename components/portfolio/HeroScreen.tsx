'use client';
export default function HeroScreen({navigate}: {navigate: (path: string) => void}) {
  const follow = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigate(path);
  };
  return <section className="hero-copy" aria-label="认识港岛">
    <h1>GANGDAO</h1><h2>刘博 / 港岛</h2><p className="occupation">空间设计 × AIGC 视觉创作</p>
    <div className="hero-description"><i/><p>从真实空间项目，延伸到 AI 视觉表达。</p><small>空间方案 · 产品概念 · 视觉叙事</small></div>
    <div className="hero-actions hero-paths">
      <div className="hero-directions"><a href="/interior-design">室内与产品设计 <span aria-hidden="true">↗</span></a><a href="/projects" onClick={event => follow(event, '/projects')}>AI 视觉与影像 <span aria-hidden="true">↗</span></a></div>
      <div className="hero-secondary"><a href="/workflow" onClick={event => follow(event, '/workflow')}>查看简历 →</a><a href="/cube" onClick={event => follow(event, '/cube')}>探索魔方目录 →</a></div>
    </div>
  </section>;
}

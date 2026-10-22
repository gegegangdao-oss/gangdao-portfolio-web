export default function CareerFocus() {
  return <section id="resume-focus" className="resume-section career-focus" aria-labelledby="career-focus-title">
    <div className="resume-section-heading">
      <span>02 / CAREER FOCUS</span>
      <h2 id="career-focus-title">面向深圳的岗位方向</h2>
    </div>
    <p className="career-focus-intro">以空间方案经验为基础，将 AI 用于视觉探索、表达与内容制作。下列方向都能从站内作品看到对应实践。</p>
    <div className="career-focus-grid">
      <article>
        <span>01 / VISUAL</span>
        <h3>AIGC 视觉设计</h3>
        <p>围绕产品和场景建立视觉方向，制作静帧、影像与创作流程示例。</p>
        <a href="/projects">查看视觉与影像作品 ↗</a>
      </article>
      <article>
        <span>02 / SPACE</span>
        <h3>空间方案与 AI 辅助设计</h3>
        <p>从真实商业、教育空间项目出发，展示方案表达、原始设计图与 AI 视觉延展。</p>
        <a href="/visual-space">查看空间项目 ↗</a>
      </article>
    </div>
  </section>
}

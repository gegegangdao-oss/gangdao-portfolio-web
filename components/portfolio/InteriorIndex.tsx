import InteriorMediaGallery from './InteriorMediaGallery';
import {drawingStudies} from '../../lib/interior-projects';
import {portfolioProjects} from '../../lib/portfolio-projects';

export default function InteriorIndex(){
  return <>
    <section className="interior-intro" aria-labelledby="interior-title">
      <div className="interior-intro-copy">
        <span className="interior-eyebrow">LIU BO / SPACE & OBJECT</span>
        <h1 id="interior-title">室内与产品<br/><em>设计作品集</em></h1>
        <p>从校园公共空间，到城市更新展示与住区公共空间，再到独立家具概念。以方案效果图、平面与材料研究，呈现空间与产品的组织和表达。</p>
        <a href="#interior-projects" className="interior-text-link">浏览项目 <span aria-hidden="true">↘</span></a>
      </div>
      <a href={portfolioProjects[0].href} className="interior-intro-side"><img src={portfolioProjects[0].cover.src} width={portfolioProjects[0].cover.width} height={portfolioProjects[0].cover.height} alt={portfolioProjects[0].cover.alt} loading="eager"/><span>代表项目 / 龙华梅关 01 地块 ↗</span></a>
    </section>

    <section id="interior-projects" className="interior-index-section" aria-labelledby="project-index-title">
      <div className="interior-section-heading"><span>01 / PROJECT INDEX</span><h2 id="project-index-title">项目精选</h2><p>每个项目独立展开；图像类型与原始图纸分别标注。</p></div>
      <div className="interior-project-grid">
        {portfolioProjects.map((project,index)=><a key={project.slug} href={project.href} className={`interior-project-card ${index===0?'is-featured':''} ${project.kind==='product'?'interior-product-card':''}`}>
          <div className="interior-project-image"><img src={project.cover.src} width={project.cover.width} height={project.cover.height} alt={project.cover.alt} loading={index===0?'eager':'lazy'} decoding="async"/></div>
          <div className="interior-project-copy"><span>{project.featured?'代表项目 / ':''}{project.number} / {project.category}</span><h3>{project.title}</h3><p className="interior-project-period">{project.period}</p><p>{project.summary}</p><small>{project.evidence}</small><b aria-hidden="true">↗</b></div>
        </a>)}
      </div>
    </section>

    <section className="interior-index-section interior-studies" aria-labelledby="drawing-title">
      <div className="interior-section-heading"><span>02 / DRAWING STUDIES</span><h2 id="drawing-title">手绘与线稿</h2><p>表达练习作为补充展示，不作为委托项目或建成成果。</p></div>
      <InteriorMediaGallery media={drawingStudies} layout="grid"/>
    </section>
  </>;
}

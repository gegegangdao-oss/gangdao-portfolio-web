import InteriorMediaGallery from './InteriorMediaGallery';
import LonghuaCaseStudy from './LonghuaCaseStudy';
import ProjectPager from './ProjectPager';
import {projectNavigation} from '../../lib/portfolio-projects';
import {type InteriorProject} from '../../lib/interior-projects';

export default function InteriorProjectPage({project}: {project: InteriorProject}) {
  const {position, count} = projectNavigation(project.slug);
  return <article className="interior-detail">
    <div className="interior-detail-return"><a href="/interior-design">← 返回室内与产品作品集</a><span>{String(position).padStart(2, '0')} / {String(count).padStart(2, '0')}</span></div>
    <header className="interior-detail-header">
      <span className="interior-eyebrow">{project.featured ? '代表项目 · ' : ''}{project.category}</span>
      <h1>{project.title}</h1><p className="interior-detail-en">{project.english}</p>
    </header>
    <InteriorMediaGallery media={[project.cover]} layout="feature"/>
    <section className="interior-detail-overview" aria-labelledby="project-overview-title">
      <div><span className="interior-eyebrow">PROJECT OVERVIEW</span><h2 id="project-overview-title">项目概况</h2><p>{project.summary}</p></div>
      <dl><div><dt>项目时间</dt><dd>{project.period}</dd></div><div><dt>本人职责</dt><dd>{project.contribution}</dd></div>{project.status && <div><dt>项目阶段</dt><dd>{project.status}</dd></div>}<div><dt>展示材料</dt><dd>{project.evidence}</dd></div></dl>
    </section>
    {project.featured ? <LonghuaCaseStudy/> : <section className="interior-design-reading" aria-labelledby="design-reading-title"><div><span className="interior-eyebrow">DESIGN READING</span><h2 id="design-reading-title">方案解读</h2><p>依据现有方案图像与图纸整理</p></div><ol>{project.reading.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span>{point}</li>)}</ol></section>}
    <nav className="interior-jump-nav" aria-label="项目章节"><span>本项目</span>{project.sections.map(section => <a key={section.id} href={'#' + section.id}>{section.title}</a>)}</nav>
    {project.sections.map((section, index) => <section key={section.id} id={section.id} className="interior-story-section" aria-labelledby={`${section.id}-title`}>
      <div className="interior-story-heading"><span>{section.label}</span><div><h2 id={`${section.id}-title`}>{section.title}</h2><p>{section.text}</p></div><small>{String(index + 1).padStart(2, '0')}</small></div>
      <InteriorMediaGallery media={section.media} layout={section.layout}/>
      {section.decision && <aside className="interior-decision" aria-label="设计判断"><div><span>DESIGN DECISION / 设计判断</span><h3>{section.decision.question}</h3></div><div><p>{section.decision.response}</p><small>{section.decision.evidence}</small></div></aside>}
      {section.details && <div className="interior-specs">{section.details.map(detail => <div key={detail.label}><h3>{detail.label}</h3><p>{detail.value}</p></div>)}</div>}
    </section>)}
    <p className="interior-project-note">本页空间图像均为方案效果图；图纸与分析资料按原始文件标注，无建成照片。</p>
    <ProjectPager slug={project.slug}/>
  </article>;
}

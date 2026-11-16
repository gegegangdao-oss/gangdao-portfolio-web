import {projectNavigation} from '../../lib/portfolio-projects';
export default function ProjectPager({slug}: {slug: string}) {
  const {previous, next} = projectNavigation(slug);
  return <nav className="project-pager" aria-label="前后项目导航">{[{project: previous, label: '← 上一个项目', english: 'PREVIOUS'}, {project: next, label: '下一个项目 →', english: 'NEXT'}].map(({project, label, english}) => <a key={english} href={project.href}>
    <div className={`project-pager-image ${project.kind === 'product' ? 'is-product' : ''}`}><img src={project.cover.src} width={project.cover.width} height={project.cover.height} alt={project.cover.alt} loading="lazy" decoding="async"/></div>
    <div><span>{label}<small>{english}</small></span><h3>{project.title}</h3><p>{project.category}</p></div>
  </a>)}</nav>;
}

import {interiorProjects} from './interior-projects';
import {windhaven} from './windhaven-project';
export const portfolioProjects = [
  ...interiorProjects.map(project => ({
    slug: project.slug, number: project.number, title: project.title,
    href: `/interior-design/${project.slug}`, cover: project.cover,
    category: project.category, period: project.period, summary: project.summary,
    evidence: project.evidence, featured: Boolean(project.featured), kind: 'space' as const,
  })),
  {slug: 'windhaven-01', number: '04', title: windhaven.title, href: windhaven.path, cover: windhaven.hero,
    category: '家具产品 · 独立概念设计', period: 'Outdoor Lounge Chair / Concept Design',
    summary: '让风穿过设计，让身体停留在自然里。从海岸曲线到 CMF 材质与空间应用，探索一把户外休闲椅的视觉表达。',
    evidence: '独立原创概念 · AI 辅助视觉呈现 · 非量产产品', featured: false, kind: 'product' as const},
];
export function projectNavigation(slug: string) {
  const index = portfolioProjects.findIndex(project => project.slug === slug);
  if (index < 0) throw new Error(`Unknown portfolio project: ${slug}`);
  const count = portfolioProjects.length;
  return {current: portfolioProjects[index], count, position: index + 1,
    previous: portfolioProjects[(index + count - 1) % count], next: portfolioProjects[(index + 1) % count]};
}

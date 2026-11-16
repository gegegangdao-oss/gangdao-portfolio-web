import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import InteriorProjectPage from '../../../components/portfolio/InteriorProjectPage';
import {getInteriorProject,interiorProjects} from '../../../lib/interior-projects';

export function generateStaticParams(){return interiorProjects.map(project=>({slug:project.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const project=getInteriorProject(slug);
  return project?{title:`${project.title} · 室内设计作品集 · 刘博`,description:`${project.period}。本人参与${project.contribution}。${project.summary} ${project.evidence}。`}:{title:'项目未找到'};
}

export default async function InteriorDetailRoute({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=getInteriorProject(slug);
  if(!project)notFound();
  return <InteriorProjectPage project={project}/>;
}

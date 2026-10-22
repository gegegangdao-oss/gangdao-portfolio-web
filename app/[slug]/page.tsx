import {notFound} from 'next/navigation';
import Portfolio from '../../components/portfolio/Portfolio';
const routes=['cube','projects','films','visual-space','interactive','workflow','about','contact'];
export function generateStaticParams(){return routes.map(slug=>({slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!routes.includes(slug))notFound();return <Portfolio initialPath={'/'+slug}/>}

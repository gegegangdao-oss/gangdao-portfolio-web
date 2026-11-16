'use client';
import {motion} from 'framer-motion';
import {categories} from './data';
import ResumeScreen from './ResumeScreen';
import InteractionLab from './InteractionLab';
import AboutInterests from './AboutInterests';
import MediaGallery from './MediaGallery';
import ContactPanel from './ContactPanel';

export default function ContentScreen({path,navigate}:{path:string,navigate:(p:string)=>void}){
const category=categories.find(c=>c.path===path);
if(['/projects','/films','/visual-space'].includes(path))return <motion.section className="content-screen gallery-screen" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.5}} aria-label={category?.title || 'AI 视觉与影像作品'}><MediaGallery path={path} navigate={navigate}/></motion.section>;
if(path==='/workflow')return <ResumeScreen navigate={navigate}/>;
 return <motion.section className={`content-screen ${path==='/contact'?'contact-screen':''}`} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.5}}><a className="back-link" href="/cube" onClick={e=>{e.preventDefault();navigate('/cube')}}>← 返回魔方目录</a><span className="content-eyebrow">{category?.number||'GANGDAO'} / THE CUBE</span><h1>{category?.english||'CONTACT'}</h1><h2>{category?.title||'联系'}</h2>{path==='/about'?<AboutInterests/>:path==='/interactive'?<InteractionLab/>:path==='/contact'?<ContactPanel/>:<div className="empty-content"><i/><p>作品整理中</p><small>这一面的作品即将呈现。</small></div>}</motion.section>
}


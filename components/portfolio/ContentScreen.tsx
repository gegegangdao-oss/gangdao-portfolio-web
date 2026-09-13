'use client';
import {motion} from 'framer-motion';
import {categories} from './data';
import MorphSlider from './MorphSlider';
import MediaGallery from './MediaGallery';
const resumeSlides=[
{image:'/resume-introduction.png',caption:'个人简介 · INTRODUCTION'},
{image:'/resume-experience.png',caption:'核心经历 · EXPERIENCE'},
{image:'/resume-skills.png',caption:'技能与背景 · SKILLS & PROFILE'}
];
export default function ContentScreen({path,navigate}:{path:string,navigate:(p:string)=>void}){
const category=categories.find(c=>c.path===path);
if(['/projects','/films','/visual-space'].includes(path))return <motion.section className="content-screen gallery-screen" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.5}} aria-label={category?.title}><MediaGallery path={path} navigate={navigate}/></motion.section>;
if(path==='/workflow')return <motion.section className="resume-screen" aria-label="个人简历" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.65}}>
<div className="resume-slider-frame"><MorphSlider items={resumeSlides} duration={1.05} intensity={.5}/></div>
<a className="resume-home-hit" href="/" data-cursor="HOME" aria-label="返回首页" onClick={e=>{e.preventDefault();navigate('/')}}/>
<a className="resume-branch-back" href="/cube" data-cursor="BACK" onClick={e=>{e.preventDefault();navigate('/cube')}}>← 返回魔方目录</a>
</motion.section>;
return <motion.section className="content-screen" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.5}}><a className="back-link" href="/cube" onClick={e=>{e.preventDefault();navigate('/cube')}}>← 返回魔方目录</a><span className="content-eyebrow">{category?.number||'GANGDAO'} / THE CUBE</span><h1>{category?.english||'CONTACT'}</h1><h2>{category?.title||'联系'}</h2>{path==='/about'?<div className="about-copy"><h3>刘博 / 港岛</h3><p>AIGC 视觉创意设计师</p><p>从空间设计，走向 AI 创作。</p><p>视觉叙事 · 交互体验 · AI 工作流</p><em>每一面，都是我的一种可能。</em></div>:<div className="empty-content"><i/><p>{path==='/contact'?'联系方式待补充':'作品整理中'}</p><small>{path==='/contact'?'感谢关注，欢迎再次来访。':'这一面的作品即将呈现。'}</small></div>}</motion.section>
}

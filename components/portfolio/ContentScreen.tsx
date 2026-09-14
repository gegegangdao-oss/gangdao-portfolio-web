'use client';
import {motion} from 'framer-motion';
import {categories} from './data';
import ResumeScreen from './ResumeScreen';
import InteractionLab from './InteractionLab';
import AboutInterests from './AboutInterests';
import MediaGallery from './MediaGallery';
import ProfileCard from './ProfileCard';

export default function ContentScreen({path,navigate}:{path:string,navigate:(p:string)=>void}){
const category=categories.find(c=>c.path===path);
if(['/projects','/films','/visual-space'].includes(path))return <motion.section className="content-screen gallery-screen" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.5}} aria-label={category?.title}><MediaGallery path={path} navigate={navigate}/></motion.section>;
if(path==='/workflow')return <ResumeScreen navigate={navigate}/>;
 return <motion.section className={`content-screen ${path==='/contact'?'contact-screen':''}`} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.5}}><a className="back-link" href="/cube" onClick={e=>{e.preventDefault();navigate('/cube')}}>← 返回魔方目录</a><span className="content-eyebrow">{category?.number||'GANGDAO'} / THE CUBE</span><h1>{category?.english||'CONTACT'}</h1><h2>{category?.title||'联系'}</h2>{path==='/about'?<AboutInterests/>:path==='/interactive'?<InteractionLab/>:path==='/contact'?<div className="contact-layout"><div className="contact-card-wrap"><ProfileCard avatarUrl="/profile-portrait.png" name="港岛哥哥" title="AIGC 视觉创意设计师" handle="gegegangdao" status="青海 · 西宁" contactText="发邮件" onContactClick={()=>{window.location.href='mailto:gegegangdao@gmail.com'}}/></div><div className="contact-details"><p className="contact-intro">欢迎联系我，聊聊视觉、空间与 AI 创作。</p><div className="contact-lines"><a href="tel:+8617797228246"><span>大陆手机</span><strong>177 9722 8246</strong></a><a href="tel:+85253298842"><span>香港手机</span><strong>5329 8842</strong></a><a href="mailto:gegegangdao@gmail.com"><span>Google 邮箱</span><strong>gegegangdao@gmail.com</strong></a><a href="mailto:1156943120@qq.com"><span>QQ 邮箱</span><strong>1156943120@qq.com</strong></a><a href="https://www.instagram.com/gegegangdao" target="_blank" rel="noreferrer"><span>Instagram</span><strong>@gegegangdao ↗</strong></a></div><div className="contact-qr"><img src="/wechat-qr-source.png" alt="微信二维码"/><div><span>微信</span><strong>扫描二维码添加我</strong></div></div></div></div>:<div className="empty-content"><i/><p>作品整理中</p><small>这一面的作品即将呈现。</small></div>}</motion.section>
}


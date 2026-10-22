'use client';
import type {ReactNode} from 'react';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '../ui/tabs';
import ScrollExpand from './ScrollExpand';
import {spaceProjects} from './spaces';
import type {Work} from './works';

export default function SpaceCollection({render}:{render:(work:Work,priority?:boolean)=>ReactNode}) {
  return <div className="space-collection">
    <nav className="project-index" aria-label="空间项目目录">
      {spaceProjects.map((project,i)=><a key={project.id} href={'#'+project.id} onClick={event=>{event.preventDefault();document.getElementById(project.id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});document.getElementById(project.id)?.focus({preventScroll:true})}}><span>0{i+1}</span><div><strong>{project.title}</strong><small>{project.category}</small></div><b aria-hidden="true">↗</b></a>)}
    </nav>
    <ScrollExpand className="space-intro" src={spaceProjects[1].cover} alt="深圳天空艺术公园，青色灯光中的屋顶露台与夜色入口" title="让空间，发生。" scrollHint="向下滚动 · 走进空间" startWidth={76} startHeight={72} startRadius={32} endRadius={24} scrollDistance={.62} holdDistance={.08} mediaZoom={1.12} overlayScrim={.55} useWindowScroll>
      <span className="space-intro-kicker">SPACE / REIMAGINED</span><h3>从方案，到日常。</h3><p>三个项目，关于光、材质与人的再想象。</p>
    </ScrollExpand>
    <p className="space-source-note">项目图片分为「原图」与「AI 修改」。AI 画面用于视觉延展；部分画面没有一一对应的原图，具体情况见图片说明。</p>
    {spaceProjects.map((project,index)=><section id={project.id} tabIndex={-1} className="space-project" key={project.id} aria-labelledby={project.id+'-title'}>
      <div className="space-project-heading"><span className="space-project-number">0{index+1}</span><div><span className="space-project-category">{project.category}</span><h3 id={project.id+'-title'}>{project.title}</h3><small>{project.english}</small></div><p>{project.description}</p></div>
      <Tabs defaultValue="Now" className="space-project-tabs">
        <div className="space-project-toolbar"><TabsList className="space-project-switch" aria-label={project.title+'图片版本'}>{(['Before','Now'] as const).map(phase=><TabsTrigger value={phase} key={phase}>{phase}<span>{phase==='Before'?'原图':'AI 修改'}</span><small>{project.works.filter(work=>work.phase===phase).length.toString().padStart(2,'0')}</small></TabsTrigger>)}</TabsList><span className="space-project-hint">{project.works.length.toString().padStart(2,'0')} IMAGES / 点击查看大图</span></div>
        {(['Before','Now'] as const).map(phase=><TabsContent key={phase} value={phase}><div className={'space-work-grid '+(project.id==='kindergarten'&&phase==='Now'?'kindergarten-now':'')}>{project.works.filter(work=>work.phase===phase).sort((a,b)=>{if(project.id!=='kindergarten'||phase!=='Now')return 0;const order=['dance-studio','activity-room','reading-corridor','storage-wall'];return order.indexOf(a.id.replace('kindergarten-now-',''))-order.indexOf(b.id.replace('kindergarten-now-',''))}).map(work=>render(work))}</div></TabsContent>)}
      </Tabs>
    </section>)}
  </div>
}

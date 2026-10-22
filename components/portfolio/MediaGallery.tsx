'use client';
/* eslint-disable next/no-img-element -- Local WebP assets are pre-optimized and retain their authored dimensions. */
/* eslint-disable next/no-html-link-for-pages -- Navigation uses the existing animated cube router with real href fallbacks. */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- Native modal dialog handles Escape and backdrop dismissal. */
/* eslint-disable jsx-a11y/media-has-caption -- No caption tracks were supplied; preserve source audio and any embedded subtitles. */
import {useEffect,useRef,useState} from 'react';
import {films,visuals,workflow,type Work} from './works';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '../ui/tabs';
import SpaceCollection from './SpaceCollection';

function MediaCard({work,onOpen,priority=false}:{work:Work;onOpen:(work:Work)=>void;priority?:boolean}){
  return <article className={'work-card work-kind-'+work.kind}>
    <button className="work-image" onClick={()=>onOpen(work)} aria-label={(work.kind==='video'?'播放：':'查看大图：')+work.title} data-cursor={work.kind==='video'?'PLAY':'VIEW'} style={{aspectRatio:`${work.width} / ${work.height}`}}>
      <img src={work.poster||work.src} alt={work.title+'，'+work.description} width={work.width} height={work.height} loading={priority?'eager':'lazy'} decoding="async"/>
      {work.kind==='video'?<><span className="work-play" aria-hidden="true">▶</span><span className="work-duration">{work.duration}</span></>:<span className="work-expand" aria-hidden="true">↗</span>}
    </button>
    <div className="work-caption"><span>{work.category}</span><h3><button onClick={()=>onOpen(work)}>{work.title}</button></h3><small>{work.english}</small><p>{work.description}</p></div>
  </article>
}

function Viewer({work,onClose}:{work:Work;onClose:()=>void}){
  const dialog=useRef<HTMLDialogElement>(null);
  const video=useRef<HTMLVideoElement>(null);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{const element=dialog.current;const previous=document.activeElement as HTMLElement|null;element?.showModal();return()=>{element?.close();previous?.focus({preventScroll:true})}},[]);
  useEffect(()=>{const pause=()=>{if(document.hidden)video.current?.pause()};document.addEventListener('visibilitychange',pause);return()=>document.removeEventListener('visibilitychange',pause)},[]);
  return <dialog ref={dialog} className="media-viewer" aria-labelledby="viewer-title" onCancel={e=>{e.preventDefault();e.stopPropagation();onClose()}} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();onClose()}}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="viewer-panel"><header><div><span>{work.category}</span><h3 id="viewer-title">{work.title}</h3></div><button autoFocus onClick={onClose} className="viewer-close" aria-label="关闭预览">✕</button></header>
      <div className="viewer-media">{work.kind==='video'?<video ref={video} src={work.src} poster={work.poster} controls playsInline preload="metadata" onError={()=>setFailed(true)} aria-label={work.title}/>:<img src={work.src} alt={work.description}/>}</div>
      {failed?<p role="alert">视频暂时无法播放。<a href={work.src} target="_blank" rel="noreferrer">打开视频文件 ↗</a></p>:<p>{work.description}</p>}
    </div>
  </dialog>
}

export default function MediaGallery({path,navigate}:{path:string;navigate:(path:string)=>void}){
  const [opened,setOpened]=useState<Work|null>(null);
  const isFilms=path==='/films'; const isVisuals=path==='/visual-space';
  const render=(work:Work,priority=false)=><MediaCard key={work.id} work={work} onOpen={setOpened} priority={priority}/>;
  return <>
    <div className="gallery-heading"><a className="back-link" href="/cube" onClick={e=>{e.preventDefault();navigate('/cube')}}>← 返回魔方目录</a><span className="content-eyebrow">{isFilms?'02':isVisuals?'03':'01'} / THE CUBE</span><div className="gallery-title"><div><h1>{isFilms?'AI FILMS':isVisuals?'VISUAL & SPACE':'SELECTED WORK'}</h1><h2>{isFilms?'AI 影像':isVisuals?'视觉与空间':'精选作品'}</h2></div><p>{isFilms?'让想象，成为镜头。':isVisuals?'在材质、日光与空间之间。':'从一帧画面，到一个世界。'}</p></div></div>
    {!isVisuals&&<section className="gallery-section"><div className="gallery-section-heading"><h3>{isFilms?'影像作品':'影像精选'}</h3><span>{isFilms?'05 FILMS':'02 FILMS'}</span></div><div className="film-feature">{render(films[0],true)}</div><div className="work-grid film-grid">{(isFilms?films.slice(1):films.slice(1,2)).map(work=>render(work))}{!isFilms&&render(visuals[2])}</div>{!isFilms&&<a className="gallery-more" href="/films" onClick={e=>{e.preventDefault();navigate('/films')}}>浏览全部 5 部影像 <span>↗</span></a>}</section>}
    {isVisuals?<Tabs defaultValue="space" className="visual-space-tabs"><TabsList className="space-tabs" aria-label="视觉与空间作品分类"><TabsTrigger value="visual">视觉 <span>VISUAL</span></TabsTrigger><TabsTrigger value="space">空间 <span>SPACE / 03</span></TabsTrigger></TabsList><TabsContent value="space"><SpaceCollection render={render}/></TabsContent><TabsContent value="visual"><section className="gallery-section"><div className="gallery-section-heading"><h3>藏饰 · 商业视觉</h3><span>STILL / EDITORIAL</span></div><div className="work-grid commerce-grid">{visuals.slice(0,2).map(work=>render(work))}<div className="commerce-note"><span className="collection-index">01—02</span><h3>一件饰品，<br/>两种观看方式。</h3><p>从静物主视觉，到人物佩戴场景。让材质与细节，进入真实的光线。</p><span className="collection-line"/>{render(workflow)}</div></div></section><section className="gallery-section"><div className="gallery-section-heading"><h3>视觉叙事 · 日常切片</h3><span>VISUAL / ATMOSPHERE</span></div>{render(visuals[2])}</section></TabsContent></Tabs>:!isFilms&&<section className="gallery-section"><div className="gallery-section-heading"><h3>藏饰 · 商业视觉</h3><span>STILL / EDITORIAL</span></div><div className="work-grid commerce-grid">{visuals.slice(0,2).map(work=>render(work))}<div className="commerce-note"><span className="collection-index">01—02</span><h3>一件饰品，<br/>两种观看方式。</h3><p>从静物主视觉，到人物佩戴场景。让材质与细节，进入真实的光线。</p><span className="collection-line"/>{render(workflow)}</div></div></section>}
    {!isFilms&&!isVisuals&&<a className="gallery-space-feature" href="/visual-space" onClick={e=>{e.preventDefault();navigate('/visual-space')}}><span>03 / SPACE CASES</span><strong>从原始方案，到 AI 视觉延展。</strong><small>查看深圳天空艺术公园、深职大幼儿园等空间项目 ↗</small></a>}
    <footer className="gallery-footer"><span>GANGDAO / THE CUBE</span><a href="/cube" onClick={e=>{e.preventDefault();navigate('/cube')}}>探索另一面 ↗</a></footer>
    {opened&&<Viewer work={opened} onClose={()=>setOpened(null)}/>}
  </>
}

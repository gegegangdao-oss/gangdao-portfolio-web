'use client';
import {Component,lazy,Suspense,useCallback,useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import Header from './Header';
import HeroScreen from './HeroScreen';
import CubeDirectory from './CubeDirectory';
import ContentScreen from './ContentScreen';
import CustomCursor from './CustomCursor';
import TargetCursor from './TargetCursor';
const RubiksCube=lazy(()=>import('./RubiksCube'));
const Lightning=lazy(()=>import('./Lightning'));
class CubeBoundary extends Component<{children:React.ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<span className='cube-error'>三维预览暂不可用<br/><small>可通过文字入口继续浏览</small></span>:this.props.children}}
const knownPaths=['/','/cube','/projects','/films','/visual-space','/interactive','/workflow','/about','/contact'];
export default function Portfolio({initialPath='/'}:{initialPath?:string}){
const [screen,setScreen]=useState(initialPath);const [directoryVisible,setDirectoryVisible]=useState(initialPath==='/cube');const [ready,setReady]=useState(false);const [portraitLoaded,setPortraitLoaded]=useState(false);const [active,setActive]=useState<number|null>(null);const [expanded,setExpanded]=useState(false);const [busy,setBusy]=useState(false);const [size,setSize]=useState({w:1672,h:941});
const reduced=!!useReducedMotion();const timers=useRef<ReturnType<typeof setTimeout>[]>([]);const busyRef=useRef(false);const rootRef=useRef<HTMLElement>(null);const cubeRef=useRef<HTMLDivElement>(null);const portraitRef=useRef<HTMLImageElement>(null);
const later=(fn:()=>void,ms:number)=>{timers.current.push(setTimeout(fn,ms))};
// A cached/preloaded SSR image can finish before React attaches its onLoad listener.
// Reconcile the DOM's actual image state on hydration instead of waiting forever.
useEffect(()=>{const image=portraitRef.current;if(!image)return;const finish=()=>setPortraitLoaded(true);image.addEventListener('load',finish);image.addEventListener('error',finish);if(image.complete)finish();return()=>{image.removeEventListener('load',finish);image.removeEventListener('error',finish)}},[]);
useEffect(()=>{const path=location.pathname.replace(/\/$/,'')||'/';if(knownPaths.includes(path)){setScreen(path);setDirectoryVisible(path==='/cube')}setReady(true);const resize=()=>setSize({w:window.innerWidth,h:window.innerHeight});resize();window.addEventListener('resize',resize);const pop=()=>{timers.current.forEach(clearTimeout);busyRef.current=false;setBusy(false);setExpanded(false);const p=location.pathname;setScreen(knownPaths.includes(p)?p:'/');setDirectoryVisible(p==='/cube')};window.addEventListener('popstate',pop);const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!document.querySelector('[data-slot=dialog-content]')&&location.pathname!=='/'){pop();history.pushState({},'','/cube');setScreen('/cube');setDirectoryVisible(true)}};window.addEventListener('keydown',onKey);return()=>{window.removeEventListener('resize',resize);window.removeEventListener('popstate',pop);window.removeEventListener('keydown',onKey);timers.current.forEach(clearTimeout)}},[]);
const navigate=useCallback((path:string)=>{
if(busyRef.current||path===screen)return;
const fromHero=screen==='/'&&path==='/cube';
setActive(null);setExpanded(false);
if(fromHero){busyRef.current=true;setBusy(true);setScreen('/cube');setDirectoryVisible(false);history.pushState({},'',path);later(()=>setDirectoryVisible(true),1400);later(()=>{busyRef.current=false;setBusy(false);cubeRef.current?.focus({preventScroll:true})},1850)}
else{setScreen(path);setDirectoryVisible(path==='/cube');history.pushState({},'',path)}
},[screen,reduced]);
const select=(path:string)=>{if(busyRef.current)return;busyRef.current=true;setBusy(true);setExpanded(true);later(()=>{setScreen(path);setDirectoryVisible(false);setExpanded(false);busyRef.current=false;setBusy(false);history.pushState({},'',path)},reduced?150:950)};
const isHero=screen==='/';const isDirectory=screen==='/cube';const isResume=screen==='/workflow';const photoWidth=Math.max(size.w,size.h*1672/941);const photoHeight=photoWidth*941/1672;const mobile=size.w<=700;const assembling=busy&&isDirectory&&!expanded;
const heroCube=mobile?{left:size.w*.3973,top:size.h-size.w*.216,width:size.w*.1769,height:size.w*.1769}:{left:size.w*.5-photoWidth*.026,top:size.h*.5+photoHeight*.235,width:photoWidth*.122,height:photoWidth*.122};
const directoryCube=mobile?{left:size.w*.5,top:size.h*.455,width:Math.min(size.w*.58,size.h*.28),height:Math.min(size.w*.58,size.h*.28)}:{left:size.w*.5,top:size.h*.501,width:size.w*.255,height:size.w*.255};
const cubePosition=isHero?heroCube:directoryCube;
return <main ref={rootRef} className={'portfolio '+(isHero?'is-hero':isDirectory?'is-directory':'is-content')+(isResume?' is-resume':'')+(busy?' is-transitioning':'')+(!portraitLoaded&&isHero?' is-loading':'')} aria-busy={busy}>
<div className="blue-space"/>
<AnimatePresence>{isDirectory&&<motion.div key="lightning" className="lightning-layer lightning-container" aria-hidden="true" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?.01:1.15,delay:assembling?.45:0}}><Suspense fallback={null}><Lightning hue={218} speed={.32} intensity={.52} size={.9}/></Suspense></motion.div>}</AnimatePresence>
<motion.div className="portrait-layer" initial={false} animate={{opacity:isHero?1:0,filter:isHero?'blur(0px) brightness(1)':reduced?'blur(0px) brightness(.8)':'blur(7px) brightness(.8)'}} transition={{opacity:{duration:1,delay:busy?.7:0},filter:{duration:.7,delay:busy?.3:0}}}><img ref={portraitRef} className="portrait" src="/portrait.webp" alt="港岛低头专注于手中的魔方" onLoad={()=>setPortraitLoaded(true)} onError={()=>setPortraitLoaded(true)} fetchPriority="high"/></motion.div>
{!isResume&&<Header {...{screen,navigate}}/>}
<AnimatePresence>{isHero&&<motion.div key="hero" className="hero-layer" initial={false} exit={{opacity:0,y:reduced?0:-10}} animate={{opacity:portraitLoaded?1:0}} transition={{duration:.3}}><HeroScreen navigate={navigate}/><div className="cube-hint"><svg viewBox="0 0 90 55" aria-hidden="true"><path d="M0 53 62 3H88"/><circle cx="87" cy="3" r="2"/></svg><p>点击魔方，<br/>探索作品与我</p></div></motion.div>}</AnimatePresence>
<motion.div className="cube-shadow" animate={{opacity:isDirectory?.42:0,scale:expanded?1.15:1}} transition={{duration:1,delay:busy?.7:0}}/>
{ready&&(isHero||isDirectory)&&<motion.div ref={cubeRef} className={'cube-stage '+(isHero?'cube-in-hands':'cube-in-space')} style={{x:'-50%',y:'-50%'}} initial={false} animate={{...cubePosition,opacity:portraitLoaded||isDirectory?1:0,scale:expanded?1.06:1}} transition={{duration:busy?1.05:.5,delay:busy&&!expanded?.45:0,ease:[.22,1,.36,1]}} tabIndex={0} role={isHero?'button':'group'} aria-label={isHero?'Explore portfolio cube':'可拖动的三维魔方，方向键旋转，Home 复位'} data-cursor={isHero?'OPEN':'ROTATE'} onClick={()=>{if(isHero)navigate('/cube')}} onKeyDown={e=>{if(isHero&&(e.key==='Enter'||e.key===' ')){e.preventDefault();navigate('/cube')}}}>
<CubeBoundary><Suspense fallback={null}><RubiksCube directory={!isHero} {...{active,expanded,reduced,assembling}}/></Suspense></CubeBoundary>
{isDirectory&&!busy&&<span className="rotate-hint">拖动旋转 · DRAG TO ROTATE</span>}
</motion.div>}
<AnimatePresence>{isHero&&portraitLoaded&&<motion.div className="hand-occlusion" aria-hidden="true" initial={false} exit={{opacity:0}} transition={{duration:.25,delay:.42}}><img src="/portrait.webp" className="hand-left" alt=""/><img src="/portrait.webp" className="hand-right" alt=""/></motion.div>}</AnimatePresence>
<AnimatePresence>{isDirectory&&directoryVisible&&<CubeDirectory {...{active,setActive,reduced}} onSelect={select}/>}</AnimatePresence>
<AnimatePresence>{assembling&&<motion.div className="assembly-flare" aria-hidden="true" initial={{opacity:0,scale:.65}} animate={{opacity:[0,.78,.28,0],scale:[.65,1.12,1.42,1.7]}} exit={{opacity:0}} transition={{duration:1.55,times:[0,.28,.68,1],ease:'easeOut'}}/>}</AnimatePresence>
<AnimatePresence mode="wait">{!isHero&&!isDirectory&&<ContentScreen key={screen} path={screen} navigate={navigate}/>}</AnimatePresence>
{!portraitLoaded&&isHero&&<p className="loading-wordmark" role="status">GANGDAO</p>}{ready&&['/projects','/films','/visual-space'].includes(screen)?<TargetCursor spinDuration={3} hoverDuration={.25} parallaxOn={true} targetSelector=".work-image, .space-tabs button, .project-index a, .space-project-switch button, .back-link, .gallery-footer a"/>:<CustomCursor/>}
</main>
}





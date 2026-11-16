'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, Maximize2, Pause, Play, X} from 'lucide-react';
import {windhaven, type WindhavenImage} from '../../lib/windhaven-project';
import ProjectPager from './ProjectPager';
import {projectNavigation} from '../../lib/portfolio-projects';

function Reveal({children, className = ''}: {children: ReactNode; className?: string}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{opacity: 1, y: 0}} whileInView={reduced ? undefined : {opacity: [0.65, 1], y: [18, 0]}} viewport={{once: true, amount: 0.12}} transition={{duration: 0.65, ease: 'easeOut'}}>{children}</motion.div>;
}

function SectionLabel({number, children}: {number: string; children: ReactNode}) {
  return <p className="wh-label"><span>{number}</span>{children}</p>;
}

export default function WindhavenCase() {
  const {position, count} = projectNavigation('windhaven-01');
  const [view, setView] = useState(0);
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState<WindhavenImage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const playIntent = useRef(false);
  const [videoRequested, setVideoRequested] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const viewport = window.matchMedia('(min-width: 900px)');
    const connection = (navigator as Navigator & {connection?: {saveData?: boolean}}).connection;
    const update = () => {
      setSmallScreen(!viewport.matches);
      if (viewport.matches && !reduced && !connection?.saveData) {
        playIntent.current = true;
        setVideoRequested(true);
      } else { video.current?.pause(); }
    };
    update();
    viewport.addEventListener('change', update);
    return () => viewport.removeEventListener('change', update);
  }, [reduced]);

  useEffect(() => {
    const element = video.current;
    if (!element || !videoRequested) return;
    if (playIntent.current) { void element.play().catch(() => {}); playIntent.current = false; }
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) element.pause(); }, {threshold: 0.1});
    observer.observe(element);
    const pauseWhenHidden = () => { if (document.hidden) element.pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', pauseWhenHidden); };
  }, [videoRequested]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => { element?.close(); document.body.style.overflow = previousOverflow; previous?.focus({preventScroll: true}); };
  }, [expanded]);

  function toggleVideo() {
    if (playing) { video.current?.pause(); return; }
    if (!videoRequested) { playIntent.current = true; setVideoRequested(true); }
    else { void video.current?.play().catch(() => {}); }
  }

  function picture(item: WindhavenImage, className = '') {
    return <button type="button" className={`wh-picture ${className}`} onClick={() => setExpanded(item)} aria-label={`放大查看：${item.caption}`}>
      <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async"/>
      <span className="wh-expand" aria-hidden="true"><Maximize2 size={15}/></span>
    </button>;
  }

  return <article className="windhaven-page">
    <div className="wh-breadcrumb wh-container"><a href="/interior-design"><ArrowLeft size={14}/>室内与产品 / 项目列表</a><span>OBJECT STUDY — {String(position).padStart(2, '0')} / {String(count).padStart(2, '0')}</span></div>

    <section className="wh-hero" aria-labelledby="wh-title">
      <div className="wh-hero-media">
        <video ref={video} src={videoRequested ? windhaven.video : undefined} poster={windhaven.views[2].src} width="720" height="960" muted loop playsInline preload="none" controls={smallScreen && videoRequested && !videoError} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setVideoError(true)} aria-label="栖风休闲椅 Muse AI 产品概念短片">
          您的浏览器不支持视频播放。
        </video>
      </div>
      <motion.div className="wh-hero-copy" initial={{opacity: 1}} animate={reduced ? undefined : {opacity: [0, 1]}} transition={{duration: 1}}>
        <p className="wh-kicker">A SELF-INITIATED DESIGN BY LIU BO</p>
        <h1 id="wh-title">WINDHAVEN<span>01 <i>/</i> 栖风</span></h1>
        <p className="wh-hero-category">Outdoor Lounge Chair<br/><span>Concept Design</span></p>
        <a href="#wh-concept" className="wh-scroll">EXPLORE THE OBJECT <ArrowDown size={15}/></a>
      </motion.div>
      <div className="wh-hero-controls"><span>MUSE / AI CONCEPT FILM</span>{videoError ? <span role="status">短片暂不可用，请浏览下方产品图</span> : <button type="button" onClick={toggleVideo} aria-label={playing ? '暂停产品短片' : '播放产品短片'}>{playing ? <Pause size={14}/> : <Play size={14}/>}<span>{playing ? '暂停' : '播放短片'}</span></button>}</div>
    </section>

    <div className="wh-facts wh-container">
      <div><span>PROJECT</span><p>户外休闲椅概念设计</p></div>
      <div><span>AUTHORSHIP</span><p>刘博 / 独立构思</p></div>
      <div><span>EXPLORATION</span><p>产品造型 · CMF · 空间视觉</p></div>
      <div><span>STATUS</span><p>原创概念提案 / 非量产产品</p></div>
    </div>

    <section id="wh-concept" className="wh-concept wh-container wh-section">
      <Reveal><SectionLabel number="01">DESIGN PHILOSOPHY / 设计理念</SectionLabel><h2 className="wh-display">Let the<br/>wind in.</h2><p className="wh-quote">让风穿过设计，<br/>让身体停留在自然里。</p><p className="wh-translation">Let the wind pass through the design,<br/>and let the body stay in nature.</p></Reveal>
      <Reveal className="wh-concept-story">{picture(windhaven.hero)}<p className="wh-image-note">WINDHAVEN 01 / 产品概念效果图</p><p className="wh-body">海风掠过帆面，留下柔和而连续的曲线。栖风将这份流动感转译为金属骨架，以通透绳编过滤光影，再用柔软坐垫承接身体的停留。</p><div className="wh-principles"><div><span>01 / FLOW</span><p>帆面曲线</p></div><div><span>02 / BREATH</span><p>光与风的空隙</p></div><div><span>03 / REST</span><p>海岸般的松弛</p></div></div></Reveal>
    </section>

    <section className="wh-object wh-section" aria-labelledby="wh-object-title">
      <div className="wh-container">
        <Reveal className="wh-section-heading"><div><SectionLabel number="02">FORM & PROPORTION / 产品造型</SectionLabel><h2 id="wh-object-title">One object.<br/><em>Three perspectives.</em></h2></div><p className="wh-body">从正面到背面，<br/>看见曲线、编织与体量的关系。</p></Reveal>
        <div className="wh-viewer">
          <div id="wh-view-panel" role="tabpanel" aria-labelledby={`wh-view-${view}`} className="wh-view-image">{picture(windhaven.views[view])}<span className="wh-view-counter">0{view + 1} / 03</span></div>
          <div className="wh-view-sidebar"><div role="tablist" aria-label="选择产品视角" aria-orientation="vertical" className="wh-view-tabs">{windhaven.views.map((item, index) => <button type="button" key={item.id} id={`wh-view-${index}`} role="tab" aria-selected={view === index} aria-controls="wh-view-panel" tabIndex={view === index ? 0 : -1} onClick={() => setView(index)} onKeyDown={event => { if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (view + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : 2)) % 3; setView(next); document.getElementById(`wh-view-${next}`)?.focus();} }}><img src={item.src} width="1000" height="1201" alt="" loading="lazy"/><span><small>0{index + 1}</small>{item.label}<b>{item.chinese}</b></span><ArrowUpRight size={16}/></button>)}</div><div className="wh-view-description" aria-live="polite"><span>DESIGN DECISION / 设计判断</span><h3>{windhaven.views[view].question}</h3><p>{windhaven.views[view].text}</p></div><div className="wh-dimensions"><span>CONCEPT DIMENSIONS</span><p>W820 × D860 × H790 mm</p><small>概念座高 410 mm · 尺寸来自原始提案<br/>尚未经过实物打样与工程验证</small></div></div>
        </div>
      </div>
    </section>

    <section className="wh-cmf wh-section" aria-labelledby="wh-cmf-title">
      <div className="wh-container">
        <Reveal className="wh-section-heading"><div><SectionLabel number="03">COLOUR, MATERIAL & FINISH / 材质意向</SectionLabel><h2 id="wh-cmf-title">Warmth, woven<br/><em>into every curve.</em></h2></div><p className="wh-body">暖金属、自然木材与沙色编织，<br/>以一抹深海蓝收束海岸色彩。</p></Reveal>
        <div className="wh-cmf-layout"><Reveal className="wh-craft">{picture(windhaven.details[0])}<div className="wh-craft-pair">{windhaven.details.slice(1).map(item => <figure key={item.src}>{picture(item)}<figcaption>{item.caption}</figcaption></figure>)}</div><p className="wh-image-note">CRAFT STUDIES / 以上为概念效果细节，非实物样品</p></Reveal><div className="wh-materials">{windhaven.materials.map((item, index) => <Reveal key={item.name} className="wh-material"><span className="wh-swatch" style={{backgroundColor: item.color}} aria-hidden="true"/><div><span className="wh-material-en">0{index + 1} / {item.english}</span><h3>{item.name}</h3><p>{item.text}</p></div></Reveal>)}</div></div>
        <p className="wh-cmf-note">材料与工艺为概念阶段的设计意向。耐候性、结构强度及量产可行性仍需选材、打样与测试验证。</p>
      </div>
    </section>

    <section className="wh-context wh-section wh-container" aria-labelledby="wh-context-title">
      <Reveal className="wh-context-copy"><SectionLabel number="04">DESIGN IN CONTEXT / 空间应用</SectionLabel><h2 id="wh-context-title">A quieter way<br/><em>to be outdoors.</em></h2><p className="wh-quote">在自然中，留下一席。</p><p className="wh-body">面向海景露台、私人庭院与度假酒店的休闲场景。开放的编织与柔和轮廓，让家具成为建筑和自然之间的一段过渡。</p><ul className="wh-context-list"><li><span>01</span>海景度假酒店<small>COASTAL RESORT</small></li><li><span>02</span>私人露台庭院<small>PRIVATE TERRACE</small></li><li><span>03</span>精品酒店休闲区<small>BOUTIQUE HOSPITALITY</small></li></ul><p className="wh-image-note">展示海景露台概念图；其他场景为应用定位。</p></Reveal>
      <Reveal className="wh-context-image">{picture(windhaven.context)}<p className="wh-image-note">DESIGN IN CONTEXT / AI 辅助概念效果图</p></Reveal>
    </section>

    <section className="wh-proposal wh-section" aria-labelledby="wh-proposal-title">
      <div className="wh-container"><Reveal className="wh-section-heading"><div><SectionLabel number="05">THE COMPLETE PROPOSAL / 完整提案</SectionLabel><h2 id="wh-proposal-title">The thinking,<br/><em>in five pages.</em></h2></div><a className="wh-download" href={windhaven.pdf} download="WINDHAVEN-01-Concept-Proposal.pdf"><Download size={16}/>Download Project PDF<span>5 PAGES / PDF</span></a></Reveal>
        <div className="wh-proposal-browser"><div id="wh-proposal-panel" role="tabpanel" aria-labelledby={`wh-proposal-tab-${slide}`}>{picture(windhaven.proposal[slide])}</div><div className="wh-proposal-controls"><button type="button" onClick={() => setSlide((slide + 4) % 5)} aria-label="上一页设计提案"><ArrowLeft size={19}/></button><div aria-live="polite"><span>0{slide + 1} / 05</span><p>{windhaven.proposal[slide].title}</p></div><button type="button" onClick={() => setSlide((slide + 1) % 5)} aria-label="下一页设计提案"><ArrowRight size={19}/></button></div><p className={`wh-proposal-note ${slide === 1 ? 'is-reference' : ''}`} aria-live="polite">{windhaven.proposal[slide].note}</p><div className="wh-proposal-tabs" role="tablist" aria-label="设计提案页码">{windhaven.proposal.map((item, index) => <button type="button" key={item.src} id={`wh-proposal-tab-${index}`} role="tab" aria-selected={slide === index} aria-controls="wh-proposal-panel" tabIndex={slide === index ? 0 : -1} onClick={() => setSlide(index)} onKeyDown={event => {if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (slide + (event.key === 'ArrowRight' ? 1 : 4)) % 5; setSlide(next); document.getElementById(`wh-proposal-tab-${next}`)?.focus();}}}><span>0{index + 1}</span>{item.title.split(' / ')[1]}</button>)}</div></div>
      </div>
    </section>

    <section className="wh-ending wh-section wh-container"><Reveal><SectionLabel number="06">FROM IDEA TO EXPRESSION / 项目回顾</SectionLabel><h2>From Concept<br/>to Visual Experience.</h2><p className="wh-body">以独立概念构思为起点，让产品、材料与空间共同组成完整的视觉叙事。</p><ol className="wh-process">{['概念构思', '产品造型', 'CMF 材质研究', '空间应用意向', 'AI 影像表达'].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}{index < 4 && <ArrowRight size={14} aria-hidden="true"/>}</li>)}</ol><div className="wh-authorship"><p>独立原创概念提案 · AI 辅助视觉呈现</p><p>本项目并非广州亚帝实业有限公司已发布或实际生产的产品，无品牌合作、获奖、量产或性能测试声明。</p></div><a className="wh-back" href="/interior-design"><ArrowLeft size={18}/>返回室内与产品作品集<span>ALL PROJECTS</span></a></Reveal></section>

    <div className="wh-container"><ProjectPager slug="windhaven-01"/></div>

    {expanded && <dialog ref={dialog} className="wh-lightbox" aria-label={expanded.caption} onCancel={event => {event.preventDefault(); setExpanded(null);}} onClick={event => {if (event.target === event.currentTarget) setExpanded(null);}}><button type="button" className="wh-lightbox-close" onClick={() => setExpanded(null)} autoFocus aria-label="关闭大图"><X size={22}/>关闭</button><img src={expanded.src} width={expanded.width} height={expanded.height} alt={expanded.alt}/><p>{expanded.caption}</p></dialog>}
  </article>;
}

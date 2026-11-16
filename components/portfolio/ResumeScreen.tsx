'use client';
import {ArrowUpRight, Box, Layers, Code2, Sparkles, GraduationCap, Download} from 'lucide-react';
import CareerFocus from './CareerFocus';
import SiteHeader from './SiteHeader';
import profile from '../../lib/resume-profile.json';

const icons = {sparkles: Sparkles, layers: Layers, code: Code2, box: Box};
export default function ResumeScreen({navigate}: {navigate: (path: string) => void}) {
  return <section className="resume-web" aria-label="个人简历">
    <SiteHeader currentPath="/workflow" theme="resume" navigate={navigate}/>
    <div className="resume-body">
      <nav className="resume-chapters" aria-label="简历章节"><a href="#resume-profile">简介</a><a href="#resume-focus">方向</a><a href="#resume-experience">经历</a><a href="#resume-skills">技能</a><a href={profile.pdf} download="LIU-BO-Resume.pdf">下载简历 PDF ↗</a></nav>
      <section id="resume-profile" className="resume-intro">
        <div className="resume-index">PERSONAL RESUME<span>空间思维 · 视觉叙事 · AI WORKFLOW</span></div>
        <div className="resume-intro-grid"><div><span className="resume-kicker">{profile.name} / {profile.brand}</span><h1>FROM SPACE<br/>TO AI WORLDS<span>从空间设计，走向 AI 创作。</span></h1><div className="resume-orbit" aria-hidden="true"><div/><div/><div/><span>SPACE × AI</span></div></div>
          <div className="resume-statement"><span className="resume-kicker">01 — INTRODUCTION</span><h2>让空间思维，<br/>成为创意的另一种可能。</h2><p>{profile.intro}</p><p>从概念图与效果表达，到需求分析、Prompt Workflow 与自定义 Skill，将 AI 融入方案探索、视觉表达与内容制作。</p>
            <div className="resume-facts"><div><strong>SPACE</strong><span>空间方案</span></div><div><strong>OBJECT</strong><span>产品概念</span></div><div><strong>AI VISUAL</strong><span>视觉与影像</span></div></div>
            <div className="resume-actions"><a className="resume-download" href={profile.pdf} download="LIU-BO-Resume.pdf"><Download size={16}/>下载简历 PDF</a><a className="resume-contact" href="/contact" onClick={event => {if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate('/contact');}}>联系我 <ArrowUpRight size={18}/></a></div>
          </div>
        </div>
      </section>
      <CareerFocus/>
      <section id="resume-experience" className="resume-section"><div className="resume-section-heading"><span>03 / SELECTED EXPERIENCE</span><h2>让每段经历，都有作品可以阅读。</h2></div>
        <div className="resume-projects">{profile.selectedProjects.map((project, index) => <article key={project.name}><span className="resume-project-no">0{index + 1}</span><div><small>{project.date}</small><h3><a href={project.href}>{project.name} ↗</a></h3><span>{project.type}</span></div><div><p>{project.text}</p><div className="resume-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        <details className="resume-additional"><summary>其他空间与 AI 方案研究</summary><div className="resume-projects">{profile.extraProjects.map((project, index) => <article key={project.name}><span className="resume-project-no">0{index + 1}</span><div><small>{project.date}</small><h3>{project.name}</h3><span>{project.type}</span></div><div><p>{project.text}</p><div className="resume-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></details>
        <div className="resume-work"><span className="resume-kicker">WORK EXPERIENCE / 工作经历</span>{profile.workExperience.map(work => <article key={work[1]}><small>{work[0]}</small><h3>{work[1]}</h3><span>{work[2]}</span><p>{work[3]}</p></article>)}</div>
      </section>
      <section id="resume-skills" className="resume-section"><div className="resume-section-heading"><span>04 / SKILLS & PROFILE</span><h2>设计是基础，工具让边界延伸。</h2></div><div className="resume-skill-grid">{profile.skills.map(skill => {const Icon = icons[skill.icon as keyof typeof icons]; return <article key={skill.name}><Icon size={27}/><h3>{skill.name}</h3><p>{skill.text}</p><small>{skill.tools}</small></article>;})}</div><div className="resume-education"><GraduationCap size={30}/><div><span className="resume-kicker">EDUCATION / {profile.education.period}</span><h3>{profile.education.school} · {profile.education.major}</h3><p>系统学习色彩、构图、形体、比例与空间关系，让审美判断与视觉表达成为持续创作的基础。</p></div></div><div className="resume-principles"><span>持续学习与探索</span><span>主动研究与实践</span><span>跨界整合</span><span>分享与协作</span></div></section>
      <footer className="resume-end"><span>GANGDAO / LIU BO</span><a href="/contact" onClick={event => {if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate('/contact');}}>一起创造下一种可能 ↗</a></footer>
    </div>
  </section>;
}

'use client';
import {motion} from 'framer-motion';
import DirectoryItem from './DirectoryItem';
import {categories} from './data';
export default function CubeDirectory({active,setActive,onSelect,reduced}:{active:number|null,setActive:(v:number|null)=>void,onSelect:(p:string)=>void,reduced:boolean}){
return <motion.section className="directory" aria-label="魔方探索目录" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}><div className="directory-heading"><i/><p>探索目录</p><h1>THE CUBE</h1><small>每一面，都是我的一种可能。</small></div><svg className="directory-lines" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">{['M479 372H589L644 407','M466 503H595L644 481','M492 641H582L644 588','M1201 372H1083L1029 407','M1201 503H1078L1029 481','M1201 641H1089L1029 588'].map((d,i)=><g key={d} opacity={active===null?.8:active===i?1:.3}><path d={d}/><circle cx={i<3?644:1029} cy={[407,481,588][i%3]} r="2.4"/></g>)}</svg>{categories.map((item,index)=><DirectoryItem key={item.path} {...{item,index,active,setActive,onSelect,reduced}}/>)}<div className="signature" aria-hidden="true"><span className="nine-dots">{Array.from({length:9},(_,i)=><i key={i}/>)}</span><p>CREATE<br/>IMAGINE<br/>CONNECT<br/>A BRIGHTER TOMORROW</p></div><p className="directory-footer"><i/>选择分类，进入作品</p></motion.section>
}

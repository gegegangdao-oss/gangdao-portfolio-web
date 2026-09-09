'use client';
import {motion} from 'framer-motion';
import {categories} from './data';
export default function DirectoryItem({item,index,active,setActive,onSelect,reduced}:{item:typeof categories[number],index:number,active:number|null,setActive:(v:number|null)=>void,onSelect:(p:string)=>void,reduced:boolean}){
return <motion.a className={'directory-item item-'+index} href={item.path} data-cursor="VIEW" initial={{opacity:0,y:reduced?0:12}} animate={{opacity:active===null?.85:active===index?1:.4,y:0,x:active===index?5:0}} transition={{duration:.3,delay:active===null?index*.055:0}} onMouseEnter={()=>setActive(index)} onMouseLeave={()=>setActive(null)} onFocus={()=>setActive(index)} onBlur={()=>setActive(null)} onClick={e=>{e.preventDefault();onSelect(item.path)}}><span className="directory-number">{item.number}</span><span className="directory-label"><span>{item.title}<b>→</b></span><small>{item.english}</small></span></motion.a>
}

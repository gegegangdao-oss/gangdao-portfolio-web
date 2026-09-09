'use client';
import {useState} from 'react';
export default function Header({screen,navigate}:{screen:string,navigate:(path:string)=>void}){
 const [open,setOpen]=useState(false);
 const links=[['首页','/'],['作品','/cube'],['关于','/about'],['联系','/contact']];
 return <header className="header"><a className="brand" href="/" onClick={e=>{e.preventDefault();navigate('/')}} aria-label="GANGDAO 首页"><span>GANGDAO</span><small>AIGC VISUAL CREATIVE DESIGNER</small></a><button className="mobile-menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'CLOSE':'MENU'}</button><nav aria-label="主导航" className={open?'is-open':''}>{links.map(([label,path])=><a key={path} href={path} aria-current={(screen===path||(path==='/cube'&&!['/','/about','/contact'].includes(screen)))?'page':undefined} onClick={e=>{e.preventDefault();setOpen(false);navigate(path)}}>{label}</a>)}</nav></header>
}

'use client';

import {useEffect,useRef,useState} from 'react';
import type {InteriorMedia} from '../../lib/interior-projects';

export default function InteriorMediaGallery({media,layout='grid'}:{media:InteriorMedia[];layout?:'feature'|'pair'|'grid'|'plans'}) {
  const [selected,setSelected]=useState<InteriorMedia|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);

  useEffect(()=>{
    if(!selected)return;
    const previous=document.activeElement as HTMLElement|null;
    const element=dialog.current;
    element?.showModal();
    return ()=>{element?.close();previous?.focus({preventScroll:true})};
  },[selected]);

  if(media.length===0)return null;

  return <>
    <div className={`interior-media-grid interior-media-${layout}`}>
      {media.map((item,index)=><figure key={item.src} className={`interior-media-item ${item.type==='平面图'||item.type==='功能分析图'?'is-drawing':''}`}>
        <button type="button" className="interior-media-open" onClick={()=>setSelected(item)} aria-label={`放大查看：${item.caption}`}>
          <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading={index===0&&layout==='feature'?'eager':'lazy'} decoding="async"/>
          <span aria-hidden="true">↗</span>
        </button>
        <figcaption><span>{item.type}</span><strong>{item.caption}</strong></figcaption>
      </figure>)}
    </div>
    {selected&&<dialog ref={dialog} className="interior-lightbox" aria-label={selected.caption} onCancel={event=>{event.preventDefault();setSelected(null)}} onClick={event=>{if(event.target===event.currentTarget)setSelected(null)}}>
      <div className="interior-lightbox-panel">
        <button type="button" className="interior-lightbox-close" onClick={()=>setSelected(null)} autoFocus aria-label="关闭大图">关闭 ×</button>
        <img src={selected.src} width={selected.width} height={selected.height} alt={selected.alt}/>
        <p><span>{selected.type}</span>{selected.caption}</p>
      </div>
    </dialog>}
  </>;
}

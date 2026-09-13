'use client';

import {useCallback,useEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {Mesh,Program,Renderer,Texture,Triangle} from 'ogl';
import {gsap} from 'gsap';
import './MorphSlider.css';

export type MorphItem={image:string;caption:string};
type Props={items:MorphItem[];startIndex?:number;duration?:number;intensity?:number;loop?:boolean;className?:string};
type GL=Renderer['gl'];

const vertex=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}
`;

const fragment=`
precision highp float;
uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uIntensity;
uniform float uTime;
uniform float uReduce;
varying vec2 vUv;

float hash21(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031);
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
  float a=hash21(i),b=hash21(i+vec2(1.0,0.0));
  float c=hash21(i+vec2(0.0,1.0)),d=hash21(i+vec2(1.0,1.0));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0,a=0.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}
  return v;
}
vec2 coverUV(vec2 uv,vec2 res,vec2 img){
  float rA=res.x/max(res.y,1.0),iA=img.x/max(img.y,1.0);
  vec2 s=vec2(1.0);float ratio=rA/max(iA,0.0001);
  if(ratio>1.0){s.y=1.0/ratio;}else{s.x=ratio;}
  return (uv-0.5)*s+0.5;
}
void main(){
  float p=clamp(uProgress,0.0,1.0);
  vec2 uv=vUv;
  vec2 uvC=uv,uvN=uv;
  float m=smoothstep(0.0,1.0,p);
  if(uReduce<0.5){
    float n=fbm(uv*2.45+uTime*0.03);
    float warp=fbm(uv*4.1-uTime*0.02);
    vec2 displacement=(vec2(n,warp)-0.5)*uIntensity;
    uvC=uv+displacement*0.5*p;
    uvN=uv-displacement*0.5*(1.0-p);
    m=smoothstep(n-0.15,n+0.15,p);
  }
  vec3 current=texture2D(tCurrent,coverUV(uvC,uResolution,uCurrentSize)).rgb;
  vec3 next=texture2D(tNext,coverUV(uvN,uResolution,uNextSize)).rgb;
  vec3 col=mix(current,next,m);
  float lum=dot(col,vec3(0.2126,0.7152,0.0722));
  vec3 navy=mix(vec3(0.018,0.075,0.155),vec3(0.37,0.67,1.0),smoothstep(0.0,1.0,lum));
  col=mix(col,navy,0.14);
  col*=vec3(0.94,0.97,1.04);
  float vignette=smoothstep(1.15,0.24,length(uv-0.5));
  col=mix(col,vec3(0.025,0.11,0.22),(1.0-vignette)*0.2);
  gl_FragColor=vec4(col,1.0);
}
`;

function fallbackTexture(gl:GL){
  const data=new Uint8Array([10,43,84,255,10,43,84,255,10,43,84,255,10,43,84,255]);
  return new Texture(gl,{image:data,width:2,height:2,generateMipmaps:false});
}

class MorphEngine{
  private container:HTMLElement;
  private items:MorphItem[];
  private renderer:Renderer;
  private gl:GL;
  private canvas:HTMLCanvasElement;
  private geometry:Triangle;
  private program:Program;
  private mesh:Mesh;
  private textures:Texture[];
  private sizes:[number,number][];
  private current:number;
  private pendingTarget:number|null=null;
  private animating=false;
  private dragging=false;
  private dragDirection=0;
  private tween:gsap.core.Tween|null=null;
  private resizeObserver:ResizeObserver;
  private raf=0;
  private boundLoop:(time:number)=>void;
  private duration:number;
  private intensity:number;
  private loopSlides:boolean;
  private reduced:boolean;
  private onIndexChange:(index:number)=>void;

  constructor(container:HTMLElement,{items,startIndex,duration,intensity,loop,onIndexChange}:{items:MorphItem[];startIndex:number;duration:number;intensity:number;loop:boolean;onIndexChange:(index:number)=>void}){
    this.container=container;this.items=items;this.current=startIndex;this.duration=duration;this.intensity=intensity;this.loopSlides=loop;this.onIndexChange=onIndexChange;
    this.reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.renderer=new Renderer({alpha:false,antialias:true,dpr:Math.min(window.devicePixelRatio||1,1.5)});
    this.gl=this.renderer.gl;this.gl.clearColor(.02,.08,.16,1);
    this.canvas=this.gl.canvas as HTMLCanvasElement;this.canvas.className='morph-slider-canvas';container.appendChild(this.canvas);
    this.geometry=new Triangle(this.gl);
    this.textures=items.map(()=>fallbackTexture(this.gl));
    this.sizes=items.map(()=>[1,1]);
    this.program=new Program(this.gl,{vertex,fragment,uniforms:{
      tCurrent:{value:this.textures[startIndex]},tNext:{value:this.textures[startIndex]},
      uResolution:{value:[1,1]},uCurrentSize:{value:this.sizes[startIndex]},uNextSize:{value:this.sizes[startIndex]},
      uProgress:{value:0},uIntensity:{value:this.reduced?intensity*.55:intensity},uTime:{value:0},uReduce:{value:0}
    }});
    this.mesh=new Mesh(this.gl,{geometry:this.geometry,program:this.program});
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(container);this.resize();
    this.loadTextures();this.boundLoop=this.render.bind(this);this.raf=requestAnimationFrame(this.boundLoop);
  }

  private loadTextures(){
    this.items.forEach((item,index)=>{
      const image=new Image();image.src=item.image;
      image.onload=()=>{
        const texture=new Texture(this.gl,{generateMipmaps:false});texture.image=image;
        this.textures[index]=texture;this.sizes[index]=[image.naturalWidth||1,image.naturalHeight||1];
        if(index===this.current){this.program.uniforms.tCurrent.value=texture;this.program.uniforms.uCurrentSize.value=this.sizes[index];}
        if(index===this.pendingTarget){this.program.uniforms.tNext.value=texture;this.program.uniforms.uNextSize.value=this.sizes[index];}
      };
    });
  }
  private resize(){
    const rect=this.container.getBoundingClientRect();this.renderer.setSize(Math.max(rect.width,1),Math.max(rect.height,1));
    this.program.uniforms.uResolution.value=[this.gl.canvas.width,this.gl.canvas.height];
  }
  private render(time:number){this.program.uniforms.uTime.value=time*.001;this.renderer.render({scene:this.mesh});this.raf=requestAnimationFrame(this.boundLoop);}
  private valid(index:number){return this.loopSlides?((index%this.items.length)+this.items.length)%this.items.length:index;}
  private prepare(index:number){
    const target=this.valid(index);if(target<0||target>=this.items.length)return null;
    this.pendingTarget=target;this.program.uniforms.tCurrent.value=this.textures[this.current];this.program.uniforms.uCurrentSize.value=this.sizes[this.current];
    this.program.uniforms.tNext.value=this.textures[target];this.program.uniforms.uNextSize.value=this.sizes[target];return target;
  }
  private commit(target:number){
    this.current=target;this.pendingTarget=null;this.program.uniforms.tCurrent.value=this.textures[target];this.program.uniforms.uCurrentSize.value=this.sizes[target];
    this.program.uniforms.uProgress.value=0;this.animating=false;this.tween=null;
  }
  goTo(index:number){
    if(this.animating||this.dragging||index===this.current)return;
    const target=this.prepare(index);if(target===null)return;
    this.animating=true;this.onIndexChange(target);
    this.tween=gsap.fromTo(this.program.uniforms.uProgress,{value:0},{value:1,duration:this.reduced?Math.min(this.duration,.4):this.duration,ease:'power2.inOut',onComplete:()=>this.commit(target)});
  }
  next(){this.goTo(this.current+1)}
  prev(){this.goTo(this.current-1)}
  beginDrag(){if(this.animating||this.items.length<2)return false;this.dragging=true;this.dragDirection=0;return true;}
  drag(delta:number){
    if(!this.dragging)return;const direction=delta<0?1:-1;const raw=this.current+direction;
    if(!this.loopSlides&&(raw<0||raw>=this.items.length)){this.program.uniforms.uProgress.value=0;return;}
    if(direction!==this.dragDirection){this.dragDirection=direction;this.prepare(raw);}
    this.program.uniforms.uProgress.value=Math.min(Math.abs(delta),1);
  }
  endDrag(){
    if(!this.dragging)return;this.dragging=false;if(!this.dragDirection)return;
    const progress=this.program.uniforms.uProgress.value as number;const target=this.valid(this.current+this.dragDirection);this.animating=true;
    if(progress>.18){this.onIndexChange(target);this.tween=gsap.to(this.program.uniforms.uProgress,{value:1,duration:this.reduced?.25:.48,ease:'power2.out',onComplete:()=>this.commit(target)});}
    else{this.tween=gsap.to(this.program.uniforms.uProgress,{value:0,duration:.32,ease:'power2.out',onComplete:()=>{this.pendingTarget=null;this.animating=false;this.tween=null;}});}
  }
  destroy(){
    cancelAnimationFrame(this.raf);this.tween?.kill();this.resizeObserver.disconnect();this.textures.forEach(texture=>{if(texture.texture)this.gl.deleteTexture(texture.texture)});
    if(this.program.program)this.gl.deleteProgram(this.program.program);this.gl.getExtension('WEBGL_lose_context')?.loseContext();this.canvas.remove();
  }
}

export default function MorphSlider({items,startIndex=0,duration=1.05,intensity=.55,loop=false,className=''}:Props){
  const stageRef=useRef<HTMLDivElement>(null);const engineRef=useRef<MorphEngine|null>(null);const [index,setIndex]=useState(startIndex);
  const next=useCallback(()=>engineRef.current?.next(),[]);const previous=useCallback(()=>engineRef.current?.prev(),[]);
  useEffect(()=>{
    const stage=stageRef.current;if(!stage)return;
    const engine=new MorphEngine(stage,{items,startIndex,duration,intensity,loop,onIndexChange:setIndex});engineRef.current=engine;
    let x=0,y=0,width=1,height=1,dragging=false,lastWheel=0;
    const down=(event:PointerEvent)=>{const rect=stage.getBoundingClientRect();x=event.clientX;y=event.clientY;width=rect.width||1;height=rect.height||1;dragging=engine.beginDrag();if(dragging)stage.setPointerCapture?.(event.pointerId)};
    const move=(event:PointerEvent)=>{if(!dragging)return;const dx=(event.clientX-x)/width,dy=(event.clientY-y)/height;engine.drag(Math.abs(dy)>Math.abs(dx)?dy:dx)};
    const up=()=>{if(!dragging)return;dragging=false;engine.endDrag()};
    const wheel=(event:WheelEvent)=>{event.preventDefault();const now=Date.now();if(Math.abs(event.deltaY)<10||now-lastWheel<850)return;lastWheel=now;event.deltaY>0?engine.next():engine.prev()};
    stage.addEventListener('pointerdown',down);stage.addEventListener('pointermove',move);stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);stage.addEventListener('wheel',wheel,{passive:false});
    return()=>{stage.removeEventListener('pointerdown',down);stage.removeEventListener('pointermove',move);stage.removeEventListener('pointerup',up);stage.removeEventListener('pointercancel',up);stage.removeEventListener('wheel',wheel);engine.destroy();engineRef.current=null;};
  },[items,startIndex,duration,intensity,loop]);
  const onKeyDown=(event:React.KeyboardEvent)=>{if(['ArrowDown','ArrowRight','PageDown'].includes(event.key)){event.preventDefault();next()}else if(['ArrowUp','ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();previous()}};
  return <div className={`morph-slider ${className}`.trim()} style={{'--ms-duration':`${duration}s`} as CSSProperties}>
    <div ref={stageRef} className="morph-slider-stage" tabIndex={0} role="group" aria-roledescription="carousel" aria-label="个人简历翻页" onKeyDown={onKeyDown}/>
    <div className="morph-slider-controls">
      <button type="button" className="morph-slider-btn" aria-label="上一页" onClick={previous} disabled={!loop&&index===0}>↑</button>
      <button type="button" className="morph-slider-btn" aria-label="下一页" onClick={next} disabled={!loop&&index===items.length-1}>↓</button>
    </div>
    <div className="morph-slider-indicators" role="tablist" aria-label="简历页码">{items.map((item,itemIndex)=><button key={item.image} type="button" role="tab" aria-selected={itemIndex===index} aria-label={`前往${item.caption}`} className={`morph-slider-dot ${itemIndex===index?'is-active':''}`} onClick={()=>engineRef.current?.goTo(itemIndex)}><span>{String(itemIndex+1).padStart(2,'0')}</span></button>)}</div>
    <p className="morph-slider-caption" aria-live="polite">{items[index]?.caption}</p>
  </div>;
}

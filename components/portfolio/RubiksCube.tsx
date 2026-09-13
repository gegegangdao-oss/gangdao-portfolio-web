'use client';
import {Suspense,useEffect,useMemo,useRef,useState} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';
import * as THREE from 'three';

type Props={directory:boolean,active:number|null,expanded:boolean,reduced:boolean,assembling:boolean};
const MODEL_URL='/mofang.glb';
const sliceNames=['slice-top','slice-middle','slice-bottom'];
const sliceAngles=[Math.PI/2,-Math.PI/2,Math.PI/2];

const clamp=(value:number,min=0,max=1)=>Math.min(max,Math.max(min,value));
const smooth=(value:number)=>value*value*(3-2*value);
const phase=(progress:number,start:number,end:number)=>smooth(clamp((progress-start)/(end-start)));

function Model(props:Props){
const {scene}=useGLTF(MODEL_URL,true,true);const root=useRef<THREE.Group>(null);const sliceRefs=useRef<(THREE.Group|null)[]>([]);const {camera,size,gl,invalidate}=useThree();const velocity=useRef([0,0]);const rotation=useRef([.30,-.58]);const drag=useRef<{x:number,y:number}|null>(null);const assemblyStarted=useRef<number|null>(null);const [hover,setHover]=useState(false);
const slices=useMemo(()=>sliceNames.map(name=>{const slice=scene.getObjectByName(name);if(!slice)throw new Error('Missing GLB slice: '+name);return slice.clone(true)}),[scene]);
useEffect(()=>{const cam=camera as THREE.OrthographicCamera;cam.zoom=size.width/4.5;cam.updateProjectionMatrix();invalidate()},[size.width,camera,invalidate]);
useEffect(()=>{rotation.current=props.directory?[.30,-.58]:[.26,-.50];velocity.current=[0,0];invalidate()},[props.directory,invalidate]);
useEffect(()=>{if(props.assembling)assemblyStarted.current=performance.now();else if(!props.directory)assemblyStarted.current=null;invalidate()},[props.assembling,props.directory,invalidate]);
useEffect(()=>{const stage=gl.domElement.closest('.cube-stage');if(!stage)return;const onKey=(event:Event)=>{const e=event as KeyboardEvent;if(!props.directory)return;const step=.12;if(e.key==='ArrowLeft')rotation.current[1]-=step;else if(e.key==='ArrowRight')rotation.current[1]+=step;else if(e.key==='ArrowUp')rotation.current[0]-=step;else if(e.key==='ArrowDown')rotation.current[0]+=step;else if(e.key==='Home')rotation.current=[.30,-.58];else return;e.preventDefault();velocity.current=[0,0];invalidate()};stage.addEventListener('keydown',onKey);return()=>stage.removeEventListener('keydown',onKey)},[gl,props.directory,invalidate]);
useEffect(()=>{const el=gl.domElement;const down=(e:PointerEvent)=>{if(!props.directory||props.assembling)return;drag.current={x:e.clientX,y:e.clientY};velocity.current=[0,0];el.setPointerCapture(e.pointerId);el.style.cursor='grabbing';invalidate()};const move=(e:PointerEvent)=>{if(!drag.current)return;velocity.current=[(e.clientY-drag.current.y)*.005,(e.clientX-drag.current.x)*.005];rotation.current[0]+=velocity.current[0];rotation.current[1]+=velocity.current[1];drag.current={x:e.clientX,y:e.clientY};invalidate()};const up=()=>{drag.current=null;el.style.cursor='grab';invalidate()};el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);return()=>{el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up)}},[props.directory,props.assembling,gl,invalidate]);
useEffect(()=>{invalidate()},[props.active,props.expanded,props.assembling,hover,invalidate]);
useFrame((_,delta)=>{if(!root.current)return;if(!drag.current){if(!props.reduced){rotation.current[0]+=velocity.current[0];rotation.current[1]+=velocity.current[1];velocity.current=velocity.current.map(v=>v*Math.exp(-delta*7))}else velocity.current=[0,0]}
const now=performance.now();const assemblyProgress=props.assembling&&assemblyStarted.current!==null?clamp((now-assemblyStarted.current)/1450):props.directory?1:0;const sliceProgress=[phase(assemblyProgress,.03,.42),phase(assemblyProgress,.24,.66),phase(assemblyProgress,.48,.90)];sliceRefs.current.forEach((slice,index)=>{if(!slice)return;const turn=props.reduced?0:Math.sin(sliceProgress[index]*Math.PI);const separation=Math.sin(sliceProgress[index]*Math.PI)*.045*(index===0?1:index===2?-1:.35);slice.rotation.y=sliceAngles[index]*turn;slice.position.y=separation});
const tilt=props.active===null?0:(props.active<3?-.035:.035);const tx=rotation.current[0]+(hover&&!props.directory?.025:0),ty=rotation.current[1]+tilt+(props.assembling&&!props.reduced?Math.sin(assemblyProgress*Math.PI)*.16:0);const alpha=1-Math.exp(-Math.min(delta,.1)*8);root.current.rotation.x=THREE.MathUtils.lerp(root.current.rotation.x,tx,alpha);root.current.rotation.y=THREE.MathUtils.lerp(root.current.rotation.y,ty,alpha);const scale=hover&&!props.directory?1.035:props.expanded?1.08:1;root.current.scale.lerp(new THREE.Vector3(scale,scale,scale),alpha);
if(props.assembling||Math.abs(root.current.rotation.x-tx)+Math.abs(root.current.rotation.y-ty)+Math.abs(velocity.current[0])+Math.abs(velocity.current[1])>.0001||props.expanded||Math.abs(root.current.scale.x-scale)>.0001)invalidate();
});
return <group ref={root} rotation={[.26,-.50,0]} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)}><group position={[0,-1.58,0]} scale={4.42}>{slices.map((slice,index)=><group key={sliceNames[index]} ref={node=>{sliceRefs.current[index]=node}}><primitive object={slice}/></group>)}</group></group>
}

export default function RubiksCube(props:Props){return <Canvas orthographic camera={{position:[0,0,10],zoom:100,near:.1,far:100}} dpr={[1,1.5]} frameloop="demand" gl={{alpha:true,antialias:true,toneMapping:THREE.ACESFilmicToneMapping,toneMappingExposure:1.15}}><ambientLight intensity={1.9}/><directionalLight position={[-3,7,5]} intensity={4.1}/><directionalLight position={[4,1,2]} intensity={1.4} color="#b6d5ff"/><directionalLight position={[-4,-2,-1]} intensity={.9} color="#499eff"/><Suspense fallback={null}><Model {...props}/></Suspense></Canvas>}

useGLTF.preload(MODEL_URL,true,true);

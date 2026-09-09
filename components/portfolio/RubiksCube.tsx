'use client';
import {Suspense,useEffect,useRef,useState} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei';
import * as THREE from 'three';
type Props={directory:boolean,active:number|null,expanded:boolean,reduced:boolean};
const coords=Array.from({length:27},(_,i)=>[i%3-1,Math.floor(i/3)%3-1,Math.floor(i/9)-1] as [number,number,number]);
const faceColors=['#bd090b','#ff7015','#ffd62a','#f0f0e8','#003bf1','#039e4c'];
const rotations:[[number,number,number],[number,number,number],[number,number,number],[number,number,number],[number,number,number],[number,number,number]]=[[0,Math.PI/2,0],[0,-Math.PI/2,0],[-Math.PI/2,0,0],[Math.PI/2,0,0],[0,0,0],[0,Math.PI,0]];
const normals=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
function Cubelet({position,index,directory,expanded,active}:Props&{position:[number,number,number],index:number}){
const group=useRef<THREE.Group>(null);
useFrame((_,delta)=>{if(group.current){const spacing=expanded?1.14:1;group.current.position.lerp(new THREE.Vector3(...position).multiplyScalar(spacing),1-Math.exp(-delta*7))}});
return <group ref={group} position={position}><RoundedBox args={[.98,.98,.98]} radius={.07} smoothness={3}><meshPhysicalMaterial color="#080d15" roughness={.26} clearcoat={.6} clearcoatRoughness={.22}/></RoundedBox>{normals.map((normal,face)=>{if(!normal.some((n,axis)=>n!==0&&position[axis]===n))return null;const color=directory?faceColors[face]:faceColors[(index*7+face*3+(index%4===0?2:0))%6];const lit=active!==null&&[4,0,2,1,5,3][active]===face;return <RoundedBox key={face} args={[.85,.85,.044]} radius={.045} smoothness={3} position={normal.map(n=>n*.497) as [number,number,number]} rotation={rotations[face]}><meshPhysicalMaterial color={color} roughness={.28} metalness={0} clearcoat={.8} clearcoatRoughness={.2} emissive={color} emissiveIntensity={lit?.14:0}/></RoundedBox>})}</group>
}
function Model(props:Props){
const group=useRef<THREE.Group>(null);const {camera,size,gl,invalidate}=useThree();const velocity=useRef([0,0]);const rotation=useRef([.40,-.68]);const drag=useRef<{x:number,y:number}|null>(null);const [hover,setHover]=useState(false);
useEffect(()=>{const cam=camera as THREE.OrthographicCamera;cam.zoom=size.width/5.1;cam.updateProjectionMatrix();invalidate()},[size.width,camera,invalidate]);
useEffect(()=>{rotation.current=[.40,-.68];velocity.current=[0,0];invalidate()},[props.directory,invalidate]);
useEffect(()=>{const stage=gl.domElement.closest('.cube-stage');if(!stage)return;const onKey=(event:Event)=>{const e=event as KeyboardEvent;if(!props.directory)return;const step=.12;if(e.key==='ArrowLeft')rotation.current[1]-=step;else if(e.key==='ArrowRight')rotation.current[1]+=step;else if(e.key==='ArrowUp')rotation.current[0]-=step;else if(e.key==='ArrowDown')rotation.current[0]+=step;else if(e.key==='Home')rotation.current=[.40,-.68];else return;e.preventDefault();velocity.current=[0,0];invalidate()};stage.addEventListener('keydown',onKey);return()=>stage.removeEventListener('keydown',onKey)},[gl,props.directory,invalidate]);
useEffect(()=>{const el=gl.domElement;const down=(e:PointerEvent)=>{if(!props.directory)return;drag.current={x:e.clientX,y:e.clientY};velocity.current=[0,0];el.setPointerCapture(e.pointerId);el.style.cursor='grabbing';invalidate()};const move=(e:PointerEvent)=>{if(!drag.current)return;velocity.current=[(e.clientY-drag.current.y)*.005,(e.clientX-drag.current.x)*.005];rotation.current[0]+=velocity.current[0];rotation.current[1]+=velocity.current[1];drag.current={x:e.clientX,y:e.clientY};invalidate()};const up=()=>{drag.current=null;el.style.cursor='grab';invalidate()};el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);return()=>{el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up)}},[props.directory,gl,invalidate]);
useEffect(()=>{invalidate()},[props.active,props.expanded,invalidate]);
useFrame((_,delta)=>{if(!group.current)return;if(!drag.current){if(!props.reduced){rotation.current[0]+=velocity.current[0];rotation.current[1]+=velocity.current[1];velocity.current=velocity.current.map(v=>v*Math.exp(-delta*7))}else velocity.current=[0,0]}
const tilt=props.active===null?0:(props.active<3?-.045:.045);const tx=rotation.current[0]+(hover&&!props.directory?.02:0),ty=rotation.current[1]+tilt;const alpha=1-Math.exp(-Math.min(delta,.1)*8);group.current.rotation.x=THREE.MathUtils.lerp(group.current.rotation.x,tx,alpha);group.current.rotation.y=THREE.MathUtils.lerp(group.current.rotation.y,ty,alpha);const scale=hover&&!props.directory?1.025:1;group.current.scale.lerp(new THREE.Vector3(scale,scale,scale),alpha);
if(Math.abs(group.current.rotation.x-tx)+Math.abs(group.current.rotation.y-ty)+Math.abs(velocity.current[0])+Math.abs(velocity.current[1])>.0001||props.expanded||Math.abs(group.current.scale.x-scale)>.0001)invalidate();
});
return <group ref={group} rotation={[.40,-.68,0]} onPointerOver={()=>{setHover(true);invalidate()}} onPointerOut={()=>{setHover(false);invalidate()}}>{coords.map((position,index)=><Cubelet key={index} {...props} {...{position,index}}/>)}</group>
}
export default function RubiksCube(props:Props){return <Canvas orthographic camera={{position:[0,0,10],zoom:100,near:.1,far:100}} dpr={[1,1.5]} frameloop="demand" gl={{alpha:true,antialias:true,toneMapping:THREE.ACESFilmicToneMapping}}><ambientLight intensity={1.3}/><directionalLight position={[-3,7,5]} intensity={3.3}/><directionalLight position={[4,1,2]} intensity={.65} color="#b6d5ff"/><directionalLight position={[-4,-2,-1]} intensity={.4} color="#499eff"/><Suspense fallback={null}><Model {...props}/></Suspense></Canvas>}


'use client';

import {useEffect,useRef} from 'react';
import './Lightning.css';

type LightningProps={
  hue?:number;
  xOffset?:number;
  speed?:number;
  intensity?:number;
  size?:number;
};

const vertexShaderSource=`
attribute vec2 aPosition;
void main(){
  gl_Position=vec4(aPosition,0.0,1.0);
}
`;

const fragmentShaderSource=`
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float uHue;
uniform float uXOffset;
uniform float uSpeed;
uniform float uIntensity;
uniform float uSize;

#define OCTAVE_COUNT 10

vec3 hsv2rgb(vec3 c){
  vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
  return c.z*mix(vec3(1.0),rgb,c.y);
}

float hash11(float p){
  p=fract(p*0.1031);
  p*=p+33.33;
  p*=p+p;
  return fract(p);
}

float hash12(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031);
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}

mat2 rotate2d(float theta){
  float c=cos(theta);
  float s=sin(theta);
  return mat2(c,-s,s,c);
}

float noise(vec2 p){
  vec2 ip=floor(p);
  vec2 fp=fract(p);
  float a=hash12(ip);
  float b=hash12(ip+vec2(1.0,0.0));
  float c=hash12(ip+vec2(0.0,1.0));
  float d=hash12(ip+vec2(1.0,1.0));
  vec2 t=smoothstep(0.0,1.0,fp);
  return mix(mix(a,b,t.x),mix(c,d,t.x),t.y);
}

float fbm(vec2 p){
  float value=0.0;
  float amplitude=0.5;
  for(int i=0;i<OCTAVE_COUNT;i++){
    value+=amplitude*noise(p);
    p=rotate2d(0.45)*p*2.0+100.0;
    amplitude*=0.5;
  }
  return value;
}

void main(){
  vec2 uv=(gl_FragCoord.xy*2.0-iResolution.xy)/iResolution.y;
  uv.x+=uXOffset;
  uv+=2.0*fbm(uv*uSize+0.8*iTime*uSpeed)-1.0;
  float dist=abs(uv.x);
  float bolt=pow(mix(0.0,0.07,hash11(iTime*uSpeed))/max(dist,0.002),1.0)*uIntensity;
  vec3 color=hsv2rgb(vec3(uHue/360.0,0.52,1.0))*bolt;
  gl_FragColor=vec4(color,max(max(color.r,color.g),color.b));
}
`;

export default function Lightning({hue=218,xOffset=0,speed=.32,intensity=.52,size=.9}:LightningProps){
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false});
    if(!gl)return;

    const compileShader=(source:string,type:number)=>{
      const shader=gl.createShader(type);
      if(!shader)return null;
      gl.shaderSource(shader,source);
      gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader=compileShader(vertexShaderSource,gl.VERTEX_SHADER);
    const fragmentShader=compileShader(fragmentShaderSource,gl.FRAGMENT_SHADER);
    if(!vertexShader||!fragmentShader)return;

    const program=gl.createProgram();
    if(!program)return;
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }

    const buffer=gl.createBuffer();
    if(!buffer)return;
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    gl.useProgram(program);
    const position=gl.getAttribLocation(program,'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);

    const resolution=gl.getUniformLocation(program,'iResolution');
    const time=gl.getUniformLocation(program,'iTime');
    const hueLocation=gl.getUniformLocation(program,'uHue');
    const xOffsetLocation=gl.getUniformLocation(program,'uXOffset');
    const speedLocation=gl.getUniformLocation(program,'uSpeed');
    const intensityLocation=gl.getUniformLocation(program,'uIntensity');
    const sizeLocation=gl.getUniformLocation(program,'uSize');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionSpeed=reduced?speed*.55:speed;
    const startedAt=performance.now();
    let frame=0;

    const render=(now:number)=>{
      const dpr=Math.min(window.devicePixelRatio||1,1.5);
      const width=Math.max(1,Math.floor(canvas.clientWidth*dpr));
      const height=Math.max(1,Math.floor(canvas.clientHeight*dpr));
      if(canvas.width!==width||canvas.height!==height){
        canvas.width=width;
        canvas.height=height;
      }
      gl.viewport(0,0,width,height);
      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolution,width,height);
      gl.uniform1f(time,(now-startedAt)/1000);
      gl.uniform1f(hueLocation,hue);
      gl.uniform1f(xOffsetLocation,xOffset);
      gl.uniform1f(speedLocation,motionSpeed);
      gl.uniform1f(intensityLocation,intensity);
      gl.uniform1f(sizeLocation,size);
      gl.drawArrays(gl.TRIANGLES,0,6);
      frame=requestAnimationFrame(render);
    };

    frame=requestAnimationFrame(render);
    return()=>{
      cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  },[hue,xOffset,speed,intensity,size]);

  return <canvas ref={canvasRef} className="lightning-canvas" aria-hidden="true"/>;
}

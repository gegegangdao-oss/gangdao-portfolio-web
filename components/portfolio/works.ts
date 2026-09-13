export type Work = {
  id: string; title: string; english: string; category: string; description: string;
  kind: 'image' | 'video'; src: string; poster?: string; duration?: string;
  width: number; height: number;
};
export const films: Work[] = [
  {id:'project-ember',title:'火种计划',english:'PROJECT EMBER',category:'科幻叙事',description:'从宇宙航行到陌生土地，一段关于探索与生命的影像旅程。',kind:'video',src:'/media/project-ember.mp4',poster:'/media/project-ember-poster.jpg',duration:'02:59',width:960,height:544},
  {id:'the-coronation',title:'皇冠 · 加冕时刻',english:'THE CORONATION',category:'人物剧情',description:'教堂中的授冠仪式，以光束、表情与细节建立戏剧张力。',kind:'video',src:'/media/the-coronation.mp4',poster:'/media/the-coronation-poster.jpg',duration:'00:19',width:1280,height:720},
  {id:'blade-and-beast',title:'古风打斗 · 刃与巨兽',english:'BLADE & BEAST',category:'古风动作',description:'少年与巨兽对峙，在暗色山岩间展开动作叙事。',kind:'video',src:'/media/blade-and-beast.mp4',poster:'/media/blade-and-beast-poster.jpg',duration:'00:15',width:1280,height:720},
  {id:'mecha-awakening',title:'初机号 · 机械觉醒',english:'MECHA AWAKENING',category:'科幻概念',description:'荒芜地表上的机甲，在电光与火花中苏醒。',kind:'video',src:'/media/mecha-awakening.mp4',poster:'/media/mecha-awakening-poster.jpg',duration:'00:04',width:1280,height:720},
  {id:'leviathan-in-the-clouds',title:'巨型飞船 · 云海来客',english:'LEVIATHAN IN THE CLOUDS',category:'科幻概念',description:'巨型飞船掠过云海，以尺度与雾气塑造未知感。',kind:'video',src:'/media/leviathan-in-the-clouds.mp4',poster:'/media/leviathan-in-the-clouds-poster.jpg',duration:'00:04',width:1280,height:720},
];
export const visuals: Work[] = [
  {id:'treasure-pendant-product',title:'财宝天王 · 藏饰静物',english:'TREASURE / STILL LIFE',category:'电商主视觉',description:'木纹、金属与唐卡细节交织，构成温暖而沉静的产品画面。',kind:'image',src:'/media/treasure-pendant-product.webp',width:1340,height:2400},
  {id:'treasure-pendant-editorial',title:'藏饰 · 佩戴叙事',english:'TREASURE / EDITORIAL',category:'电商场景',description:'将饰品放入人物与日光之中，呈现佩戴关系和材质细节。',kind:'image',src:'/media/treasure-pendant-editorial.webp',width:1340,height:2400},
  {id:'banyan-brick-courtyard',title:'榕荫 · 红砖旧院',english:'BENEATH THE BANYAN',category:'空间氛围',description:'榕树、红砖与斑驳日光，留住院落里的日常片刻。',kind:'image',src:'/media/banyan-brick-courtyard.webp',width:1536,height:1024},
];
export const workflow: Work = {id:'pendant-video-workflow',title:'藏饰 · 从静帧到影像',english:'FROM STILL TO MOTION',category:'AI 创作流程',description:'从产品主图延展多机位分镜，连接视频、人物与声音节点。',kind:'image',src:'/media/pendant-video-workflow.webp',width:1920,height:919};

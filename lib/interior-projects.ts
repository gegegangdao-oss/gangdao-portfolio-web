export type InteriorMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  type: '方案效果图' | '平面图' | '功能分析图' | '手绘练习' | '线稿练习';
  source: string;
};

export type InteriorSection = {
  id: string;
  label: string;
  title: string;
  text: string;
  layout: 'feature' | 'pair' | 'grid' | 'plans';
  media: InteriorMedia[];
  details?: {label: string; value: string}[];
  decision?: {question: string; response: string; evidence: string};
};

export type InteriorProject = {
  slug: string;
  number: string;
  title: string;
  english: string;
  category: string;
  featured?: boolean;
  status?: string;
  period: string;
  contribution: string;
  reading: string[];
  summary: string;
  cover: InteriorMedia;
  evidence: string;
  sections: InteriorSection[];
};

const school = '/media/interior/huangtian-school/';
const center = '/media/interior/xinqiao-investment-center/';
const longhua = '/media/interior/longhua-meiguan/';
const confirmedContribution = '方案设计、方案修改、建模、效果图渲染、材料选配';

const projectEntries: InteriorProject[] = [
  {
    slug: 'huangtian-school',
    number: '02',
    title: '黄田社区东片区九年制学校',
    english: 'HUANGTIAN COMMUNITY SCHOOL',
    category: '教育空间 · 室内方案',
    period: '2025 年 8 月 — 2026 年 2 月',
    contribution: confirmedContribution,
    reading: [
      '图书馆以阶梯座席、连续书架和分散座位呈现不同的阅读与停留方式。',
      '餐厅的条形吊顶与木质隔断组织座席区域，局部平面可与两个室内视角对照。',
      '卧室／休息空间、独立办公室与共享办公室分别呈现不同的功能尺度。',
    ],
    summary: '从图书馆、学生餐厅到办公与休息空间，按使用场景梳理校园室内方案。',
    evidence: '图书馆、餐厅、办公与休息空间的方案效果图及局部平面图',
    cover: {src: school+'library.webp', width:1193,height:691,alt:'黄田学校图书馆方案效果图，书架、阶梯阅读区和开放座席围绕中央空间布置',caption:'图书馆 · 阅读与交流空间',type:'方案效果图',source:'01.pptx · 第 1 页'},
    sections: [
      {
        id:'library',label:'01 / READING',title:'图书馆：开放的阅读场景',
        text:'阶梯座席、连续书架和分散的阅读位置围绕开放空间展开。首图完整呈现了阅读、交流与短暂停留之间的空间关系。',
        layout:'feature',media:[],
      },
      {
        id:'cafeteria',label:'02 / DINING & PLAN',title:'学生餐厅：效果与平面对照',
        text:'绿色条形吊顶强化长向空间节奏，木质隔断划分不同座席区域。两个方案视角与原始平面图并置，展示座席和服务空间的对应关系。',
        layout:'pair',media:[
          {src:school+'cafeteria-main.webp',width:1189,height:689,alt:'黄田学校学生餐厅主视角，绿色条形吊顶下排列桌椅',caption:'学生餐厅 · 主视角',type:'方案效果图',source:'01.pptx · 第 2 页'},
          {src:school+'cafeteria-secondary.webp',width:832,height:485,alt:'黄田学校学生餐厅另一视角，可见木质隔断与卡座',caption:'学生餐厅 · 次视角',type:'方案效果图',source:'01.pptx · 第 2 页'},
          {src:school+'cafeteria-plan.webp',width:662,height:468,alt:'黄田学校学生餐厅原始平面图，显示餐厅座席及服务空间布局',caption:'学生餐厅 · 原始平面图',type:'平面图',source:'01.pptx · 第 2 页'},
        ],
      },
      {
        id:'work-rest',label:'03 / WORK & REST',title:'办公与休息：多种日常尺度',
        text:'卧室／休息空间、独立办公室与共享办公室分别展示不同的家具布置与使用尺度。各空间的具体使用人群尚无资料说明。',
        layout:'grid',media:[
          {src:school+'rest-room.webp',width:808,height:467,alt:'黄田学校卧室或休息空间方案效果图，床、储物柜与卫生间相邻',caption:'卧室／休息空间',type:'方案效果图',source:'01.pptx · 第 3 页'},
          {src:school+'private-office.webp',width:806,height:454,alt:'黄田学校独立办公室方案效果图，书桌、储物柜与接待沙发组合',caption:'独立办公室',type:'方案效果图',source:'01.pptx · 第 3 页'},
          {src:school+'shared-office.webp',width:806,height:454,alt:'黄田学校共享办公空间方案效果图，成排办公桌与绿色展示墙',caption:'共享办公空间',type:'方案效果图',source:'01.pptx · 第 3 页'},
        ],
      },
      {
        id:'drawings',label:'04 / DRAWINGS',title:'局部平面：对应空间的组织依据',
        text:'三张局部平面对应休息和办公空间，可与前述视角对照。图纸分辨率较低，点击可查看原始尺寸。',
        layout:'plans',media:[
          {src:school+'rest-plan.webp',width:425,height:300,alt:'黄田学校卧室或休息空间局部平面图',caption:'休息空间 · 局部平面',type:'平面图',source:'01.pptx · 第 3 页'},
          {src:school+'office-plan-a.webp',width:425,height:300,alt:'黄田学校办公室局部平面图一',caption:'办公空间 · 局部平面 01',type:'平面图',source:'01.pptx · 第 3 页'},
          {src:school+'office-plan-b.webp',width:425,height:300,alt:'黄田学校办公室局部平面图二',caption:'办公空间 · 局部平面 02',type:'平面图',source:'01.pptx · 第 3 页'},
        ],
      },
    ],
  },
  {
    slug:'longhua-meiguan',number:'01',title:'深圳龙华梅关 01 地块',english:'LONGHUA MEIGUAN 01',category:'住区与商业 · 公共空间方案',featured:true,status:'方案阶段 · 尚未建成',
    period:'2023 年 — 2025 年 10 月',contribution:confirmedContribution,
    reading:[
      '住宅部分将 B1 车马厅、首层大堂与电梯厅作为连续的到达空间展示。',
      '效果图中的石纹饰面、金属线条和线性照明，与原稿列出的材料和高度信息共同说明空间气质。',
      '商业与办公部分使用长向墙面、吊顶节奏和导向标识呈现入口及垂直交通空间。',
    ],
    summary:'覆盖住宅、商业与办公公共空间的室内方案。以到达体验为主线，呈现模型与效果表现、材料选配及可核对的方案深化信息。',
    evidence:'10 张方案效果图、2 张局部平面、材料信息与空间尺度',
    cover:{src:longhua+'residential-lobby.webp',width:1176,height:669,alt:'深圳龙华梅关 01 地块住宅公共大堂方案效果图，浅色墙面和石纹主景墙形成入口空间',caption:'住宅公共大堂 · 方案效果图',type:'方案效果图',source:'03.pdf · 第 1 页'},
    sections:[
      {
        id:'residential',label:'01 / RESIDENTIAL',title:'住宅公共空间：到达与等候',
        decision:{question:'不同尺度下，如何延续到达空间的秩序？',response:'车马厅与首层大堂以浅色饰面、金属线条及照明建立视觉联系。将效果图与 2.8m、3.9m 的吊顶高度信息对照，可阅读不同空间中的顶面与竖向比例处理。',evidence:'依据 03.pdf 第 1–2 页方案图及原稿尺度信息整理。'},
        text:'从 B1 车马厅到首层大堂与电梯厅，方案以不同尺度的入口空间呈现到达过程。下方高度与材料信息分别对应原文件中的两个空间。',
        layout:'pair',media:[
          {src:longhua+'b1-arrival.webp',width:932,height:437,alt:'B1 车马厅方案效果图，车行空间与通往室内的入口',caption:'B1 车马厅',type:'方案效果图',source:'03.pdf · 第 2 页'},
          {src:longhua+'residential-entrance.webp',width:531,height:674,alt:'住宅公共入口方案效果图，高挑空门厅与纵向格栅',caption:'住宅公共入口',type:'方案效果图',source:'03.pdf · 第 1 页'},
          {src:longhua+'ground-floor-lift.webp',width:958,height:895,alt:'首层电梯厅方案效果图，浅色石材与金属竖向线条',caption:'首层电梯厅',type:'方案效果图',source:'03.pdf · 第 2 页'},
        ],
        details:[
          {label:'B1 车马厅',value:'使用面积 25㎡；吊顶净高 2.8m；A 档、现代简约风格。原页列出地坪漆、米色无机防水涂料、玫瑰金不锈钢与木纹铝方通。'},
          {label:'首层大堂及电梯厅',value:'面积 52.2㎡；吊顶高度 3.9m，灯槽 4.1m。原页列出仿石材地砖、米色墙砖、玫瑰金不锈钢与岩板。'},
        ],
      },
      {
        id:'commercial',label:'02 / COMMERCIAL',title:'商业空间：入口与垂直交通',
        decision:{question:'如何将平面的入口关系转化为可读的空间方向？',response:'局部平面的箭头标示入口方向；对应视角中的条形吊顶、导向标识与连续界面进一步强调路径。平面说明位置，效果图补充到达时的空间感受。',evidence:'依据 03.pdf 第 3 页的两张局部平面与商业效果图整理。'},
        text:'B2 到达区和电梯厅以条形吊顶、导向标识及连续饰面形成方向感。两张局部平面分别标示入口附近的空间关系，与方案视角对照阅读。',
        layout:'pair',media:[
          {src:longhua+'commercial-b2.webp',width:1100,height:840,alt:'商业空间 B2 到达区方案效果图，条形吊顶与导向标识指向室内入口',caption:'商业空间 · B2 到达区',type:'方案效果图',source:'03.pdf · 第 3 页'},
          {src:longhua+'commercial-lift.webp',width:1120,height:840,alt:'商业空间 L1 电梯厅方案效果图，浅色墙面与连续电梯门',caption:'商业空间 · 电梯厅',type:'方案效果图',source:'03.pdf · 第 3 页'},
          {src:longhua+'commercial-plan.webp',width:731,height:645,alt:'商业空间入口附近的第一张局部平面图，红色箭头指向入口',caption:'入口附近 · 局部平面 01',type:'平面图',source:'03.pdf · 第 3 页局部裁图'},
          {src:longhua+'commercial-plan-secondary.webp',width:561,height:605,alt:'商业空间入口附近的第二张局部平面图，红色箭头标示方向',caption:'入口附近 · 局部平面 02',type:'平面图',source:'03.pdf · 第 3 页局部裁图'},
        ],
      },
      {
        id:'office',label:'03 / OFFICE & BASEMENT',title:'办公大堂与地下到达空间',
        decision:{question:'长向公共空间如何建立视觉节奏？',response:'办公大堂以接待台和连续墙面组织视线，地下到达区借助顶面照明与标识建立方向。不同空间的表达在界面、光线和节点之间形成联系。',evidence:'依据 03.pdf 第 4 页方案视角整理，为设计解读。'},
        text:'办公大堂以连续墙面与接待区组织长向视线；地下车马厅和电梯厅通过顶面灯光与导向标识呈现不同的到达氛围。',
        layout:'grid',media:[
          {src:longhua+'office-lobby-wide.webp',width:1066,height:624,alt:'办公大堂方案效果图，长向空间中布置接待台与连续墙面',caption:'办公大堂 · 长向视角',type:'方案效果图',source:'03.pdf · 第 4 页'},
          {src:longhua+'office-lobby-hall.webp',width:1066,height:603,alt:'办公大堂另一视角，连续竖向墙面引导视线',caption:'办公大堂 · 入口视角',type:'方案效果图',source:'03.pdf · 第 4 页'},
          {src:longhua+'basement-arrival.webp',width:1094,height:624,alt:'地下车马厅方案效果图，带点状灯光的顶面与车行入口',caption:'地下车马厅',type:'方案效果图',source:'03.pdf · 第 4 页'},
          {src:longhua+'basement-lift.webp',width:1094,height:594,alt:'地下电梯厅方案效果图，狭长走廊与连续线性照明',caption:'地下电梯厅',type:'方案效果图',source:'03.pdf · 第 4 页'},
        ],
      },
    ],
  },
  {
    slug:'xinqiao-investment-center',number:'03',title:'新桥东片区重点城市更新项目产业招商中心',english:'XINQIAO INVESTMENT CENTER',category:'城市更新 · 展示空间方案',
    period:'2024 年 2 月 — 2026 年 1 月',contribution:confirmedContribution,
    reading:[
      '中央沙盘与上方环形吊顶建立空间视觉中心。',
      '透明屏幕、水吧台、小展台与休闲座席分布在沙盘周边，支持展示与交流两类活动。',
      '功能分析图与四个方案视角相互对照，说明中心装置和周边区域的关系。',
    ],
    summary:'围绕中央沙盘、展示屏与会客功能组织展示空间；以原稿的方案视角和功能图呈现。',
    evidence:'室内方案效果图与空间功能分析图',
    cover:{src:center+'lobby-view-a.webp',width:1458,height:804,alt:'新桥东片区产业招商中心室内方案效果图，圆形吊顶下设置中央沙盘，周边为展示与会客区域',caption:'招商中心 · 中央展示空间',type:'方案效果图',source:'02.pptx · 第 1 页'},
    sections:[
      {
        id:'planning',label:'01 / FUNCTION',title:'功能分析：展示、会客与停留',
        text:'中央沙盘、宣传透明屏幕、水吧台、休闲区、小展台与沙生植物都在原始功能图中标注。图纸展示了中心装置与周边活动区的布置关系。',
        layout:'plans',media:[
          {src:center+'function-diagram.webp',width:1920,height:1080,alt:'新桥东片区产业招商中心空间功能分析图，中央沙盘周边标注展示屏、水吧台、休闲区和小展台',caption:'空间功能分析图 · 原稿合成图',type:'功能分析图',source:'02.pptx · 第 2 页'},
        ],
      },
      {
        id:'views',label:'02 / PERSPECTIVES',title:'方案视角：中央装置与周边活动',
        text:'四个方案视角从不同位置观察中央沙盘、展示设施与周边座席；首图作为项目主视觉，其余三个视角在此展开。',
        layout:'pair',media:[
          {src:center+'lobby-view-d.webp',width:1462,height:804,alt:'招商中心方案视角，中央沙盘前方可见会客座席，右侧为水吧台',caption:'中央沙盘与会客座席',type:'方案效果图',source:'02.pptx · 第 1 页裁图'},
          {src:center+'lobby-view-b.webp',width:1462,height:803,alt:'招商中心另一方案视角，圆形顶面与中央沙盘形成空间中心',caption:'中央沙盘 · 正面视角',type:'方案效果图',source:'02.pptx · 第 1 页裁图'},
          {src:center+'lobby-view-c.webp',width:1458,height:803,alt:'招商中心方案视角，可见中央沙盘、吧台及周边休闲座席',caption:'中央沙盘与周边功能',type:'方案效果图',source:'02.pptx · 第 1 页裁图'},
        ],
      },
    ],
  },
];

export const interiorProjects: InteriorProject[] = projectEntries.sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured)));

export const drawingStudies: InteriorMedia[] = [
  {src:'/media/interior/drawing-studies/landscape-painting.webp',width:1067,height:800,alt:'PPT 标注为泰国某图书馆的建筑与景观彩色手绘练习',caption:'泰国某图书馆 · 手绘练习',type:'手绘练习',source:'00.pptx · 第 1 页'},
  {src:'/media/interior/drawing-studies/interior-painting.webp',width:1067,height:800,alt:'书架与座席构成的室内空间彩色手绘练习',caption:'室内透视 · 手绘练习',type:'手绘练习',source:'00.pptx · 第 1 页'},
  {src:'/media/interior/drawing-studies/house-painting.webp',width:1067,height:800,alt:'流水别墅的彩色手绘练习',caption:'流水别墅 · 手绘练习',type:'手绘练习',source:'00.pptx · 第 1 页'},
  {src:'/media/interior/drawing-studies/urban-linework.webp',width:757,height:1009,alt:'建筑外部广场与树木的黑白透视线稿',caption:'建筑外部 · 线稿练习',type:'线稿练习',source:'00.pptx · 第 2 页'},
  {src:'/media/interior/drawing-studies/interior-linework.webp',width:750,height:999,alt:'室内空间的透视线稿和局部平面',caption:'室内透视 · 线稿练习',type:'线稿练习',source:'00.pptx · 第 2 页'},
];

export const getInteriorProject = (slug:string) => interiorProjects.find(project=>project.slug===slug);

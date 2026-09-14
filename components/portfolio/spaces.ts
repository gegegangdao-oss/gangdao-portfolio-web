import type {Work} from './works';
export type SpaceWork = Work & {phase:'Before'|'Now'};
export type SpaceProject = {id:string;title:string;english:string;category:string;description:string;cover:string;works:SpaceWork[]};
export const spaceProjects: SpaceProject[] = [
  {
    "id": "kindergarten",
    "title": "深圳 · 深职大幼儿园",
    "english": "A LITTLE WORLD",
    "category": "教育空间 / 幼儿园",
    "description": "以浅木、柔光与圆弧，承接童年的阅读、律动与探索。",
    "cover": "/media/space/kindergarten/Now/reading-corridor.webp",
    "works": [
      {
        "id": "kindergarten-now-dance-studio",
        "title": "光里起舞 · 舞蹈室",
        "english": "DANCE STUDIO",
        "category": "Now / AI 修改",
        "description": "深圳 · 深职大幼儿园 · 光里起舞 · 舞蹈室。AI 版本。",
        "kind": "image",
        "src": "/media/space/kindergarten/Now/dance-studio.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "kindergarten-now-storage-wall",
        "title": "小小秩序 · 收纳区",
        "english": "STORAGE WALL",
        "category": "Now / AI 修改",
        "description": "深圳 · 深职大幼儿园 · 小小秩序 · 收纳区。AI 版本。",
        "kind": "image",
        "src": "/media/space/kindergarten/Now/storage-wall.webp",
        "width": 2103,
        "height": 748,
        "phase": "Now"
      },
      {
        "id": "kindergarten-now-activity-room",
        "title": "自在探索 · 活动室",
        "english": "ACTIVITY ROOM",
        "category": "Now / AI 延展",
        "description": "深圳 · 深职大幼儿园 · 自在探索 · 活动室。AI 延展方案，未提供直接对应原图。",
        "kind": "image",
        "src": "/media/space/kindergarten/Now/activity-room.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "kindergarten-now-reading-corridor",
        "title": "童趣书廊 · 阅读区",
        "english": "READING CORRIDOR",
        "category": "Now / AI 修改",
        "description": "深圳 · 深职大幼儿园 · 童趣书廊 · 阅读区。AI 版本。",
        "kind": "image",
        "src": "/media/space/kindergarten/Now/reading-corridor.webp",
        "width": 1672,
        "height": 941,
        "phase": "Now"
      },
      {
        "id": "kindergarten-before-reading-corridor",
        "title": "童趣书廊 · 阅读区",
        "english": "READING CORRIDOR",
        "category": "Before / 原始方案",
        "description": "深圳 · 深职大幼儿园 · 童趣书廊 · 阅读区。原始设计图。",
        "kind": "image",
        "src": "/media/space/kindergarten/Before/reading-corridor.webp",
        "width": 960,
        "height": 540,
        "phase": "Before"
      },
      {
        "id": "kindergarten-before-dance-studio",
        "title": "光里起舞 · 舞蹈室",
        "english": "DANCE STUDIO",
        "category": "Before / 原始方案",
        "description": "深圳 · 深职大幼儿园 · 光里起舞 · 舞蹈室。原始设计图。",
        "kind": "image",
        "src": "/media/space/kindergarten/Before/dance-studio.webp",
        "width": 960,
        "height": 540,
        "phase": "Before"
      },
      {
        "id": "kindergarten-before-storage-wall",
        "title": "小小秩序 · 收纳区",
        "english": "STORAGE WALL",
        "category": "Before / 原始方案",
        "description": "深圳 · 深职大幼儿园 · 小小秩序 · 收纳区。原始设计图。",
        "kind": "image",
        "src": "/media/space/kindergarten/Before/storage-wall.webp",
        "width": 1280,
        "height": 486,
        "phase": "Before"
      }
    ]
  },
  {
    "id": "sky-art-park",
    "title": "深圳 · 天空艺术公园",
    "english": "AFTER THE BLUE HOUR",
    "category": "商业空间 / 屋顶休闲",
    "description": "金属与玻璃映照青色灯光，让吧台与露台在蓝调时刻相连。",
    "cover": "/media/space/sky-art-park/Now/park-entrance.webp",
    "works": [
      {
        "id": "sky-art-park-now-illuminated-bar",
        "title": "流光吧台",
        "english": "ILLUMINATED BAR",
        "category": "Now / AI 修改",
        "description": "深圳 · 天空艺术公园 · 流光吧台。AI 版本。",
        "kind": "image",
        "src": "/media/space/sky-art-park/Now/illuminated-bar.webp",
        "width": 1672,
        "height": 941,
        "phase": "Now"
      },
      {
        "id": "sky-art-park-now-roof-terrace",
        "title": "蓝调露台",
        "english": "ROOF TERRACE",
        "category": "Now / AI 修改",
        "description": "深圳 · 天空艺术公园 · 蓝调露台。AI 版本。",
        "kind": "image",
        "src": "/media/space/sky-art-park/Now/roof-terrace.webp",
        "width": 1672,
        "height": 941,
        "phase": "Now"
      },
      {
        "id": "sky-art-park-now-floor-plan",
        "title": "空间秩序 · 平面研究",
        "english": "FLOOR PLAN",
        "category": "Now / AI 延展",
        "description": "深圳 · 天空艺术公园 · 空间秩序 · 平面研究。AI 延展方案，未提供直接对应原图。",
        "kind": "image",
        "src": "/media/space/sky-art-park/Now/floor-plan.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "sky-art-park-now-park-entrance",
        "title": "夜色入口",
        "english": "PARK ENTRANCE",
        "category": "Now / AI 修改",
        "description": "深圳 · 天空艺术公园 · 夜色入口。AI 版本。",
        "kind": "image",
        "src": "/media/space/sky-art-park/Now/park-entrance.webp",
        "width": 1672,
        "height": 941,
        "phase": "Now"
      },
      {
        "id": "sky-art-park-before-illuminated-bar",
        "title": "流光吧台",
        "english": "ILLUMINATED BAR",
        "category": "Before / 原始方案",
        "description": "深圳 · 天空艺术公园 · 流光吧台。原始设计图。",
        "kind": "image",
        "src": "/media/space/sky-art-park/Before/illuminated-bar.webp",
        "width": 1280,
        "height": 721,
        "phase": "Before"
      },
      {
        "id": "sky-art-park-before-roof-terrace",
        "title": "蓝调露台",
        "english": "ROOF TERRACE",
        "category": "Before / 原始方案",
        "description": "深圳 · 天空艺术公园 · 蓝调露台。原始设计图。",
        "kind": "image",
        "src": "/media/space/sky-art-park/Before/roof-terrace.webp",
        "width": 1280,
        "height": 721,
        "phase": "Before"
      },
      {
        "id": "sky-art-park-before-park-entrance",
        "title": "夜色入口",
        "english": "PARK ENTRANCE",
        "category": "Before / 原始方案",
        "description": "深圳 · 天空艺术公园 · 夜色入口。原始设计图。",
        "kind": "image",
        "src": "/media/space/sky-art-park/Before/park-entrance.webp",
        "width": 1280,
        "height": 720,
        "phase": "Before"
      }
    ]
  },
  {
    "id": "huangtian-school",
    "title": "黄田社区东片区九年制学校",
    "english": "ROOM TO GROW",
    "category": "教育空间 / 校园生活",
    "description": "从阅读到运动，从创作到休憩，让校园空间回到鲜活的日常。",
    "cover": "/media/space/huangtian-school/Now/library.webp",
    "works": [
      {
        "id": "huangtian-school-now-dining-hall",
        "title": "绿荫餐厅",
        "english": "DINING HALL",
        "category": "Now / AI 修改",
        "description": "黄田社区东片区九年制学校 · 绿荫餐厅。AI 版本。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Now/dining-hall.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "huangtian-school-now-library",
        "title": "书间漫游 · 图书馆",
        "english": "LIBRARY",
        "category": "Now / AI 修改",
        "description": "黄田社区东片区九年制学校 · 书间漫游 · 图书馆。AI 版本。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Now/library.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "huangtian-school-now-sports-hall",
        "title": "跃动球场 · 体育馆",
        "english": "SPORTS HALL",
        "category": "Now / AI 修改",
        "description": "黄田社区东片区九年制学校 · 跃动球场 · 体育馆。AI 版本。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Now/sports-hall.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "huangtian-school-now-art-studio",
        "title": "日光画室",
        "english": "ART STUDIO",
        "category": "Now / AI 修改",
        "description": "黄田社区东片区九年制学校 · 日光画室。AI 版本。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Now/art-studio.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "huangtian-school-now-residence",
        "title": "静谧居室",
        "english": "RESIDENCE",
        "category": "Now / AI 修改",
        "description": "黄田社区东片区九年制学校 · 静谧居室。AI 版本。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Now/residence.webp",
        "width": 1448,
        "height": 1086,
        "phase": "Now"
      },
      {
        "id": "huangtian-school-before-library",
        "title": "书间漫游 · 图书馆",
        "english": "LIBRARY",
        "category": "Before / 原始方案",
        "description": "黄田社区东片区九年制学校 · 书间漫游 · 图书馆。原始设计图。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Before/library.webp",
        "width": 1193,
        "height": 691,
        "phase": "Before"
      },
      {
        "id": "huangtian-school-before-sports-hall",
        "title": "跃动球场 · 体育馆",
        "english": "SPORTS HALL",
        "category": "Before / 原始方案",
        "description": "黄田社区东片区九年制学校 · 跃动球场 · 体育馆。原始设计图。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Before/sports-hall.webp",
        "width": 1191,
        "height": 669,
        "phase": "Before"
      },
      {
        "id": "huangtian-school-before-art-studio",
        "title": "日光画室",
        "english": "ART STUDIO",
        "category": "Before / 原始方案",
        "description": "黄田社区东片区九年制学校 · 日光画室。原始设计图。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Before/art-studio.webp",
        "width": 1191,
        "height": 669,
        "phase": "Before"
      },
      {
        "id": "huangtian-school-before-residence",
        "title": "静谧居室",
        "english": "RESIDENCE",
        "category": "Before / 原始方案",
        "description": "黄田社区东片区九年制学校 · 静谧居室。原始设计图。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Before/residence.webp",
        "width": 1587,
        "height": 917,
        "phase": "Before"
      },
      {
        "id": "huangtian-school-before-dining-hall",
        "title": "绿荫餐厅",
        "english": "DINING HALL",
        "category": "Before / 原始方案",
        "description": "黄田社区东片区九年制学校 · 绿荫餐厅。原始设计图。",
        "kind": "image",
        "src": "/media/space/huangtian-school/Before/dining-hall.webp",
        "width": 1189,
        "height": 689,
        "phase": "Before"
      }
    ]
  }
];

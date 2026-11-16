const base = '/projects/windhaven-01';

export type WindhavenImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const windhaven = {
  title: 'WINDHAVEN 01 — 栖风',
  path: '/interior-design/windhaven-01',
  video: `${base}/windhaven-film.mp4`,
  pdf: `${base}/WINDHAVEN-01-Concept-Proposal.pdf`,
  hero: {
    src: `${base}/hero.webp`, width: 1720, height: 1697,
    alt: '栖风休闲椅概念效果图：香槟色曲线框架、米色绳编、柚木扶手与蓝色腰枕',
    caption: 'WINDHAVEN 01 / 产品概念效果图',
  },
  context: {
    src: `${base}/coastal-terrace.webp`, width: 1800, height: 1715,
    alt: '栖风休闲椅置于面向海景的石材露台，树影落在编织靠背与坐垫上',
    caption: '海景露台应用意向 / AI 辅助概念效果图',
  },
  views: [
    {id: 'front', label: 'Front View', chinese: '正面', question: '如何兼顾通透感与环抱感？', text: '弧形绳编靠背围合坐面，以疏密有序的空隙保留通透感；柔软坐垫与腰枕形成更集中的停留区域。', src: `${base}/front.webp`, width: 1000, height: 1201, alt: '栖风休闲椅正面概念效果图，展示坐垫、腰枕和两侧扶手', caption: 'Front View / 正面 · 概念效果图'},
    {id: 'rear', label: 'Rear View', chinese: '背面', question: '如何让背面同样具有完整的造型？', text: '放射状编织延伸至篮状底部，将背面组织为连续的视觉界面。顶部深海蓝收束轮廓，回应正面的腰枕。', src: `${base}/rear.webp`, width: 1000, height: 1201, alt: '栖风休闲椅背面概念效果图，展示放射状绳编与篮状支撑', caption: 'Rear View / 背面 · 概念效果图'},
    {id: 'perspective', label: 'Perspective View', chinese: '45° 透视', question: '如何将不同材料组织成连贯的轮廓？', text: '连续金属曲线连接靠背、扶手与底部，柚木位于手部接触区域，编织与软包填充其间。此处呈现造型与材料意向，结构仍需工程验证。', src: `${base}/perspective.webp`, width: 1000, height: 1201, alt: '栖风休闲椅四十五度透视概念效果图，展示连续曲线框架', caption: 'Perspective View / 45° 透视 · 概念效果图'},
  ],
  details: [
    {src: `${base}/weave.webp`, width: 840, height: 523, alt: '靠背顶部深海蓝装饰与米色绳编的概念细节', caption: '01 / 包覆式靠背绳编'},
    {src: `${base}/teak.webp`, width: 840, height: 523, alt: '柚木扶手与香槟色金属框架的概念细节', caption: '02 / 温润木质扶手'},
    {src: `${base}/structure.webp`, width: 840, height: 523, alt: '座面下方篮状绳编及曲线金属支撑的概念细节', caption: '03 / 轻盈篮状支撑'},
  ],
  materials: [
    {name: '哑光铝合金', english: 'Champagne aluminium', color: '#bca37e', text: '暖香槟色金属骨架，以连续弧线勾勒轻盈轮廓。'},
    {name: '天然柚木', english: 'Natural teak', color: '#a16d43', text: '木质扶手引入温润触感，与金属形成柔和过渡。'},
    {name: '户外绳编', english: 'Sand-toned rope', color: '#cbb795', text: '米色绳编围合靠背，保留光与风穿行的空隙。'},
    {name: '雾白软包', english: 'Mist-white upholstery', color: '#e7dfd0', text: '以耐候织物为选材方向，承接坐垫与靠垫的柔软体量。'},
    {name: '深海蓝点缀', english: 'Deep-ocean blue', color: '#244a60', text: '腰枕与靠背顶部的蓝色编织，呼应海岸色彩。'},
  ],
  proposal: [
    {title: 'Concept / 概念', note: '独立产品概念提案 · 封面与设计主张'},
    {title: 'Research / 设计参考', note: '第三方参考研究图像，版权归原作者所有；本页参考家具不是本人的原创产品。'},
    {title: 'Form / 三视图', note: '原创产品概念效果图 · 概念尺寸尚未经过工程验证'},
    {title: 'CMF / 材质', note: '色彩、材质与工艺意向 · 非实物打样或性能验证'},
    {title: 'Context / 场景', note: 'AI 辅助空间应用意向 · 非真实建成或商业落地照片'},
  ].map((page, index) => ({...page, src: `${base}/proposal/${String(index + 1).padStart(2, '0')}.webp`, width: 2000, height: 1125, alt: `栖风原始设计提案第 ${index + 1} 页：${page.title}`, caption: `提案 ${index + 1} / 5 · ${page.note}`})),
};

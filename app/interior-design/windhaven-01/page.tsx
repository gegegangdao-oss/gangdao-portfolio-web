import type {Metadata} from 'next';
import WindhavenCase from '../../../components/portfolio/WindhavenCase';
import './windhaven.css';

export const metadata: Metadata = {
  title: '栖风 WINDHAVEN 01 · 户外休闲椅概念设计 · 刘博',
  description: '刘博独立构思的户外休闲椅概念项目：从海风与帆面曲线出发，呈现产品造型、CMF 材质意向、空间应用与 Muse AI 影像。非已量产产品。',
  openGraph: {
    title: 'WINDHAVEN 01 — 栖风',
    description: 'Outdoor Lounge Chair / Independent Concept Design by Liu Bo',
    images: [{url: '/projects/windhaven-01/hero.webp', width: 1720, height: 1697, alt: 'WINDHAVEN 01 户外休闲椅概念效果图'}],
  },
};

export default function WindhavenRoute() { return <WindhavenCase/>; }

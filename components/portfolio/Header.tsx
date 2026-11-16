'use client';
import SiteHeader from './SiteHeader';
export default function Header({screen,navigate}:{screen:string;navigate:(path:string)=>void}) {
  return <SiteHeader currentPath={screen} navigate={navigate}/>;
}

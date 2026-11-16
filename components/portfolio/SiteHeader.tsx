'use client';
import {useEffect, useId, useRef, useState, type MouseEvent} from 'react';
import {animatedRoutes, siteNavigation} from '../../lib/site-navigation';

export default function SiteHeader({currentPath, theme = 'immersive', navigate}: {
  currentPath: string; theme?: 'immersive' | 'editorial' | 'resume'; navigate?: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => {if (desktop.matches) setOpen(false);};
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {event.preventDefault(); event.stopPropagation(); setOpen(false); toggle.current?.focus();}
      if (event.key === 'Tab') {
        const items = Array.from(header.current?.querySelectorAll<HTMLElement>('a,button') ?? []).filter(element => element.getClientRects().length > 0);
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last?.focus();}
        if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first?.focus();}
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {document.documentElement.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey, true);};
  }, [open]);
  function follow(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    setOpen(false);
    if (navigate && animatedRoutes.has(href)) {event.preventDefault(); navigate(href);}
  }
  return <header ref={header} className={`site-header site-header--${theme}${open ? ' is-open' : ''}`}>
    <a className="site-brand" href="/" aria-label="刘博 GANGDAO 作品集首页" onClick={event => follow(event, '/')}><strong>GANGDAO</strong><small>LIU BO / SPACE × AI</small></a>
    <button ref={toggle} type="button" className="site-menu-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>{open ? '关闭 CLOSE' : '目录 MENU'}</button>
    <nav id={id} aria-label="主导航">{siteNavigation.map(item => {
      const active = item.href === '/interior-design' ? currentPath.startsWith(item.href) : item.href === '/projects' ? ['/projects', '/visual-space', '/interactive'].includes(currentPath) : currentPath === item.href;
      return <a key={item.href} href={item.href} aria-current={active ? 'page' : undefined} onClick={event => follow(event, item.href)}>{item.label}</a>;
    })}<a className="site-explore-link" href="/cube" aria-current={currentPath === '/cube' ? 'page' : undefined} onClick={event => follow(event, '/cube')}>魔方目录 ↗</a></nav>
  </header>;
}

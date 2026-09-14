'use client';

import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import './ProfileCard.css';

type ProfileCardProps = {
  avatarUrl: string;
  iconUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  className?: string;
  enableTilt?: boolean;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
};

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value: number) => Number(value.toFixed(3));

function ProfileCardComponent({
  avatarUrl,
  iconUrl,
  innerGradient = 'linear-gradient(145deg,#183553 0%,#5e8ec044 100%)',
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(110, 190, 255, 0.72)',
  className = '',
  enableTilt = true,
  name = '港岛哥哥',
  title = 'AIGC 视觉创意设计师',
  handle = 'gegegangdao',
  status = '青海 · 西宁',
  contactText = '联系我',
  showUserInfo = true,
  onContactClick
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const setPointer = useCallback((clientX: number, clientY: number) => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap) return;
    const rect = shell.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const percentX = clamp((100 / (rect.width || 1)) * x);
    const percentY = clamp((100 / (rect.height || 1)) * y);
    const centerX = percentX - 50;
    const centerY = percentY - 50;
    const values: Record<string, string> = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--background-x': `${35 + percentX * 0.3}%`,
      '--background-y': `${35 + percentY * 0.3}%`,
      '--pointer-from-center': `${clamp(Math.hypot(centerX, centerY) / 50, 0, 1)}`,
      '--pointer-from-top': `${percentY / 100}`,
      '--pointer-from-left': `${percentX / 100}`,
      '--rotate-x': `${round(-(centerX / 5))}deg`,
      '--rotate-y': `${round(centerY / 4)}deg`
    };
    Object.entries(values).forEach(([key, value]) => wrap.style.setProperty(key, value));
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !enableTilt) return;
    const onMove = (event: PointerEvent) => setPointer(event.clientX, event.clientY);
    const onEnter = (event: PointerEvent) => {
      shell.classList.add('active');
      setPointer(event.clientX, event.clientY);
    };
    const onLeave = () => {
      shell.classList.remove('active');
      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.setProperty('--pointer-x', '50%');
        wrap.style.setProperty('--pointer-y', '50%');
        wrap.style.setProperty('--pointer-from-top', '0.5');
        wrap.style.setProperty('--pointer-from-left', '0.5');
        wrap.style.setProperty('--rotate-x', '0deg');
        wrap.style.setProperty('--rotate-y', '0deg');
      }
    };
    shell.addEventListener('pointerenter', onEnter);
    shell.addEventListener('pointermove', onMove);
    shell.addEventListener('pointerleave', onLeave);
    return () => {
      shell.removeEventListener('pointerenter', onEnter);
      shell.removeEventListener('pointermove', onMove);
      shell.removeEventListener('pointerleave', onLeave);
    };
  }, [enableTilt, setPointer]);

  const style = useMemo(() => ({
    '--icon': iconUrl ? `url(${iconUrl})` : 'none',
    '--inner-gradient': innerGradient,
    '--behind-glow-color': behindGlowColor
  }) as React.CSSProperties, [behindGlowColor, iconUrl, innerGradient]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={style}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              <img className="avatar" src={avatarUrl} alt={`${name}头像`} loading="lazy" />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar"><img src={avatarUrl} alt="" /></div>
                    <div className="pc-user-text"><div className="pc-handle">@{handle}</div><div className="pc-status">{status}</div></div>
                  </div>
                  <button className="pc-contact-btn" type="button" onClick={onContactClick}>{contactText}</button>
                </div>
              )}
            </div>
            <div className="pc-content pc-details-content">
              <div className="pc-details"><h3>{name}</h3><p>{title}</p></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(ProfileCardComponent);

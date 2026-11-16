'use client';
import {Download} from 'lucide-react';
import ProfileCard from './ProfileCard';
import profile from '../../lib/resume-profile.json';

export default function ContactPanel() {
  const contact = profile.contacts;
  return <div className="contact-layout">
    <div className="contact-details"><h3 className="contact-identity">{profile.name} / {profile.brand}</h3><p className="contact-intro">室内与产品设计、AI 视觉及项目合作，欢迎联系。</p><a className="contact-download" href={profile.pdf} download="LIU-BO-Resume.pdf"><Download size={15}/>下载简历 PDF</a>
      <div className="contact-lines"><a href={contact.phoneHref}><span>大陆手机</span><strong>{contact.phone}</strong></a><a href={contact.hkPhoneHref}><span>香港手机</span><strong>{contact.hkPhone}</strong></a><a href={`mailto:${contact.email}`}><span>EMAIL / 邮箱</span><strong>{contact.email}</strong></a><a href={`mailto:${contact.qqEmail}`}><span>QQ 邮箱</span><strong>{contact.qqEmail}</strong></a><a href={`https://www.instagram.com/${contact.instagram}`} target="_blank" rel="noreferrer"><span>Instagram</span><strong>@{contact.instagram} ↗</strong></a></div>
      <div className="contact-qr"><img src="/wechat-qr-source.png" width="120" height="120" alt="刘博的微信联系二维码" loading="lazy"/><div><span>微信</span><strong>扫描二维码添加我</strong></div></div>
    </div>
    <div className="contact-card-wrap"><ProfileCard avatarUrl="/profile-portrait.png" name={profile.name} title={profile.title} handle={profile.brand} status="LIU BO / GANGDAO" contactText="发邮件" onContactClick={() => {window.location.href = `mailto:${contact.email}`;}}/></div>
  </div>;
}

"""Regenerate the downloadable resume from the same data as the website.
Requires Python Playwright and Chromium in the authoring environment.
"""
from pathlib import Path
from html import escape
import json
import shutil
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'lib/resume-profile.json').read_text())
origin = 'https://liubo.eu.cc'
e = lambda value: escape(str(value), quote=True)
contact = data['contacts']

def heading(label, title):
    return f'<h2><small>{e(label)}</small>{e(title)}</h2>'

def footer(page):
    return f'<footer><span>GANGDAO / LIU BO · 空间设计 × AIGC 视觉创作</span><span>{page} / 02</span></footer>'

work = ''.join(f'<article class="work"><div class="period">{e(w[0])}</div><div><h3>{e(w[1])}<span>{e(w[2])}</span></h3><p>{e(w[3])}</p></div></article>' for w in data['workExperience'])
skills = ''.join(f'<article><h3>{e(s["name"])}</h3><p>{e(s["text"])}</p><small>{e(s["tools"])}</small></article>' for s in data['skills'])
projects = ''.join(f'<article class="project"><span class="no">0{i+1}</span><div><div class="project-top"><h3><a href="{origin}{e(p["href"])}">{e(p["name"])}</a></h3><small>{e(p["date"])}</small></div><div class="type">{e(p["type"])}</div><p>{e(p["text"])}</p><div class="tags">' + ' · '.join(e(t) for t in p['tags']) + '</div></div></article>' for i,p in enumerate(data['selectedProjects']))
html = f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>刘博 / GANGDAO · 个人简历</title><style>
@page{{size:A4;margin:0}}*{{box-sizing:border-box}}body{{margin:0;color:#263d4b;background:#fff;font-family:'Noto Sans CJK SC','Microsoft YaHei',Arial,sans-serif;font-size:10px;line-height:1.9}}.page{{width:210mm;height:297mm;position:relative;padding:17mm 17mm 19mm;break-after:page}}.page:last-child{{break-after:auto}}a{{color:inherit;text-decoration:none}}h1,h2,h3,p{{margin:0}}header{{border-bottom:1.5px solid #263d4b;padding-bottom:20px;display:flex;justify-content:space-between;gap:30px}}h1{{font-size:35px;line-height:1.2;font-weight:500;letter-spacing:3px}}.brand{{font-size:9px;letter-spacing:3px;margin:8px 0 10px}}.role{{font-size:12px}}.contact{{text-align:right;line-height:2.1;font-size:9px;padding-top:5px}}.intro{{margin:22px 0 25px;font-size:11px;line-height:2;color:#4d626f;max-width:615px}}h2{{font-size:16px;font-weight:500;border-bottom:1px solid #ccd3d4;padding-bottom:9px;margin:24px 0 12px}}h2 small{{font:8px Arial;letter-spacing:1.3px;display:block;color:#768b95;margin-bottom:4px}}h3{{font-size:12px;font-weight:500;line-height:1.9}}h3 span{{font-size:9px;display:block;color:#687d89}}.work{{display:grid;grid-template-columns:130px 1fr;gap:18px;padding:13px 0;border-bottom:1px solid #e4e7e6}}.period{{font:9px/2 Arial;color:#67808f;padding-top:5px}}.work p{{margin-top:4px;color:#5b6d77;font-size:9px}}.skills{{display:grid;grid-template-columns:1fr 1fr;gap:22px 28px;padding-top:10px}}.skills p{{font-size:9px;color:#5b6d77;margin:4px 0}}.skills small{{font-size:8px;color:#738a96;line-height:1.9}}.education{{display:flex;justify-content:space-between;gap:25px;align-items:center}}.education small{{font-size:9px;color:#738a96}}footer{{position:absolute;bottom:13mm;left:17mm;right:17mm;border-top:1px solid #ccd3d4;padding-top:10px;display:flex;justify-content:space-between;gap:20px;font-size:8px;color:#7b8b90}}.project{{display:grid;grid-template-columns:30px 1fr;gap:16px;padding:19px 0;border-bottom:1px solid #d7dddc}}.project-top{{display:flex;justify-content:space-between;align-items:baseline;gap:15px}}.project-top small{{font-size:8px;color:#758a94;text-align:right}}.no{{font:22px Georgia;color:#a3a190}}.type{{font-size:9px;color:#6d8290;margin:4px 0 9px}}.project p{{font-size:10px;color:#4e6572;line-height:2}}.tags{{font-size:8px;color:#8a8067;margin-top:10px}}.note{{font-size:10px;line-height:2;color:#637a86;margin-top:22px}}.portfolio-link{{margin-top:25px;background:#f0f3f2;padding:16px 18px;font-size:10px;overflow-wrap:anywhere}}.portfolio-link small{{font-size:8px;color:#718993;display:block;margin-bottom:5px}}.title-row{{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1.5px solid #263d4b;padding-bottom:20px}}.title-row h1{{font-size:27px;letter-spacing:0}}.title-row span{{font:9px Arial;letter-spacing:2px;color:#708591}}
</style></head><body><section class="page"><header><div><h1>{e(data['name'])}</h1><div class="brand">GANGDAO / LIU BO</div><div class="role">{e(data['title'])}</div></div><div class="contact"><a href="{e(contact['phoneHref'])}">{e(contact['phone'])}</a> · <a href="{e(contact['hkPhoneHref'])}">{e(contact['hkPhone'])}</a><br><a href="mailto:{e(contact['email'])}">{e(contact['email'])}</a><br><a href="mailto:{e(contact['qqEmail'])}">{e(contact['qqEmail'])}</a></div></header><p class="intro">{e(data['intro'])}</p>{heading('WORK EXPERIENCE','工作经历')}{work}{heading('SKILLS & TOOLS','技能与工具')}<div class="skills">{skills}</div>{heading('EDUCATION','教育经历')}<div class="education"><h3>{e(data['education']['school'])} · {e(data['education']['major'])}</h3><small>{e(data['education']['period'])}</small></div>{footer('01')}</section><section class="page"><div class="title-row"><h1>项目精选</h1><span>SELECTED SPACE & OBJECT</span></div>{projects}<p class="note">室内项目展示方案图与图纸资料。龙华梅关项目尚未建成；栖风为独立原创概念提案，AI 辅助视觉呈现，非品牌合作或量产产品。</p><div class="portfolio-link"><small>FULL PORTFOLIO / 在线案例</small><a href="{origin}/interior-design">{origin}/interior-design</a></div>{footer('02')}</section></body></html>'''
output = ROOT / 'public/documents/LIU-BO-Resume.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    executable = shutil.which('chromium')
    browser = p.chromium.launch(headless=True, **({'executable_path':executable} if executable else {}))
    page = browser.new_page()
    page.set_content(html, wait_until='networkidle')
    page.pdf(path=str(output), print_background=True, prefer_css_page_size=True)
    browser.close()
print(output)

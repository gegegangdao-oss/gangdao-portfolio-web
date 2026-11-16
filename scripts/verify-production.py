"""Check production HTTPS, release freshness, routes and local page assets."""
import json,time,urllib.request,urllib.error
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlparse
ROOT='https://liubo.eu.cc'
EXPECTED=json.loads((Path(__file__).resolve().parents[1]/'public/deployment.json').read_text())['release']
def get(path,partial=False):
 req=urllib.request.Request(urljoin(ROOT,path),headers={'User-Agent':'LiuBo-Production-Check/1.0',**({'Range':'bytes=0-1023'} if partial else {})})
 with urllib.request.urlopen(req,timeout=25) as r:
  assert r.status in (200,206),(path,r.status)
  assert urlparse(r.url).hostname in ('liubo.eu.cc','www.liubo.eu.cc'),(path,r.url)
  return r.read(1024 if partial else -1),r.headers.get_content_type()
for attempt in range(40):
 try:
  raw,mime=get('/deployment.json?verify='+str(time.time_ns()))
  if json.loads(raw).get('release')==EXPECTED:break
 except Exception as e:print('Waiting for Cloudflare:',str(e),flush=True)
 time.sleep(15)
else:raise SystemExit('Production release not visible after 10 minutes')
class Assets(HTMLParser):
 def __init__(self):super().__init__();self.paths=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for k in ('src','poster'):
   if a.get(k,'').startswith('/') and not a[k].startswith('//'):self.paths.add(a[k])
  if tag=='link' and a.get('rel')=='stylesheet' and a.get('href','').startswith('/'):self.paths.add(a['href'])
paths=['/','/cube','/projects','/films','/visual-space','/interactive','/about','/workflow','/contact','/interior-design','/interior-design/longhua-meiguan','/interior-design/huangtian-school','/interior-design/xinqiao-investment-center','/interior-design/windhaven-01']
assets=set(['/documents/LIU-BO-Resume.pdf','/projects/windhaven-01/windhaven-film.mp4','/projects/windhaven-01/WINDHAVEN-01-Concept-Proposal.pdf'])
for path in paths:
 body,mime=get(path);assert mime=='text/html',(path,mime)
 assert b'<html' in body.lower() and b'<title' in body.lower(),path
 parser=Assets();parser.feed(body.decode());assets.update(parser.paths);print('HTTPS page OK',path,flush=True)
for path in sorted(assets):
 raw,mime=get(path,partial=path.endswith('.mp4'))
 assert mime not in ('text/html','application/json'),(path,mime)
 if path.endswith('.pdf'):assert raw.startswith(b'%PDF'),path
 print('Asset OK',path,mime,flush=True)
print('PASS: production release, all routes, HTTPS and',len(assets),'assets verified',flush=True)

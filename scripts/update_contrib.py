import re,json,urllib.request,datetime
h=urllib.request.urlopen(urllib.request.Request('https://github.com/users/riteshsah235/contributions',headers={'User-Agent':'portfolio-updater'})).read().decode()
cells=re.findall(r'data-date="(\d{4}-\d\d-\d\d)" id="(contribution-day-component-\d+-\d+)" data-level="(\d)"',h)
tips=dict(re.findall(r'for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)',h))
days=[]
for d,i,l in cells:
    m=re.match(r'(\d+) contribution',tips.get(i,''))
    days.append({'date':d,'count':int(m.group(1)) if m else 0,'level':int(l)})
days.sort(key=lambda x:x['date'])
assert len(days)>300
json.dump({'source':'github.com/users/riteshsah235/contributions','generated_at':datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),'total':sum(x['count'] for x in days),'contributions':days},open('data/contrib.json','w'),separators=(',',':'))

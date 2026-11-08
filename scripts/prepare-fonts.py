"""Download Google Fonts once; the website itself makes no external font requests."""
from pathlib import Path
import re
import urllib.request

root = Path(__file__).resolve().parent.parent / 'assets' / 'fonts'
root.mkdir(parents=True, exist_ok=True)
url = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap'
request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
css = urllib.request.urlopen(request, timeout=20).read().decode()
for index, asset in enumerate(dict.fromkeys(re.findall(r'https://fonts.gstatic.com/[^)\s]+', css))):
    extension = '.woff2' if '.woff2' in asset else '.ttf'
    filename = f'font-{index}{extension}'
    (root / filename).write_bytes(urllib.request.urlopen(asset, timeout=20).read())
    css = css.replace(asset, './' + filename)
(root / 'fonts.css').write_text(css, encoding='utf-8')
for family in ['barlowcondensed', 'manrope']:
    license_url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt'
    (root / f'{family}-OFL.txt').write_bytes(urllib.request.urlopen(license_url, timeout=20).read())
print('Fonts saved locally.')

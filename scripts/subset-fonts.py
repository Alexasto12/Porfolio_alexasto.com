"""Builds the self-hosted web fonts in assets/fonts/ (run by hand, not at build time).

Downloads the Latin files from Google Fonts, limits the variable axes to the
ranges the site uses and keeps only the characters it needs (Spanish,
Catalan and English, plus a few symbols), so the fonts weigh about half.
Needs Python 3 with fonttools and brotli: pip install fonttools brotli
Usage: python3 scripts/subset-fonts.py
"""
import io
import os
import re
import urllib.request

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "fonts")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36"

# ASCII, the accented letters of Spanish and Catalan (and the Catalan middle
# dot), quotes, dashes, ellipsis, euro, arrows and minus.
UNICODES = (
    "U+0020-007E U+00A0 U+00A1 U+00A9 U+00AA U+00AB U+00B0 U+00B7 U+00BA U+00BB U+00BF "
    "U+00C0 U+00C1 U+00C7-00C9 U+00CD U+00CF U+00D1-00D3 U+00D7 U+00DA U+00DC "
    "U+00E0 U+00E1 U+00E7-00E9 U+00ED U+00EF U+00F1-00F3 U+00FA U+00FC "
    "U+2013 U+2014 U+2018 U+2019 U+201C U+201D U+2026 U+20AC U+2190-2193 U+2197 U+21BB U+2212"
)
FEATURES = ["kern", "liga", "tnum", "ccmp", "locl", "mark", "mkmk"]

FONTS = [
    # (output file, Google Fonts family query, axis limits)
    # Width fixed at 80 % (the narrow cut of the headings): half the size of
    # keeping the width axis, which LCP could not afford.
    ("bricolage-grotesque-subset.woff2", "Bricolage+Grotesque:wdth,wght@75..100,200..800", {"wght": (600, 800), "wdth": 80}),
    ("hanken-grotesk-subset.woff2", "Hanken+Grotesk:wght@400..500", {"wght": (400, 500)}),
    ("space-mono-400-subset.woff2", "Space+Mono:wght@400", None),
]


def latin_url(query):
    req = urllib.request.Request(f"https://fonts.googleapis.com/css2?family={query}&display=swap", headers={"User-Agent": UA})
    css = urllib.request.urlopen(req).read().decode()
    block = css.split("/* latin */")[1]
    return re.search(r"url\((https://[^)]+)\)", block).group(1)


def build(name, query, limits):
    data = urllib.request.urlopen(latin_url(query)).read()
    font = TTFont(io.BytesIO(data))
    if limits:
        font = instancer.instantiateVariableFont(font, limits)
        # Round-trip through bytes: subsetting a freshly instanced font in
        # memory trips over its lazily loaded variation data.
        buf = io.BytesIO()
        font.flavor = None
        font.save(buf)
        font = TTFont(io.BytesIO(buf.getvalue()))
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = FEATURES
    unicodes = subset.parse_unicodes(UNICODES)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    font.flavor = "woff2"
    path = os.path.join(OUT, name)
    font.save(path)
    print(f"{name}: {len(data) // 1024} KB -> {os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    for args in FONTS:
        build(*args)

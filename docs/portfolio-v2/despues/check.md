# npm run check

Generado: 2026-10-14T07:58:26Z en la rama claude/portfolio-v2.

```
> portfolio-alexasto@0.1.0 check
> npm run lint && npm run typecheck && npm run build
> portfolio-alexasto@0.1.0 lint
> eslint .
> portfolio-alexasto@0.1.0 typecheck
> tsc --noEmit
> portfolio-alexasto@0.1.0 build
> next build
   ▲ Next.js 15.5.18
   Creating an optimized production build ...
 ✓ Compiled successfully in 3.2s
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/15) ...
   Generating static pages (3/15) 
   Generating static pages (7/15) 
   Generating static pages (11/15) 
 ✓ Generating static pages (15/15)
   Finalizing page optimization ...
   Collecting build traces ...
Route (app)                                 Size  First Load JS
┌ ○ /                                      123 B         111 kB
├ ○ /_not-found                            994 B         103 kB
├ ○ /apple-icon                            145 B         103 kB
├ ○ /ca                                    123 B         111 kB
├ ○ /ca/opengraph-image-1lxb3u             145 B         103 kB
├ ○ /en                                    123 B         111 kB
├ ○ /en/opengraph-image-1nh35u             145 B         103 kB
├ ○ /icon                                  145 B         103 kB
├ ○ /llms.txt                              145 B         103 kB
├ ○ /manifest.webmanifest                  145 B         103 kB
├ ○ /opengraph-image-35z9gd                145 B         103 kB
├ ○ /robots.txt                            145 B         103 kB
└ ○ /sitemap.xml                           145 B         103 kB
+ First Load JS shared by all             102 kB
  ├ chunks/255-4f84124391a7dac4.js       46.2 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js  54.2 kB
  └ other shared chunks (total)           1.9 kB
○  (Static)  prerendered as static content
```

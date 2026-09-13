NEXT LEVEL SIM GAMING — new and updated site files
==================================================

All files go at the REPO ROOT, alongside index.html.

REPLACES AN EXISTING FILE
  quest-3-vs-pimax-dream-air.html   rebuilt: verdict first, real content,
                                    prefill Pimax links, hero banner

NEW PAGES
  pimax.html        Pimax sponsor page, Back to School offer highlighted
  tobii.html        Tobii ambassador page, 5 videos
  ats-ets2.html     ATS/ETS2 graphics hub, Pizzter 40% + Tobii highlighted
  codes.html        All partner codes, one URL

IMAGE
  porsche-pimax-suzuka.png   hero background for the Quest 3 page.
                             Must sit at the root with this exact name
                             (case-sensitive on GitHub Pages).

BEFORE GOING LIVE
------------------
1. Duplicate pages: ats-ets2.html overlaps ats-reshade-weather-mods-guide.html,
   and pimax.html overlaps offer.html. Redirect the old ones or narrow them,
   or the pairs compete for the same searches.

2. Back to School offer ends 20 September 2026. In pimax.html the block is
   wrapped in HTML comments marking it — delete the whole block after that
   date. Same for the promo lines in codes.html and
   quest-3-vs-pimax-dream-air.html.

3. Untested: the NLSIMGaming12 iRacing prefill link. The pattern
   pimax.com/discount/nlsimgaming?redirect=... is confirmed working for the
   discount; the nlsimgaming12 variant has not been tried.

4. Missing: Dream Air SE product URL (section exists on pimax.html with no
   buy button).

5. Click tracking fires an 'affiliate_click' event into gtag or dataLayer.
   Does nothing if no analytics is installed.

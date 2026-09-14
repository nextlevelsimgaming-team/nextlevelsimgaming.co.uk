/*
 * Cookie consent + Google Analytics (GA4) loader — Next Level Sim Gaming
 *
 * Nothing analytics-related runs until a visitor actively accepts.
 * Google Consent Mode defaults every signal to "denied" on every page
 * load, so no GA cookie is set and no request goes to Google until
 * setConsent('granted') runs. This is the bit UK GDPR/PECR actually
 * requires: consent BEFORE non-essential cookies, not just a notice.
 *
 * The only thing stored before a choice is made is the choice itself,
 * in localStorage — not a cookie, and needed purely to avoid asking
 * again on every page. Decline is exactly as easy to click as Accept.
 */
(function () {
  'use strict';

  var GA_ID = 'G-JGFRXYRX2M';
  var STORAGE_KEY = 'nlsg_cookie_consent'; // 'granted' | 'denied'

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Default: deny everything, on every single page load, before anything else runs.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  var gaScriptInjected = false;
  function loadGA() {
    if (gaScriptInjected) return;
    gaScriptInjected = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function getStoredChoice() {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (e) { return null; }
  }
  function storeChoice(choice) {
    try { localStorage.setItem(STORAGE_KEY, choice); }
    catch (e) { /* private browsing / storage blocked — banner will just reappear next visit */ }
  }

  var banner = null;

  function setConsent(choice) {
    storeChoice(choice);
    if (choice === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      loadGA();
    } else {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    hideBanner();
  }

  function hideBanner() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }

  function injectStyle() {
    if (document.getElementById('cc-style')) return;
    var style = document.createElement('style');
    style.id = 'cc-style';
    style.textContent =
      '#cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:999;' +
        'background:#12151C;border-top:1px solid #2A303D;' +
        'font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#EDEFF3;}' +
      '#cc-banner .cc-wrap{max-width:1180px;margin:0 auto;padding:1rem 1.5rem;' +
        'display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;}' +
      '#cc-banner p{margin:0;font-size:0.88rem;line-height:1.5;color:#C7CCD8;max-width:56ch;flex:1 1 auto;min-width:260px;}' +
      '#cc-banner a{color:#F2A03D;text-decoration:underline;}' +
      '#cc-banner .cc-actions{display:flex;gap:0.7rem;flex:none;}' +
      '#cc-banner button{font-family:inherit;font-size:0.85rem;font-weight:600;padding:0.6em 1.2em;' +
        'border-radius:3px;cursor:pointer;border:1px solid transparent;white-space:nowrap;}' +
      '#cc-banner .cc-decline{background:transparent;border-color:#3A4152;color:#EDEFF3;}' +
      '#cc-banner .cc-decline:hover{border-color:#F2A03D;color:#F2A03D;}' +
      '#cc-banner .cc-accept{background:#F2A03D;color:#1A1204;}' +
      '#cc-banner .cc-accept:hover{background:#FFB25A;}' +
      '@media (max-width:640px){#cc-banner .cc-wrap{flex-direction:column;align-items:stretch;}' +
        '#cc-banner p{min-width:0;max-width:none;}' +
        '#cc-banner .cc-actions{justify-content:flex-end;}}' +
      '.cc-settings-link{cursor:pointer;}';
    document.head.appendChild(style);
  }

  function buildBanner() {
    injectStyle();
    banner = document.createElement('div');
    banner.id = 'cc-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="cc-wrap">' +
        '<p>This site uses analytics cookies to see which guides and gear people actually use — nothing is set unless you accept. ' +
        '<a href="/privacy.html">Privacy &amp; cookies</a></p>' +
        '<div class="cc-actions">' +
          '<button type="button" class="cc-decline">Decline</button>' +
          '<button type="button" class="cc-accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    banner.querySelector('.cc-accept').addEventListener('click', function () { setConsent('granted'); });
    banner.querySelector('.cc-decline').addEventListener('click', function () { setConsent('denied'); });
  }

  function showBanner() {
    if (banner) return;
    buildBanner();
  }

  function injectFooterLink() {
    var container = document.querySelector('.footer-fine') || document.querySelector('footer .wrap');
    if (!container || document.querySelector('.cc-settings-link')) return;
    var sep = document.createTextNode(' · ');
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'cc-settings-link';
    link.textContent = 'Cookie settings';
    link.addEventListener('click', function (e) { e.preventDefault(); showBanner(); });
    if (container.tagName === 'P') {
      container.appendChild(sep);
      container.appendChild(link);
    } else {
      var span = document.createElement('span');
      span.appendChild(sep);
      span.appendChild(link);
      container.appendChild(span);
    }
  }

  function init() {
    var choice = getStoredChoice();
    if (choice === 'granted') {
      loadGA();
    } else if (choice !== 'denied') {
      showBanner();
    }
    injectFooterLink();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

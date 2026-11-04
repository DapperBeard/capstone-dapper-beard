// Dapper Beard Barber Shop. Small enhancements only: the page is complete without this file.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ease = 'cubic-bezier(.2,.7,.2,1)';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Open-today status, in Philippine time whatever the visitor's clock says. Tuesday is the rest day.
  var pill = $('.pill');
  if (pill) {
    var day = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', weekday: 'short' }).format(new Date());
    var closed = day === 'Tue';
    $('.pill-text', pill).textContent = closed ? 'Closed today · Back Wednesday' : 'Open today · Closed Tuesdays';
    pill.classList.add(closed ? 'is-closed' : 'is-open');
  }

  // Smooth scrolling to sections, stopping just under the top bar.
  function goTo(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - 59;
    window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    goTo(id);
  });

  // Count-up on the haircut price.
  function countUp(el, delay) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var to = +el.dataset.count, t0 = performance.now() + delay, dur = 900;
    el.textContent = '0';
    function step(t) {
      var p = Math.min(1, Math.max(0, (t - t0) / dur));
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Reveal-on-scroll. The hidden starting state is set here, never in CSS,
  // so everything stays visible if this script doesn't run.
  var reveals = $$('[data-reveal]');
  function hiddenTransform(kind) {
    if (kind === 'line') return 'translateY(-5px) scaleX(0)';
    if (kind === 'zoom') return 'scale(.94) translateY(24px)';
    if (kind === 'fade') return 'none';
    return 'translateY(28px)';
  }
  function show(el) {
    var d = +(el.dataset.delay || 0);
    el.style.transitionDelay = d + 'ms';
    el.style.opacity = '1';
    el.style.transform = el.dataset.reveal === 'line' ? 'translateY(-5px) scaleX(1)' : 'none';
    var c = el.querySelector('[data-count]');
    if (c) countUp(c, d + 150);
    // Hand the element back to the stylesheet once it has arrived.
    setTimeout(function () {
      el.style.transition = el.style.transitionDelay = el.style.opacity = el.style.transform = '';
    }, d + 1300);
  }
  if (!reduce && 'IntersectionObserver' in window) {
    reveals.forEach(function (el) {
      var k = el.dataset.reveal;
      el.style.transition = 'none';
      el.style.opacity = k === 'line' ? '1' : '0';
      el.style.transform = hiddenTransform(k);
    });
    // Turn the transitions on a frame later, so the hidden state is never animated into.
    requestAnimationFrame(function () {
      reveals.forEach(function (el) {
        el.style.transition = 'opacity .8s ' + ease + ', transform ' + (el.dataset.reveal === 'line' ? 1.1 : .9) + 's ' + ease;
      });
      requestAnimationFrame(function () {
        reveals.filter(function (e) { return e.dataset.reveal === 'hero'; }).forEach(show);
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        reveals.filter(function (e) { return e.dataset.reveal !== 'hero'; }).forEach(function (e) { io.observe(e); });
      });
    });
  }

  // Hero photo: slow zoom-out on load, parallax on scroll.
  var heroMedia = $('.hero-media'), heroImg = $('.hero-media img');
  if (!reduce && heroImg && heroImg.animate) {
    heroImg.animate([{ transform: 'scale(1.18)' }, { transform: 'scale(1.02)' }], { duration: 2600, easing: ease, fill: 'forwards' });
  }

  // Top bar: background after 40px, reading-progress line.
  var bar = $('.bar'), prog = $('.bar-progress'), ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    if (!reduce && heroMedia) heroMedia.style.transform = 'translate3d(0,' + Math.min(y, 900) * 0.35 + 'px,0)';
    var max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    bar.classList.toggle('is-scrolled', y > 40);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // Active section: top nav underline and bottom tab indicator.
  var ids = ['top', 'work', 'prices', 'visit'];
  var navLinks = $$('.nav a'), tabLinks = $$('.tabs a'), tabInd = $('.tabs-ind');
  function setActive(id) {
    var i = Math.max(0, ids.indexOf(id));
    navLinks.forEach(function (a) { mark(a, a.getAttribute('href') === '#' + ids[i]); });
    tabLinks.forEach(function (a, j) { mark(a, j === i); });
    if (tabInd) tabInd.style.transform = 'translateX(' + i * 100 + '%)';
  }
  function mark(a, on) {
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  }
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.dataset.section || 'top'); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('#top,[data-section]').forEach(function (el) { secIO.observe(el); });
  }

  // Before/after slider, with one demo sweep the first time it's seen.
  var ba = $('.ba');
  if (ba) {
    var range = $('input', ba), stopped = false;
    var setBa = function (v) { ba.style.setProperty('--ba', v + '%'); range.value = v; };
    range.addEventListener('input', function () { stopped = true; setBa(+range.value); });
    range.addEventListener('pointerdown', function () { stopped = true; });
    var sweep = function () {
      var keys = [[0, 50], [700, 18], [1600, 82], [2400, 50]], t0 = performance.now();
      var ez = function (p) { return p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };
      function step(t) {
        if (stopped) return;
        var e = t - t0, i = -1;
        for (var k = 0; k < keys.length; k++) { if (keys[k][0] > e) { i = k; break; } }
        if (i === -1) { setBa(50); return; }
        var a = keys[i - 1], b = keys[i];
        setBa(Math.round(a[1] + (b[1] - a[1]) * ez((e - a[0]) / (b[0] - a[0]))));
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if (!reduce && 'IntersectionObserver' in window) {
      var baIO = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { baIO.disconnect(); setTimeout(sweep, 500); }
      }, { threshold: 0.5 });
      baIO.observe(ba);
    }
  }

  // "In the shop" carousel arrows.
  var track = $('.shop-track');
  $$('[data-shop]').forEach(function (b) {
    b.addEventListener('click', function () {
      var dir = b.dataset.shop === 'next' ? 1 : -1;
      track.scrollBy({ left: dir * Math.min(360, track.clientWidth * 0.8), behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();

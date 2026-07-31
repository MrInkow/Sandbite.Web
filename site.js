/* Sandbite — sandbite.com
   Progressive enhancement only. Every page works with JS disabled. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Current year in the footer ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.setAttribute('data-open', String(open));
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after tapping a link on mobile
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset state when the layout returns to desktop
    var wide = window.matchMedia('(min-width: 881px)');
    var onWide = function (mq) { if (mq.matches) setOpen(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* ---- Order panel state ---- */
  var orderPanel = document.getElementById('order-form');

  if (orderPanel && 'IntersectionObserver' in window) {
    var orderObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        document.body.classList.toggle('is-ordering', entry.isIntersecting);
      });
    }, { threshold: 0.12 });
    orderObserver.observe(orderPanel);
  }

  /* ---- Stripe Payment Link hydration ---- */
  var checkoutConfig = window.SANDBITE_CHECKOUT || {};
  var checkoutLinks = {
    'kona-box': checkoutConfig.konaBox,
    'kona-single': checkoutConfig.konaSingle
  };
  var checkoutKeys = Object.keys(checkoutLinks);
  var liveCheckoutCount = 0;

  checkoutKeys.forEach(function (key) {
    if (typeof checkoutLinks[key] === 'string' && checkoutLinks[key].indexOf('https://') === 0) {
      liveCheckoutCount += 1;
    }
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-checkout-product]'), function (link) {
    var product = link.getAttribute('data-checkout-product');
    var checkoutUrl = checkoutLinks[product];
    var readyLabel = link.getAttribute('data-checkout-ready-label');
    var fallbackLabel = link.getAttribute('data-checkout-fallback-label');

    if (checkoutUrl && checkoutUrl.indexOf('https://') === 0) {
      link.href = checkoutUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('data-checkout-ready', 'true');
      if (readyLabel) link.innerHTML = readyLabel;
      return;
    }

    link.setAttribute('data-checkout-ready', 'false');
    if (fallbackLabel) link.innerHTML = fallbackLabel;
  });

  var checkoutLive = checkoutKeys.length > 0 && liveCheckoutCount === checkoutKeys.length;
  document.documentElement.classList.toggle('checkout-live', checkoutLive);
  Array.prototype.forEach.call(document.querySelectorAll('[data-checkout-pending]'), function (el) {
    el.hidden = checkoutLive;
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-checkout-live]'), function (el) {
    el.hidden = !checkoutLive;
  });

  /* ---- Scroll reveal ---- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var targets = document.querySelectorAll('[data-reveal]');
    if (targets.length) {
      document.documentElement.classList.add('js-reveal');

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.transitionDelay = (entry.target.dataset.revealDelay || 0) + 'ms';
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      Array.prototype.forEach.call(targets, function (el, i) {
        // Stagger siblings that share a parent
        var siblings = el.parentElement ? el.parentElement.querySelectorAll(':scope > [data-reveal]') : [];
        if (siblings.length > 1) {
          el.dataset.revealDelay = Array.prototype.indexOf.call(siblings, el) * 90;
        }
        observer.observe(el);
      });

      // Anything already on screen at load reveals immediately
      window.setTimeout(function () {
        Array.prototype.forEach.call(targets, function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      }, 60);

      // Safety net: never let an animation be the reason content is invisible.
      window.setTimeout(function () {
        document.documentElement.classList.remove('js-reveal');
      }, 4000);
    }
  }

  /* ---- Mark the nav item for the section in view ---- */
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  if (navLinks.length && 'IntersectionObserver' in window) {
    var sections = [];
    Array.prototype.forEach.call(navLinks, function (link) {
      var el = document.getElementById(link.getAttribute('href').slice(1));
      if (el) sections.push({ el: el, link: link });
    });

    if (sections.length) {
      var clear = function () {
        sections.forEach(function (s) { s.link.removeAttribute('aria-current'); });
      };

      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var match = sections.filter(function (s) { return s.el === entry.target; })[0];
          if (match) { clear(); match.link.setAttribute('aria-current', 'page'); }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });

      sections.forEach(function (s) { spy.observe(s.el); });
    }
  }
})();

(function () {
    'use strict';

    const CONFIG = {
        contactEmail: 'hello@sgbpropertycare.co.uk',
        siteName: 'SGB Window Cleaning'
    };

    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    document.addEventListener('DOMContentLoaded', function () {
        initYear();
        initHeaderScroll();
        initMobileNav();
        initContactForm();
        initSmoothAnchors();
    });

    function initYear() {
        var el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    }

    function initHeaderScroll() {
        var header = document.getElementById('site-header');
        if (!header) return;

        var threshold = 40;
        var lastState = false;

        function update() {
            var scrolled = window.scrollY > threshold;
            if (scrolled !== lastState) {
                header.classList.toggle('is-scrolled', scrolled);
                lastState = scrolled;
            }
        }

        update();
        window.addEventListener('scroll', update, { passive: true });
    }

    function initMobileNav() {
        var toggle = document.getElementById('nav-toggle');
        var nav = document.getElementById('nav');
        if (!toggle || !nav) return;

        function close() {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        $$('a', nav).forEach(function (link) {
            link.addEventListener('click', close);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    }

    function initSmoothAnchors() {
        $$('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;

                var target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                var headerOffset = 80;
                var top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    }

    function initContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnText = submitBtn ? submitBtn.textContent : 'Send';

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = $('#name', form).value.trim();
            var email = $('#email', form).value.trim();
            var phone = $('#phone', form).value.trim();
            var message = $('#message', form).value.trim();

            if (!name || !email) {
                alert('Please fill in your name and email so we can get back to you.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (submitBtn) {
                submitBtn.textContent = 'Opening email...';
                submitBtn.disabled = true;
            }

            var subject = 'Quote Request from ' + name;
            var bodyLines = [
                'Hi ' + CONFIG.siteName + ',',
                '',
                'I\u2019d like a quote for ' + service + '.',
                '',
                'Name:    ' + name,
                'Email:   ' + email,
                'Phone:   ' + (phone || 'Not provided'),
                '',
                'Details:',
                message || '(none provided)',
                '',
                '\u2014 Sent from the SGB Window Cleaning website'
            ];

            var mailto = 'mailto:' + CONFIG.contactEmail +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(bodyLines.join('\n'));

            var link = document.createElement('a');
            link.href = mailto;
            link.click();

            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.textContent = 'Email opened!';
                    submitBtn.classList.add('btn-success');

                    setTimeout(function () {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-success');
                    }, 2000);
                }
            }, 500);
        });
    }
})();

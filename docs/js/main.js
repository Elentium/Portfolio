import { initSkillsTags } from './skillsTags.js';
import { initPortfolio } from './portfolio.js';
import { initPricing } from './pricing.js';
import { initAvailabilityStatus } from './availabilityStatus.js';
import { initCursorGlow } from './cursorGlow.js';
import { initTermsOfService } from './termsOfService.js';
import { initPaymentMethods } from './paymentMethods.js';

function initTheme() {
    const root = document.documentElement;
    const toggle = document.querySelector('.theme-toggle');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const savedTheme = localStorage.getItem('portfolio-theme');
    const applyTheme = theme => {
        const isDark = theme === 'dark';
        root.dataset.theme = theme;
        toggle?.setAttribute('aria-pressed', String(isDark));
        if (toggle) {
            toggle.querySelector('.theme-toggle-icon').textContent = isDark ? '☼' : '◐';
            toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
        themeMeta?.setAttribute('content', isDark ? '#0d111b' : '#f7f6f2');
    };

    applyTheme(savedTheme === 'light' ? 'light' : 'dark');
    toggle?.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', nextTheme);
        applyTheme(nextTheme);
    });
}

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function init() {
    document.documentElement.classList.remove('no-js');
    initTheme();
    initNavigation();
    initCursorGlow();
    initSkillsTags();
    initPricing();
    initPaymentMethods();
    initTermsOfService();
    initAvailabilityStatus();
    initPortfolio();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

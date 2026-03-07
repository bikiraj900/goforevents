// script.js

document.addEventListener('DOMContentLoaded', () => {    // 1. Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 800);
    }

    // 1.5 Load CMS Content from Firebase
    async function loadFrontendCMS() {
        try {
            const { db, doc, getDoc } = await import('./firebase-config-v2.js');
            const docRef = doc(db, "cms_content", "global");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const cmsData = docSnap.data();
                document.querySelectorAll('[data-cms]').forEach(el => {
                    const key = el.getAttribute('data-cms');
                    if (cmsData[key]) el.textContent = cmsData[key];
                });
                document.querySelectorAll('[data-cms-bg]').forEach(el => {
                    const key = el.getAttribute('data-cms-bg');
                    if (cmsData[key]) el.style.backgroundImage = `url('${cmsData[key]}')`;
                });
                document.querySelectorAll('[data-cms-img]').forEach(el => {
                    const key = el.getAttribute('data-cms-img');
                    if (cmsData[key]) el.src = cmsData[key];
                });
            }
        } catch (error) {
            console.error("Error loading CMS data from Firebase:", error);
            // Fallback to localStorage if Firebase fails to load (offline mode)
            const backupData = JSON.parse(localStorage.getItem('goForEvents_cms_content'));
            if (backupData) {
                document.querySelectorAll('[data-cms]').forEach(el => {
                    const key = el.getAttribute('data-cms');
                    if (backupData[key]) el.textContent = backupData[key];
                });
                document.querySelectorAll('[data-cms-bg]').forEach(el => {
                    const key = el.getAttribute('data-cms-bg');
                    if (backupData[key]) el.style.backgroundImage = `url('${backupData[key]}')`;
                });
                document.querySelectorAll('[data-cms-img]').forEach(el => {
                    const key = el.getAttribute('data-cms-img');
                    if (backupData[key]) el.src = backupData[key];
                });
            }
        }
    }
    loadFrontendCMS();

    // 1.8 Real-time Analytics Tracker
    async function trackVisit() {
        if (sessionStorage.getItem('visited_gfe')) return; // Count uniquely per browser session
        try {
            const { db, doc, setDoc, increment } = await import('./firebase-config-v2.js');
            // Store by YYYY-MM-DD local date
            const today = new Date().toLocaleDateString('en-CA');
            await setDoc(doc(db, "analytics", today), { visits: increment(1) }, { merge: true });
            sessionStorage.setItem('visited_gfe', 'true');
        } catch (error) {
            console.error("Analytics Tracker Error:", error);
        }
    }
    trackVisit();

    // 2. Dark/Light Mode Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check Local Storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (themeIcon) {
            themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeIcon.className = 'fas fa-moon';
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.className = 'fas fa-sun';
            }
        });
    }

    // 3. Navbar Sticky & Hamburger Mobile Menu
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu on link click
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }

        // Scroll To Top Button
        const scrollTopBtn = document.getElementById('scroll-top');
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }

        // Scroll Reveal Animations
        revealElements();
    });

    // 4. Scroll Reveal Logic
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    // Trigger once on load
    revealElements();

    // 5. Scroll To Top Action
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Navigation Active Links
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        } else {
            // Also handle hash links if on same page
            if (link.getAttribute('href').startsWith('#') && currentLocation === 'index.html') {
                // Ignore hash links for this simple active state logic
            } else {
                link.classList.remove('active');
            }
        }
    });
});

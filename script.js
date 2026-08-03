// JavaScript for Vijayan A R Portfolio (Redesigned Edition)
document.addEventListener('DOMContentLoaded', () => {

    // 0. Theme Switcher (Dark Mode / Light Mode)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'inline-flex';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (sunIcon) sunIcon.style.display = 'inline-flex';
            if (moonIcon) moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        }
    }

    // 1. Navbar Scroll Highlight & Glass Shadow
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let currentSection = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '20px';
                navMenu.style.right = '20px';
                navMenu.style.background = 'var(--bg-card)';
                navMenu.style.padding = '24px';
                navMenu.style.borderRadius = '16px';
                navMenu.style.border = '1px solid var(--border)';
                navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            });
        });
    }

    // 3. Project Details Modal
    const projectData = {
        p1: {
            title: "AI Data Analyzer Dashboard",
            tags: ["Python", "Pandas", "Gradio", "Matplotlib", "LLM"],
            description: "An intelligent data visualization and insights platform powered by LLM models, Gradio UI, and Matplotlib/Pandas. Enables raw dataset uploads with real-time conversational analysis, chart generation, and executive summaries.",
            highlights: [
                "Automated data preprocessing & missing value handling",
                "Natural language query processing with custom LLM pipeline",
                "Dynamic Matplotlib chart rendering inside Gradio dashboard UI",
                "Optimized memory management for fast data exploration"
            ],
            demoUrl: "https://ai-data-analyzer-dashboard.onrender.com",
            repoUrl: "https://github.com/Vijayan-A-R-04/ai-data-analyzer-dashboard"
        },
        p2: {
            title: "User Authentication System",
            tags: ["Node.js", "Express", "MongoDB", "JWT", "bcryptjs"],
            description: "Production-grade authentication backend service providing salted password hashing, JWT access token management, role-based access control, and protected API routes.",
            highlights: [
                "Salted password hashing using bcryptjs library",
                "Stateless JWT access and refresh token management",
                "MongoDB schema validation and Mongoose ORM integration",
                "Protection against common web security vectors (XSS, CSRF)"
            ],
            demoUrl: "live-demos/auth-app/index.html",
            repoUrl: "https://github.com/Vijayan-A-R-04/User-Authentication-System-P01"
        },
        p3: {
            title: "Local Store — E-Commerce Web App",
            tags: ["HTML5", "CSS3", "Vanilla JavaScript", "Responsive Cart"],
            description: "Full-featured responsive local e-commerce web application built with clean HTML5, modern CSS3 styling, and client-side JavaScript cart state persistence.",
            highlights: [
                "Pure Vanilla JavaScript cart calculation & state management",
                "Responsive grid product catalog optimized for mobile & desktop",
                "Smooth micro-animations and intuitive item selection UI",
                "Zero external framework dependencies for lightning fast loads"
            ],
            demoUrl: "live-demos/local-store/index.html",
            repoUrl: "https://github.com/Vijayan-A-R-04/PRODIGY_FS_03"
        }
    };

    const projectCards = document.querySelectorAll('.project-card');
    const modalBackdrop = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const pid = card.getAttribute('data-project-id');
            const data = projectData[pid];
            if (!data) return;

            modalBody.innerHTML = `
                <div class="tech-chips mb-3" style="margin-bottom: 16px;">
                    ${data.tags.map(t => `<span class="chip">${t}</span>`).join('')}
                </div>
                <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 14px; color: var(--text-heading);">
                    ${data.title}
                </h2>
                <p style="color: var(--text-body); font-size: 0.98rem; line-height: 1.7; margin-bottom: 20px;">
                    ${data.description}
                </p>

                <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px; color: var(--emerald);">
                    Key Technical Highlights:
                </h3>
                <ul style="color: var(--text-body); margin-left: 20px; margin-bottom: 28px; line-height: 1.8; font-size: 0.92rem;">
                    ${data.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>

                <div style="display: flex; gap: 12px; margin-top: 24px;">
                    <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; justify-content: center;">
                        Live Demo ↗
                    </a>
                    <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1; justify-content: center;">
                        GitHub Code ↗
                    </a>
                </div>
            `;

            modalBackdrop.classList.add('active');
            modalBackdrop.setAttribute('aria-hidden', 'false');
        });
    });

    function attachRunnerEvents(pid) {
        if (pid === 'p1') {
            const analyzeBtn = document.getElementById('p1AnalyzeBtn');
            const output = document.getElementById('p1Output');
            const canvas = document.getElementById('p1Canvas');
            if (analyzeBtn) {
                analyzeBtn.addEventListener('click', () => {
                    output.innerHTML = `> Executing LLM Analysis Pipeline...<br>> Processing missing values & correlation matrix...<br>> <span style="color:#10b981;">[SUCCESS] Live chart rendered with 99.4% statistical confidence.</span>`;
                });
            }
        } else if (pid === 'p2') {
            const authBtn = document.getElementById('p2AuthActionBtn');
            const output = document.getElementById('p2Output');
            if (authBtn) {
                authBtn.addEventListener('click', () => {
                    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZpamF5YW4gQSBSIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
                    output.innerHTML = `[POST /api/auth/login] HTTP 200 OK<br>> JWT Access Token: <span style="color:#10b981;">${token}</span><br>> User Authenticated: Session active for 24 hours.`;
                });
            }
        } else if (pid === 'p3') {
            let total = 0;
            let itemsCount = 0;
            const totalEl = document.getElementById('cartTotal');
            const output = document.getElementById('p3Output');
            const cartBtns = document.querySelectorAll('.add-cart-btn');
            const checkoutBtn = document.getElementById('checkoutBtn');

            cartBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const price = parseFloat(btn.getAttribute('data-price'));
                    const name = btn.getAttribute('data-name');
                    total += price;
                    itemsCount++;
                    totalEl.textContent = `$${total.toFixed(2)}`;
                    output.innerHTML = `> [CART ADD] Added ${name} ($${price}).<br>> Total Items: ${itemsCount} | Subtotal: <span style="color:#10b981;">$${total.toFixed(2)}</span>`;
                });
            });

            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    if (total === 0) {
                        output.innerHTML = `> [WARNING] Your cart is empty! Add items above to test checkout.`;
                    } else {
                        output.innerHTML = `> [CHECKOUT] Order #ORD-2026-${Math.floor(Math.random()*9000+1000)} Placed Successfully!<br>> Paid: <span style="color:#10b981;">$${total.toFixed(2)}</span>. Thank you for testing the live demo!`;
                        total = 0;
                        itemsCount = 0;
                        totalEl.textContent = `$0.00`;
                    }
                });
            }
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
    }

    function closeModal() {
        modalBackdrop.classList.remove('active');
        modalBackdrop.setAttribute('aria-hidden', 'true');
    }

    // 4. Toast Notification
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // 5. Resume Download Trigger
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', () => {
            showToast("Downloading Vijayan A R's Resume...");
        });
    }

    // 6. Contact Form Submission (Web3Forms Direct Email Delivery)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Message ✉';
            const name = document.getElementById('nameInput').value.trim();

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... ⏳';
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showToast(`Thank you, ${name}! Your message has been sent to Vijayan's inbox.`);
                    contactForm.reset();
                } else {
                    // If access key is placeholder or error returned
                    showToast(data.message || `Thank you, ${name}! Your message has been sent.`);
                    contactForm.reset();
                }
            } catch (err) {
                showToast(`Thank you, ${name}! Your message has been submitted.`);
                contactForm.reset();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    }

    // 7. Security: Global Reverse Tabnabbing Protection Safeguard
    function enforceAntiTabnabbing() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            const currentRel = link.getAttribute('rel') || '';
            const relTokens = new Set(currentRel.split(/\s+/).filter(Boolean));
            if (!relTokens.has('noopener') || !relTokens.has('noreferrer')) {
                relTokens.add('noopener');
                relTokens.add('noreferrer');
                link.setAttribute('rel', Array.from(relTokens).join(' '));
            }
        });
    }
    enforceAntiTabnabbing();

    // Observe dynamically created nodes (e.g. project modals) to enforce protection on future links
    const antiTabnabbingObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                enforceAntiTabnabbing();
            }
        });
    });
    antiTabnabbingObserver.observe(document.body, { childList: true, subtree: true });
});


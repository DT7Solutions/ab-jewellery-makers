document.addEventListener('DOMContentLoaded', function () {
    // Quick Dark / Light Mode Toggle Button in Navbar
    const themeBtn = document.createElement('li');
    themeBtn.className = 'nav-item';
    themeBtn.innerHTML = `
        <a class="nav-link" id="dark-mode-toggle-btn" href="#" role="button" title="Toggle Light / Dark Mode" style="font-size: 1.05rem; padding: 0.5rem 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <i class="fas fa-moon" id="theme-toggle-icon"></i>
            <span id="theme-toggle-label" style="font-size: 0.85rem; font-weight: 600;"></span>
        </a>
    `;

    const navbarNav = document.querySelector('#jazzy-navbar .navbar-nav.ms-auto') || document.querySelector('#jazzy-navbar .navbar-nav:last-child');
    if (navbarNav) {
        navbarNav.insertBefore(themeBtn, navbarNav.firstChild);
    }

    function applyThemeMode(mode) {
        var resolvedMode = mode;
        if (mode === 'auto') {
            resolvedMode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
        }

        document.documentElement.setAttribute('data-bs-theme', resolvedMode);
        localStorage.setItem('jazzmin-theme-mode', mode);

        // Update Bootswatch stylesheet for 100% full background skinning
        const themeCSS = document.getElementById('jazzmin-theme');
        if (themeCSS) {
            if (resolvedMode === 'light') {
                themeCSS.setAttribute('href', '/static/vendor/bootswatch/flatly/bootstrap.min.css');
            } else {
                themeCSS.setAttribute('href', '/static/vendor/bootswatch/darkly/bootstrap.min.css');
            }
        }

        // Update Navbar theme classes
        const navbar = document.getElementById('jazzy-navbar') || document.querySelector('.app-header');
        if (navbar) {
            if (resolvedMode === 'light') {
                navbar.classList.remove('navbar-dark', 'bg-dark');
                navbar.classList.add('navbar-light', 'bg-light');
            } else {
                navbar.classList.remove('navbar-light', 'bg-light');
                navbar.classList.add('navbar-dark', 'bg-dark');
            }
        }

        // Update Sidebar theme classes
        const sidebars = document.querySelectorAll('.main-sidebar, .app-sidebar, aside');
        sidebars.forEach(function (sidebar) {
            if (resolvedMode === 'light') {
                sidebar.className = sidebar.className.replace(/sidebar-dark-\w+/g, 'sidebar-light-warning');
                sidebar.classList.remove('bg-dark');
                sidebar.classList.add('bg-light');
            } else {
                sidebar.className = sidebar.className.replace(/sidebar-light-\w+/g, 'sidebar-dark-warning');
                sidebar.classList.remove('bg-light');
                sidebar.classList.add('bg-dark');
            }
        });

        // Update Button Icon and Label
        const icon = document.getElementById('theme-toggle-icon');
        const label = document.getElementById('theme-toggle-label');
        if (icon) {
            if (resolvedMode === 'dark') {
                icon.className = 'fas fa-sun text-warning';
                if (label) {
                    label.textContent = 'Light Mode';
                    label.style.color = '#f5d061';
                }
            } else {
                icon.className = 'fas fa-moon text-dark';
                if (label) {
                    label.textContent = 'Dark Mode';
                    label.style.color = '#333';
                }
            }
        }

        // Sync with Jazzmin UI mode selector dropdown if present
        const modeSelect = document.getElementById('jazzmin-mode-select');
        if (modeSelect) {
            modeSelect.value = mode;
        }
    }

    // Initial load check (default to light mode)
    const savedMode = localStorage.getItem('jazzmin-theme-mode') || 'light';
    applyThemeMode(savedMode);

    // Toggle event listener
    const toggleBtn = document.getElementById('dark-mode-toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const current = document.documentElement.getAttribute('data-bs-theme');
            const nextMode = (current === 'dark') ? 'light' : 'dark';
            applyThemeMode(nextMode);
        });
    }

    // Prevent double form submission (especially on login/admin pages to avoid CSRF token rotation issues)
    const adminForms = document.querySelectorAll('form');
    adminForms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            if (e.defaultPrevented) {
                return;
            }
            // Check native HTML5 validation
            if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
                return;
            }
            const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
            submitButtons.forEach(function (btn) {
                // Use setTimeout to allow the submit event to propagate before disabling
                setTimeout(function () {
                    btn.disabled = true;
                }, 10);
            });
        });
    });

    // Helper to get cookies (needed for CSRF token retrieval)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Add a Logout Button to the Admin footer (supports Django 5.0+ POST logouts)
    const footer = document.querySelector('footer.main-footer, .main-footer');
    if (footer) {
        const csrfToken = getCookie('csrftoken') || '';
        const logoutForm = document.createElement('form');
        logoutForm.action = '/admin/logout/';
        logoutForm.method = 'post';
        logoutForm.style.display = 'inline-block';
        logoutForm.innerHTML = `
            <input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}">
            <button type="submit" class="btn btn-xs btn-danger" style="font-weight: 600; padding: 2px 8px; font-size: 0.75rem; border-radius: 4px; margin-top: -3px;">
                <i class="fas fa-sign-out-alt mr-1"></i> Log Out
            </button>
        `;

        const floatRight = footer.querySelector('.float-right');
        if (floatRight) {
            logoutForm.style.marginRight = '15px';
            floatRight.insertBefore(logoutForm, floatRight.firstChild);
        } else {
            logoutForm.style.float = 'right';
            footer.appendChild(logoutForm);
        }
    }

    // Intercept default GET logout links and submit them as POST requests (needed for Django 5.0+)
    const logoutLinks = document.querySelectorAll('a[href*="/logout/"], a[href*="/logout"]');
    logoutLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const csrfToken = getCookie('csrftoken') || '';
            const form = document.createElement('form');
            form.action = link.getAttribute('href');
            form.method = 'post';
            form.style.display = 'none';
            form.innerHTML = `<input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}">`;
            document.body.appendChild(form);
            form.submit();
        });
    });
});

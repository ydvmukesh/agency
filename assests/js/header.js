// desktop menu js start=--------------------
document.addEventListener('DOMContentLoaded', function() {
    // Main dropdown functionality
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.navbar__dropdown-toggle');
        const list = dropdown.querySelector('.navbar__dropdown-list');
        
        // Check if elements exist before proceeding
        if (!toggle || !list) return;
        
        let hoverTimeout;
        let isHovering = false;

        // Check if mobile
        const isMobile = () => window.matchMedia('(max-width: 991px)').matches;

        // Open menu function with all required styles
        const openMenu = () => {
            clearTimeout(hoverTimeout);
            toggle.classList.add('w--open');
            list.classList.add('w--open');

            // Apply all required styles
            list.style.opacity = '1';
            list.style.transform = 'translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
            list.style.transformStyle = 'preserve-3d';

            // Set ARIA attributes
            toggle.setAttribute('aria-expanded', 'true');
            list.setAttribute('aria-hidden', 'false');
            isHovering = true;
        };

        // Close menu function - reset all styles
        const closeMenu = () => {
            toggle.classList.remove('w--open');
            list.classList.remove('w--open');

            // Reset all styles
            list.style.opacity = '';
            list.style.transform = '';
            list.style.transformStyle = '';

            // Reset ARIA attributes
            toggle.setAttribute('aria-expanded', 'false');
            list.setAttribute('aria-hidden', 'true');
            isHovering = false;
        };

        // Desktop hover behavior
        if (!isMobile()) {
            // Mouse enter for both toggle and dropdown
            [toggle, list].forEach(el => {
                el.addEventListener('mouseenter', () => {
                    openMenu();
                });

                el.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        if (!isHovering) closeMenu();
                    }, 300);
                });
            });

            // Track if mouse is still over dropdown area
            dropdown.addEventListener('mouseenter', () => {
                isHovering = true;
                clearTimeout(hoverTimeout);
            });

            dropdown.addEventListener('mouseleave', () => {
                isHovering = false;
                hoverTimeout = setTimeout(closeMenu, 300);
            });
        }

        // Mobile click behavior
        toggle.addEventListener('click', e => {
            if (isMobile()) {
                e.preventDefault();
                e.stopPropagation();

                if (list.classList.contains('w--open')) {
                    closeMenu();
                } else {
                    // Close other open dropdowns
                    document.querySelectorAll('.navbar__dropdown-list.w--open').forEach(openList => {
                        if (openList !== list) {
                            const parent = openList.closest('.nav-dropdown');
                            if (!parent) return;
                            const otherToggle = parent.querySelector('.navbar__dropdown-toggle');
                            if (!otherToggle) return;

                            otherToggle.classList.remove('w--open');
                            openList.classList.remove('w--open');
                            openList.style.opacity = '';
                            openList.style.transform = '';
                            openList.style.transformStyle = '';
                        }
                    });
                    openMenu();
                }
            }
        });

        // Initialize ARIA attributes
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-haspopup', 'true');
        list.setAttribute('aria-hidden', 'true');
    });

    // Close dropdowns when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.matchMedia('(max-width: 991px)').matches) {
            if (!e.target.closest('.nav-dropdown')) {
                document.querySelectorAll('.navbar__dropdown-list.w--open').forEach(list => {
                    const parent = list.closest('.nav-dropdown');
                    if (!parent) return;
                    const toggle = parent.querySelector('.navbar__dropdown-toggle');
                    if (!toggle) return;

                    toggle.classList.remove('w--open');
                    list.classList.remove('w--open');
                    list.style.opacity = '';
                    list.style.transform = '';
                    list.style.transformStyle = '';
                });
            }
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.navbar__dropdown-list.w--open').forEach(list => {
                const parent = list.closest('.nav-dropdown');
                if (!parent) return;
                const toggle = parent.querySelector('.navbar__dropdown-toggle');
                if (!toggle) return;

                toggle.classList.remove('w--open');
                list.classList.remove('w--open');
                list.style.opacity = '';
                list.style.transform = '';
                list.style.transformStyle = '';
            });
        }
    });
});
// desktop menu js=--------------------end


// mobile menu js start=----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuToggle = document.querySelector('.nav_menu_icon-wrap');
    const mobileMenu = document.querySelector('.navbar-mobile');
    const closeButton = document.querySelector('.navbar-mobile__close');

    // Check if mobile menu elements exist
    if (!mobileMenuToggle || !mobileMenu || !closeButton) return;

    // Function to open mobile menu with smooth transition
    const openMobileMenu = () => {
        // First make it visible but off-screen
        mobileMenu.style.display = 'flex';

        // Trigger reflow to ensure display change is processed
        void mobileMenu.offsetWidth;

        // Add active class for the transition
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Function to close mobile menu with smooth transition
    const closeMobileMenu = () => {
        // Remove active class for the transition
        mobileMenu.classList.remove('active');

        // After transition completes, hide completely
        setTimeout(() => {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = '';
        }, 400); // Match this with your CSS transition duration
    };

    // Event listeners
    mobileMenuToggle.addEventListener('click', openMobileMenu);
    closeButton.addEventListener('click', closeMobileMenu);

    // Close when clicking outside menu content
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Initialize menu as closed
    mobileMenu.style.display = 'none';
});

// mobile menu js=--------------------end


// up and down navbar=====================================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    // Check if navbar exists before setting up scroll behavior
    if (!navbar) return;
    
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // scrolling down → hide navbar
            navbar.style.transform = "translate3d(0px, -100%, 0px) scale3d(1, 1, 1)";
        } else {
            // scrolling up → show navbar
            navbar.style.transform = "translate3d(0px, 0%, 0px) scale3d(1, 1, 1)";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // avoid negative scroll
    });
});
// header js end =================================================================================================
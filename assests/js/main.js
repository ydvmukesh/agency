// desktop menu js start=--------------------
document.addEventListener('DOMContentLoaded', function() {
    // Main dropdown functionality
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.navbar__dropdown-toggle');
        const list = dropdown.querySelector('.navbar__dropdown-list');
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
                            const otherToggle = parent.querySelector('.navbar__dropdown-toggle');

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
                    const toggle = parent.querySelector('.navbar__dropdown-toggle');

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
                const toggle = parent.querySelector('.navbar__dropdown-toggle');

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
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

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



// . award_heading.is_1 --------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Create smoother
    const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true
    });

    const wrapper = document.querySelector('.award_heading_wrapper');

    // Initial positions
    gsap.set(".award_heading.is_1", {
        xPercent: -50,
        opacity: 0
    });
    gsap.set(".award_heading.is_2", {
        xPercent: 50,
        opacity: 0
    });

    // Common trigger options with smoother's scroller
    const triggerOpts = {
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1.2,
        scroller: "#smooth-wrapper", // key for ScrollSmoother
    };

    // Animate first heading
    gsap.to(".award_heading.is_1", {
        xPercent: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: triggerOpts
    });

    // Animate second heading with slight delay for smoothness
    gsap.to(".award_heading.is_2", {
        xPercent: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
            ...triggerOpts,
            delay: 0.05
        }
    });
});



// award_mobile-cards--------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const marqueeWrap = document.querySelector(".award_mobile-cards");
    const marqueeItems = gsap.utils.toArray(".award_marquee-card");

    // Get total width of one cycle
    const totalWidth = marqueeItems[0].offsetWidth;

    // Duplicate the content to make seamless loop
    marqueeWrap.innerHTML += marqueeWrap.innerHTML;

    gsap.to(".award_marquee-card", {
        xPercent: -100,
        repeat: -1,
        ease: "none",
        duration: 20 // adjust speed
    });
});
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const marqueeWrap = document.querySelector(".sponsor_company");
    const marqueeItems = gsap.utils.toArray(".sponsor_child");

    // Get total width of one cycle
    const totalWidth = marqueeItems[0].offsetWidth;

    // Duplicate the content to make seamless loop
    marqueeWrap.innerHTML += marqueeWrap.innerHTML;

    gsap.to(".sponsor_child", {
        xPercent: -100,
        repeat: -1,
        ease: "none",
        duration: 20 // adjust speed
    });
});


// services section animation --------------------------------------------------------//

// document.addEventListener('DOMContentLoaded', () => {
//     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

//     // Init ScrollSmoother


//     const sections = document.querySelectorAll(".service_card");

//     sections.forEach((card, i) => {
//         let nextSection = card.nextElementSibling;

//         gsap.to(card, {
//             scrollTrigger: {
//                 trigger: card,
//                 start: "top top",
//                 endTrigger: nextSection || card, // stop when next section starts
//                 end: "top top",
//                 pin: true,
//                 pinSpacing: false
//             }
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Equal height on mobile
    function setEqualHeight() {
        const sections = document.querySelectorAll(".service_card");

        // Reset height before recalculating
        sections.forEach(card => card.style.height = "");

        if (window.innerWidth <= 768) { // Mobile breakpoint
            let maxHeight = 0;

            sections.forEach(card => {
                maxHeight = Math.max(maxHeight, card.offsetHeight);
            });

            sections.forEach(card => {
                card.style.height = maxHeight + "px";
            });
        }
    }

    // Run on load & resize
    setEqualHeight();
    window.addEventListener('resize', setEqualHeight);

    // Your scroll pin animation
    const sections = document.querySelectorAll(".service_card");
    sections.forEach((card, i) => {
        let nextSection = card.nextElementSibling;

        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top top",
                endTrigger: nextSection || card,
                end: "top top",
                pin: true,
                pinSpacing: false
            }
        });
    });
});


//  Split and animate .tp_text_invert=--------------------end

//     // Split and animate .tp_text_invert
document.addEventListener('DOMContentLoaded', () => {
    gsap.config({
        trialWarn: false
    });
    console.clear();

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Split and animate .tp_text_invert
    document.querySelectorAll(".tp_text_invert").forEach(element => {
        const split = new SplitText(element, {
            type: "lines"
        });

        split.lines.forEach(line => {
            gsap.to(line, {
                backgroundPositionX: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: line,
                    scrub: 1,
                    start: "top 85%",
                    end: "bottom center",
                    markers: false // disable in production
                }
            });
        });
    });

    // Call your function (make sure it's defined somewhere)
    if (typeof tp_text_invert === "function") {
        tp_text_invert();
    }
});


// founder_slider --------------------------------------------------------//
// founder_slider-----------
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.founder_slider', {
        loop: true,
        slidesPerView: 1.3,
        spaceBetween: 30,
        navigator: false,
        // centeredSlides: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
});
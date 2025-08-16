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


document.addEventListener("DOMContentLoaded", (event) => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    // Initialize ScrollSmoother
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth:1,             // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true,           // looks for data-speed and data-lag attributes on elements
      normalizeScroll: true,   // prevents address bar from showing/hiding on most devices
      ignoreMobileResize: true,// skips ScrollTrigger.refresh() on mobile resize
      smoothTouch: 0.1 // enable on touch devices
    });
  });

// . award_heading.is_1 --------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = document.querySelector('.award_heading_wrapper');

    gsap.set(".award_heading.is_1", { xPercent: -50, opacity: 0 });
    gsap.set(".award_heading.is_2", { xPercent: 50, opacity: 0 });

    const isMobile = window.matchMedia("(max-width: 991px)").matches;

    const triggerOpts = {
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1.2,
        scroller: isMobile ? undefined : "#smooth-wrapper"
    };

    gsap.to(".award_heading.is_1", {
        xPercent: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: triggerOpts
    });

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
    ScrollTrigger.refresh();

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
    ScrollTrigger.refresh();

});
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const marqueeWrap = document.querySelector(".aa_img-marquee");
    const marqueeItems = gsap.utils.toArray(".aa_img_marquee_card");

    // Get total width of one cycle
    const totalWidth = marqueeItems[0].offsetWidth;

    // Duplicate the content to make seamless loop
    marqueeWrap.innerHTML += marqueeWrap.innerHTML;

    gsap.to(".aa_img_marquee_card", {
        xPercent: -100,
        repeat: -1,
        ease: "none",
        duration: 40 // adjust speed
    });
    ScrollTrigger.refresh();

});
// teams about
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const marqueeWrap = document.querySelector(".team_marquee-wrap");
    const marqueeItems = gsap.utils.toArray(".team_marquee-child");

    // Get total width of one cycle
    const totalWidth = marqueeItems[0].offsetWidth;

    // Duplicate the content to make seamless loop
    marqueeWrap.innerHTML += marqueeWrap.innerHTML;

    gsap.to(".team_marquee-child", {
        xPercent: -100,
        repeat: -1,
        ease: "none",
        duration: 40 // adjust speed
    });
    ScrollTrigger.refresh();

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
// document.addEventListener('DOMContentLoaded', () => {
//     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


//     // Equal height on mobile - improved version
//     function setEqualHeight() {
//         const sections = document.querySelectorAll(".service_card");
//         let maxHeight = 0;

//         // First reset all heights and get natural heights
//         sections.forEach(card => {
//             card.style.removeProperty('height');
//             // Force recalc of natural height
//             void card.offsetHeight;
//         });

//         if (window.innerWidth <= 768) { // Mobile breakpoint
//             // Get max height
//             sections.forEach(card => {
//                 maxHeight = Math.max(maxHeight, card.offsetHeight);
//             });

//             // Set max height
//             sections.forEach(card => {
//                 card.style.height = `${maxHeight}px`;
//             });
//         }
//     }

//     // Debounce resize handler
//     let resizeTimeout;
//     function handleResize() {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             setEqualHeight();
//             ScrollTrigger.refresh(); // Critical to refresh scroll triggers after resize
//         }, 100);
//     }

//     // Initialize
//     setEqualHeight();
//     window.addEventListener('resize', handleResize);

//     // Improved scroll pin animation
//     const sections = document.querySelectorAll(".service_card");
//     sections.forEach((card, i) => {
//         let nextSection = card.nextElementSibling;

//         ScrollTrigger.create({
//             trigger: card,
//             start: "top top",
//             endTrigger: nextSection || card,
//             end: "top top",
//             pin: true,
//             pinSpacing: false,
//             // Add these for better mobile performance
//             anticipatePin: 1,
//             onUpdate: self => {
//                 if (self.isActive) {
//                     card.style.willChange = 'transform';
//                 } else {
//                     card.style.willChange = '';
//                 }
//             }
//         });
//     });

//     // Refresh ScrollTrigger after all cards are laid out
//     setTimeout(() => ScrollTrigger.refresh(), 500);
// });


document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    function setEqualHeight() {
        const sections = document.querySelectorAll(".service_card");
        let maxHeight = 0;

        sections.forEach(card => {
            card.style.removeProperty('height');
            void card.offsetHeight; // force reflow
        });

        if (window.innerWidth <= 768) {
            sections.forEach(card => {
                maxHeight = Math.max(maxHeight, card.offsetHeight);
            });

            sections.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
    }

    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setEqualHeight();
            ScrollTrigger.refresh();
        }, 100);
    }

    window.addEventListener('resize', handleResize);

    // Build ScrollTriggers AFTER equal heights are ready
    function initScrollTriggers() {
        const sections = document.querySelectorAll(".service_card");
        sections.forEach((card) => {
            let nextSection = card.nextElementSibling;

            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                endTrigger: nextSection || card,
                end: "top top",
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                onUpdate: self => {
                    card.style.willChange = self.isActive ? 'transform' : '';
                }
            });
        });
    }

    // First run after images loaded (important for mobile)
    window.addEventListener('load', () => {
        setEqualHeight();
        initScrollTriggers();
        ScrollTrigger.refresh();
    });
});


// services see more and see less


document.addEventListener('DOMContentLoaded', function() {
    // Select all see more/less buttons
    const seeMoreButtons = document.querySelectorAll('.service_see-wrap');
    
    // Add click event to each button
    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the parent service card
            const serviceCard = this.closest('.service_card');
            const spanWrap = this.previousElementSibling; // The service_span-wrap div
            const seeMore = this.querySelector('.see_more');
            const seeLess = this.querySelector('.see_less');
            
            // Check if we're expanding or collapsing
            if (seeMore.style.display !== 'none') {
                // Expanding - show more content
                // Store the current height
                const startHeight = spanWrap.offsetHeight + 'px';
                
                // Show all content temporarily to measure full height
                spanWrap.style.height = 'auto';
                const fullHeight = spanWrap.offsetHeight + 'px';
                
                // Reset to start height and animate
                spanWrap.style.height = startHeight;
                // Trigger reflow
                spanWrap.offsetHeight;
                
                // Animate to full height
                spanWrap.style.height = fullHeight;
                
                // Toggle text visibility
                seeMore.style.display = 'none';
                seeLess.style.display = 'block';
            } else {
                // Collapsing - show less content
                // Store current height
                const startHeight = spanWrap.offsetHeight + 'px';
                
                // Set height to current height (for smooth transition)
                spanWrap.style.height = startHeight;
                
                // Trigger reflow
                spanWrap.offsetHeight;
                
                // Animate to 0 height
                spanWrap.style.height = '0px';
                
                // Toggle text visibility
                seeMore.style.display = 'block';
                seeLess.style.display = 'none';
            }
            
            // Clean up after transition ends
            spanWrap.addEventListener('transitionend', function() {
                if (spanWrap.style.height !== '0px') {
                    spanWrap.style.height = 'auto';
                }
            }, { once: true });
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


// --------------------------------------------------------//



// about css

document.addEventListener('DOMContentLoaded', function () {
    const faqCards = document.querySelectorAll('.lb_faq_card');

    faqCards.forEach(card => {
        const question = card.querySelector('.lb_ques_wrap');
        const answerWrap = card.querySelector('.lb_ans_wrap');
        const icon = card.querySelector('.lb_faq_icon');

        question.addEventListener('click', function () {
            const isOpen = answerWrap.style.height && answerWrap.style.height !== '0px';

            if (!isOpen) {
                // --- Expand ---
                answerWrap.style.height = 'auto';
                const fullHeight = answerWrap.offsetHeight + 'px';
                answerWrap.style.height = '0px';
                void answerWrap.offsetHeight;
                answerWrap.style.height = fullHeight;

                // Rotate icon
                icon.style.transform =
                    'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateZ(180deg) skew(0deg, 0deg)';
            } else {
                // --- Collapse ---
                answerWrap.style.height = answerWrap.offsetHeight + 'px';
                void answerWrap.offsetHeight;
                answerWrap.style.height = '0px';

                // Reset icon rotation
                icon.style.transform =
                    'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateZ(0deg) skew(0deg, 0deg)';
            }

            answerWrap.addEventListener('transitionend', function () {
                if (answerWrap.style.height !== '0px') {
                    answerWrap.style.height = 'auto';
                }
            }, { once: true });
        });
    });
});






// steps_card-wrap.is_about---------------
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.to(".steps_card-wrap.is_about", {
      xPercent: -22, // ✅ moves from 0% to -22%
      ease: "none",  // smooth linear motion
      scrollTrigger: {
        trigger: ".steps_card-wrap.is_about",
        start: "top bottom",   // when it enters viewport
        end: "bottom top",     // until it leaves viewport
        scrub: true,           // ties animation to scroll
        // markers: true,      // enable to debug positions
      }
    });
  });
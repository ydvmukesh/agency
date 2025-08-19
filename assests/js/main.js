document.addEventListener("DOMContentLoaded", () => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
    // Initialize all functionality
    initScrollSmoother();
    initAwardHeadings();
    initMarqueeAnimations();
    initServicesSection();
    initTextInvertEffect();
    initFounderSlider();
    initFaqCards();
    initStepsAnimation();
  });
  
  // 1. ScrollSmoother initialization
  function initScrollSmoother() {
    // Check screen size (disable for mobile)
    if (window.innerWidth > 768) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
        smoothTouch: 0.1
      });
    }
  }
  
  // 2. Award headings animation
  function initAwardHeadings() {
    const wrapper = document.querySelector('.award_heading_wrapper');
    if (!wrapper) return;
  
    // Set initial positions only
    gsap.set(".award_heading.is_1", { xPercent: -50 });
    gsap.set(".award_heading.is_2", { xPercent: 50 });
  
    const triggerOpts = {
        trigger: wrapper,
        start: "top 85%", // Start animation a bit earlier
        end: "bottom 40%", // End animation a bit later
        scrub: 1.5, // Slightly smoother scrubbing
        // scroller: "#smooth-wrapper"
    };
  
    // First heading animation with smoother easing
    gsap.to(".award_heading.is_1", {
        xPercent: 0,
        ease: "power2.out", // Softer easing curve for smoother motion
        scrollTrigger: triggerOpts
    });
  
    // Second heading animation with staggered timing
    gsap.to(".award_heading.is_2", {
        xPercent: 0,
        ease: "power2.out", // Softer easing curve for smoother motion
        scrollTrigger: {
            ...triggerOpts,
            delay: 0.2 // Increased delay for more noticeable stagger
        }
    });

    // Refresh ScrollTrigger to ensure smooth calculations
    ScrollTrigger.refresh();
}
  
  // 3. Marquee animations
  function initMarqueeAnimations() {
    // Award mobile cards
    initMarquee(".award_mobile-cards", ".award_marquee-card", 20);
    
    // Sponsor company
    initMarquee(".sponsor_company", ".sponsor_child", 20);
    
    // About author image marquee
    initMarquee(".about_author_img-marquee", ".about_author_img_marquee_card", 40);
    
    // Team marquee
    initMarquee(".team_marquee-wrap", ".team_marquee-child", 40);
  }
  
  function initMarquee(containerSelector, itemSelector, duration) {
    const marqueeWrap = document.querySelector(containerSelector);
    if (!marqueeWrap) return;
  
    // Duplicate the content to make seamless loop
    marqueeWrap.innerHTML += marqueeWrap.innerHTML;
  
    gsap.to(itemSelector, {
      xPercent: -100,
      repeat: -1,
      ease: "none",
      duration: duration
    });
    
    ScrollTrigger.refresh();
  }
  
  // 4. Services section
  function initServicesSection() {
    // Equal heights for cards (mobile only)
    function setEqualHeight() {
      const sections = document.querySelectorAll(".service_card");
      let maxHeight = 0;
  
      // Reset existing height
      sections.forEach(card => card.style.removeProperty("height"));
  
      if (window.innerWidth <= 768) {
        sections.forEach(card => {
          maxHeight = Math.max(maxHeight, card.offsetHeight);
        });
        sections.forEach(card => {
          card.style.height = `${maxHeight}px`;
        });
      }
    }
  
    // Pinning logic (desktop only)
    function initScrollTriggers() {
      // Only run on desktop
      if (window.innerWidth > 768) {
        const sections = document.querySelectorAll(".service_card");
        
        sections.forEach((card, i) => {
          const nextSection = sections[i + 1];
          
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: nextSection || card,
            end: nextSection ? "top top" : "bottom bottom",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            onUpdate: self => {
              card.style.willChange = self.isActive ? "transform" : "auto";
            },
            markers: false
          });
        });
      }
    }
  
    // See more/see less functionality
    function initSeeMoreButtons() {
      const seeMoreButtons = document.querySelectorAll('.service_see-wrap');
      
      seeMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          const serviceCard = this.closest('.service_card');
          const spanWrap = this.previousElementSibling;
          const seeMore = this.querySelector('.see_more');
          const seeLess = this.querySelector('.see_less');
          
          if (seeMore.style.display !== 'none') {
            // Expanding
            const startHeight = spanWrap.offsetHeight + 'px';
            spanWrap.style.height = 'auto';
            const fullHeight = spanWrap.offsetHeight + 'px';
            spanWrap.style.height = startHeight;
            spanWrap.offsetHeight;
            spanWrap.style.height = fullHeight;
            
            seeMore.style.display = 'none';
            seeLess.style.display = 'block';
          } else {
            // Collapsing
            const startHeight = spanWrap.offsetHeight + 'px';
            spanWrap.style.height = startHeight;
            spanWrap.offsetHeight;
            spanWrap.style.height = '0px';
            
            seeMore.style.display = 'block';
            seeLess.style.display = 'none';
          }
          
          spanWrap.addEventListener('transitionend', function() {
            if (spanWrap.style.height !== '0px') {
              spanWrap.style.height = 'auto';
            }
          }, { once: true });
        });
      });
    }
  
    // Initial setup
    setEqualHeight();
    initScrollTriggers();
    initSeeMoreButtons();
  
    // Resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setEqualHeight();
        ScrollTrigger.refresh();
      }, 200);
    });
  }
  // 5. Text invert effect
// 5. Text invert effect (alternative version with duration control)
function initTextInvertEffect() {
    gsap.config({
        trialWarn: false
    });

    document.querySelectorAll(".tp_text_invert").forEach(element => {
        const split = new SplitText(element, {
            type: "lines"
        });

        split.lines.forEach(line => {
            // Check if mobile device
            const isMobile = window.innerWidth <= 768;
            
            gsap.to(line, {
                backgroundPositionX: 0,
                ease: "none",
                duration: isMobile ? 2 : 1, // Longer duration on mobile
                scrollTrigger: {
                    trigger: line,
                    scrub: isMobile ? 2 : 1, // Slower scrub on mobile
                    start: isMobile ? "top 90%" : "top 80%", // Later start on mobile
                    end: isMobile ? "bottom 60%" : "bottom center", // Earlier end on mobile
                    markers: false
                }
            });
        });
    });
}
  // 6. Founder slider
  function initFounderSlider() {
    const slider = document.querySelector('.founder_slider');
    if (!slider) return;
  
    new Swiper('.founder_slider', {
      loop: true,
      slidesPerView: 1.3,
      spaceBetween: 30,
      navigator: false,
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
  }
  
  // 7. FAQ cards
  function initFaqCards() {
    const faqCards = document.querySelectorAll('.location_bio_faq_card');
  
    faqCards.forEach(card => {
      const question = card.querySelector('.location_bio_ques_wrap');
      const answerWrap = card.querySelector('.location_bio_ans_wrap');
      const icon = card.querySelector('.location_bio_faq_icon');
  
      question.addEventListener('click', function() {
        const isOpen = answerWrap.style.height && answerWrap.style.height !== '0px';
  
        if (!isOpen) {
          // Expand
          answerWrap.style.height = 'auto';
          const fullHeight = answerWrap.offsetHeight + 'px';
          answerWrap.style.height = '0px';
          void answerWrap.offsetHeight;
          answerWrap.style.height = fullHeight;
          icon.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateZ(180deg) skew(0deg, 0deg)';
        } else {
          // Collapse
          answerWrap.style.height = answerWrap.offsetHeight + 'px';
          void answerWrap.offsetHeight;
          answerWrap.style.height = '0px';
          icon.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateZ(0deg) skew(0deg, 0deg)';
        }
  
        answerWrap.addEventListener('transitionend', function() {
          if (answerWrap.style.height !== '0px') {
            answerWrap.style.height = 'auto';
          }
        }, { once: true });
      });
    });
  }
  
 // 8. Steps animation
function initStepsAnimation() {
    const stepsCard = document.querySelector(".steps_card-wrap.is_about");
    if (!stepsCard) return;
    
    // Check if mobile device (you can adjust the breakpoint as needed)
    if (window.innerWidth <= 768) {
        return; // Exit function on mobile
    }
  
    gsap.to(stepsCard, {
        xPercent: -22,
        ease: "none",
        scrollTrigger: {
            trigger: stepsCard,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}
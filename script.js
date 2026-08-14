document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links a");

    /*
     * Add a subtle shadow to the navbar when scrolling.
     */
    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight = navbar.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + navbar.offsetHeight + 120;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section, " +
        ".hero-content, " +
        ".hero-image, " +
        ".skill-card, " +
        ".project-card, " +
        ".experience-card, " +
        ".achievement-card, " +
        ".cert-card, " +
        ".interest-card"
    );


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       STAGGERED CARD ANIMATIONS
    ===================================================== */

    const cardGroups = [
        ".skill-card",
        ".project-card",
        ".cert-card",
        ".interest-card"
    ];

    cardGroups.forEach(selector => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${Math.min(index * 0.08, 0.4)}s`;

        });

    });


    /* =====================================================
       RESUME / EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector("footer p");

    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.innerHTML =
            `© ${currentYear} Shamreed Muhammad Iqbal`;

    }

});

// == Refresh page: start at top of page ==
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
// === Animation functions ===

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function animateReveal(el, duration = 750, translateY = 150) {
    const start = performance.now();

    function animate(time) {
        const progress = Math.min((time - start) / duration, 1);
        const ease = easeOutCubic(progress);

        el.style.opacity = ease;
        el.style.transform = `translateY(${(1 - ease) * translateY}px)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function scrollTriggerJS(selector, options = {}) {
    let els = Array.from(document.querySelectorAll(selector))
        .filter(el => !el.dataset.revealed);

    let observer = new IntersectionObserver((entries, obs) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                setTimeout(() => {
                    animateReveal(el);
                    el.dataset.revealed = "true";
                }, delay);
                delay += 100;
                obs.unobserve(el);
            }
        });
    }, options);

    els.forEach(el => observer.observe(el));
}


// === DOM Ready ===

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    const papers = document.getElementById("papers");
    const seemorepapers = document.getElementById("see-more-papers");
    const menu = document.getElementById("menu");
    const menuspan = menu.querySelector(".source span");

    // Trigger initial scroll reveals
    scrollTriggerJS('.scroll-reveal', { rootMargin: '0px', threshold: 0.1 });

    // Handle "See More"
    seemorepapers.addEventListener("click", () => {
        papers.classList.toggle("active");
        seemorepapers.classList.toggle("active");

        document.querySelector("#see-more-papers span").textContent =
            papers.classList.contains("active") ? "See Less" : "See More";

        // requestAnimationFrame(() => {
        //     // Add .scroll-reveal to newly visible items
        //     document.querySelectorAll('#papers li:not([data-revealed])').forEach(el => {
        //         el.classList.add('scroll-reveal');
        //     });

        //     scrollTriggerJS('.scroll-reveal', {
        //         rootMargin: '0px',
        //         threshold: 0.1
        //     });
        // });
    });

    // Hover source (papers, news, etc.)
    const allItems = document.querySelectorAll(".list ul li");
    allItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const t = item.getAttribute("data-source");
            if (t) {
                menu.classList.add("highlight");
                menuspan.innerHTML = t;
            }
        });
        item.addEventListener("mouseleave", () => {
            menu.classList.remove("highlight");
            menuspan.innerHTML = "";
        });
    });

    const otherLinks = document.querySelectorAll(".text-link");
    otherLinks.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const t = item.getAttribute("data-source");
            if (t) {
                menu.classList.add("highlight");
                menuspan.innerHTML = t;
            }
        });
        item.addEventListener("mouseleave", () => {
            menu.classList.remove("highlight");
            menuspan.innerHTML = "";
        });
    });

    // Menu scroll navigation
    const menuItems = document.querySelectorAll(".menu ul.filter li");
    const sections = document.querySelectorAll("section.content");

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const targetId = item.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight menu based on scroll position
    function updateActiveMenu() {
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                menuItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("data-target") === id) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveMenu);

    // Theme toggle
    const lightBtn = document.getElementById("light-mode");
    const darkBtn = document.getElementById("dark-mode");

    function setTheme(mode) {
        body.classList.toggle("dark-mode", mode === "dark");
        body.classList.toggle("light-mode", mode === "light");
        localStorage.setItem("theme", mode);
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    lightBtn.addEventListener("click", () => setTheme("light"));
    darkBtn.addEventListener("click", () => setTheme("dark"));
});

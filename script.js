// document.addEventListener("DOMContentLoaded", function() {
//     const imageGallery = document.querySelector(".flexbox-image-gallery");
//     const body = document.body;

//     // display data source in menu
//     const allItems = document.querySelectorAll(".list ul li");
//     const menu = document.getElementById("menu");
//     const menuspan = menu.querySelector(".source span");
//     allItems.forEach(item => {
//         item.addEventListener("mouseenter", () => {
//             const t = item.getAttribute("data-source");
//             if (t) {
//                 menu.classList.add("highlight");
//                 menuspan.innerHTML = t;
//             }
//         });        
//         item.addEventListener("mouseleave", () => {
//             if (menu.classList.contains("highlight")) {
//                 menu.classList.remove("highlight");
//                 menuspan.innerHTML = "";
//             }
//         });        
//     });

//     const otherLinks = document.querySelectorAll(".text-link");
//     otherLinks.forEach(item => {
//         item.addEventListener("mouseenter", () => {
//             const t = item.getAttribute("data-source");
//             if (t) {
//                 menu.classList.add("highlight");
//                 menuspan.innerHTML = t;
//             }
//         });        
//         item.addEventListener("mouseleave", () => {
//             if (menu.classList.contains("highlight")) {
//                 menu.classList.remove("highlight");
//                 menuspan.innerHTML = "";
//             }
//         });        
//     });

//     const papers = document.getElementById("papers")
//     const seemorepapers = document.getElementById("see-more-papers")
//     seemorepapers.addEventListener('click', function() {
//         if (papers.classList.contains("active")) {
//             papers.classList.remove("active");
//             seemorepapers.classList.remove("active");
//             document.querySelector("#see-more-papers span").textContent = "See More"
//         }
//         else {
//             papers.classList.add("active");
//             seemorepapers.classList.add("active");
//             document.querySelector("#see-more-papers span").textContent = "See Less";
//         };
//     });


//     // menu highlighting
//     const menuItems = document.querySelectorAll(".menu ul.filter li");
//     const sections = document.querySelectorAll("section.content");

//     // Smooth scrolling when clicking a menu item
//     menuItems.forEach(item => {
//         item.addEventListener("click", function () {
//             const targetId = item.getAttribute("data-target");
//             const targetSection = document.getElementById(targetId);
//             if (targetSection) {
//                 window.scrollTo({
//                     top: targetSection.offsetTop - 50, // Adjust for header height if necessary
//                     behavior: "smooth"
//                 });
//             }
//         });
//     });

//     // Highlight menu item based on scroll position
//     function updateActiveMenu() {
//         let scrollPosition = window.scrollY + 100; // Offset for accurate detection
//         sections.forEach(section => {
//             const sectionTop = section.offsetTop;
//             const sectionHeight = section.offsetHeight;
//             const sectionId = section.getAttribute("id");

//             if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
//                 menuItems.forEach(item => {
//                     item.classList.remove("active");
//                     if (item.getAttribute("data-target") === sectionId) {
//                         item.classList.add("active");
//                     }
//                 });
//             }
//         });
//     }

//     // Event listener for scrolling
//     window.addEventListener("scroll", updateActiveMenu);

//     // Theme toggle
//     const lightBtn = document.getElementById("light-mode");
//   const darkBtn = document.getElementById("dark-mode");

//   function setTheme(mode) {
//     if (mode === "dark") {
//       body.classList.add("dark-mode");
//       body.classList.remove("light-mode");
//       localStorage.setItem("theme", "dark");
//     } else {
//       body.classList.add("light-mode");
//       body.classList.remove("dark-mode");
//       localStorage.setItem("theme", "light");
//     }
//   }

//   // Check saved theme
//   const savedTheme = localStorage.getItem("theme") || "light";
//   setTheme(savedTheme);

//   // Toggle listeners
//   lightBtn.addEventListener("click", () => setTheme("light"));
//   darkBtn.addEventListener("click", () => setTheme("dark"));
// });



// // SCROLL REVEAL
// // Reference: https://css-tricks.com/scroll-triggered-animation-vanilla-javascript/
// function scrollTrigger(selector, options = {}){
//     let els = document.querySelectorAll(selector)
//     els = Array.from(els)
//     els.forEach(el => {
//         addObserver(el, options)
//     })
// }

// // function scrollTriggerJS(selector, options = {}) {
// //     let els = document.querySelectorAll(selector);
// //     els = Array.from(els).filter(el => !el.dataset.revealed);

// //     let observer = new IntersectionObserver((entries, obs) => {
// //         entries.forEach(entry => {
// //             if (entry.isIntersecting) {
// //                 let el = entry.target;
// //                 animateReveal(el);
// //                 el.dataset.revealed = "true"; // mark so we don't repeat
// //                 obs.unobserve(el);
// //             }
// //         });
// //     }, options);

// //     els.forEach(el => observer.observe(el));
// // }
// function scrollTriggerJS(selector, options = {}) {
//     let els = Array.from(document.querySelectorAll(selector))
//         .filter(el => !el.dataset.revealed);

//     let observer = new IntersectionObserver((entries, obs) => {
//         let delay = 0;

//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const el = entry.target;

//                 // 🕒 staggered delay
//                 setTimeout(() => {
//                     animateReveal(el);
//                     el.dataset.revealed = "true";
//                 }, delay);

//                 delay += 100;
//                 obs.unobserve(el);
//             }
//         });
//     }, options);

//     els.forEach(el => observer.observe(el));
// }


// function animateReveal(el, duration = 750, translateY = 150) {
//     const start = performance.now();

//     function animate(time) {
//         const progress = Math.min((time - start) / duration, 1);
//         const ease = 1 - Math.pow(1 - progress, 3);

//         el.style.opacity = ease;
//         el.style.transform = `translateY(${(1 - ease) * translateY}px)`;

//         if (progress < 1) {
//             requestAnimationFrame(animate);
//         }
//     }

//     requestAnimationFrame(animate);
// }


// function addObserver(el, options){
//     if(!('IntersectionObserver' in window)){
//         if(options.cb){
//             options.cb(el)
//         }else{
//             entry.target.classList.remove('inactive')
//         }
//         return
//     }
//     let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
//         entries.forEach(entry => {
//             if(entry.isIntersecting){
//                 if(options.cb){
//                     options.cb(el)
//                 }else{
//                     entry.target.classList.remove('inactive')
//                 }
//                 observer.unobserve(entry.target)
//             }
//         })
//     }, options)
//     observer.observe(el)
// }

// // scrollTrigger('.scroll-reveal', {
// //     rootMargin: '0px', // shift the boundaries of the viewport that we consider for triggering the reveal
// // })
// // document.addEventListener("DOMContentLoaded", () => {
// //     scrollTriggerJS('.scroll-reveal', { rootMargin: '0px' });

// //     const papers = document.getElementById("papers");
// //     const seemorepapers = document.getElementById("see-more-papers");

// //     seemorepapers.addEventListener("click", () => {
// //         papers.classList.toggle("active");
// //         seemorepapers.classList.toggle("active");

// //         document.querySelector("#see-more-papers span").textContent =
// //             papers.classList.contains("active") ? "See Less" : "See More";

// //         // Wait for layout update
// //         requestAnimationFrame(() => {
// //             scrollTriggerJS('.scroll-reveal', { rootMargin: '0px' });
// //         });
// //     });
// // });

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

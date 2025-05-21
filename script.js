document.addEventListener("DOMContentLoaded", function() {
    const imageGallery = document.querySelector(".flexbox-image-gallery");
    const body = document.body;
    
    // const listItems = document.querySelectorAll(".hidden-galleries li");
    // listItems.forEach(item => {
    //     item.addEventListener("mouseenter", () => {
    //         var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    //         console.log(vw)
    //         if (vw > 767) {
    //             const images = JSON.parse(item.getAttribute("data-images"));
    //             body.classList.add("no-backgrounds");
    
    //             images.forEach((imgId, index) => {
    //                 const imgElement = document.getElementById(imgId);
    //                 imgElement.classList.add("visible");
    //             });
    //         }
    //     });

    //     item.addEventListener("mouseleave", () => {
    //         // Fade out images
    //         const images = document.querySelectorAll(".flexbox-image-gallery .visible");
    //         images.forEach((img, index) => {
    //             setTimeout(() => {
    //                 img.classList.remove("visible"); // Start fade-out
    //             }, index * 100);
    //         });
    //         body.classList.remove("no-backgrounds");
    //     });
    // });

    // display data source in menu
    const allItems = document.querySelectorAll(".list ul li");
    const menu = document.getElementById("menu");
    const menuspan = menu.querySelector(".source span");
    allItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const t = item.getAttribute("data-source");
            if (t) {
                menu.classList.add("highlight");
                menuspan.innerHTML = t;
            }
        });        
        item.addEventListener("mouseleave", () => {
            if (menu.classList.contains("highlight")) {
                menu.classList.remove("highlight");
                menuspan.innerHTML = "";
            }
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
            if (menu.classList.contains("highlight")) {
                menu.classList.remove("highlight");
                menuspan.innerHTML = "";
            }
        });        
    });

    const papers = document.getElementById("papers")
    const seemorepapers = document.getElementById("see-more-papers")
    seemorepapers.addEventListener('click', function() {
        if (papers.classList.contains("active")) {
            papers.classList.remove("active");
            seemorepapers.classList.remove("active");
            document.querySelector("#see-more-papers span").textContent = "See More"
        }
        else {
            papers.classList.add("active");
            seemorepapers.classList.add("active");
            document.querySelector("#see-more-papers span").textContent = "See Less";
        };
    });


    // menu highlighting
    const menuItems = document.querySelectorAll(".menu ul.filter li");
    const sections = document.querySelectorAll("section.content");

    // Smooth scrolling when clicking a menu item
    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const targetId = item.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust for header height if necessary
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight menu item based on scroll position
    function updateActiveMenu() {
        let scrollPosition = window.scrollY + 100; // Offset for accurate detection
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("data-target") === sectionId) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    // Event listener for scrolling
    window.addEventListener("scroll", updateActiveMenu);

    // Theme toggle
    const lightBtn = document.getElementById("light-mode");
  const darkBtn = document.getElementById("dark-mode");

  function setTheme(mode) {
    if (mode === "dark") {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }

  // Check saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Toggle listeners
  lightBtn.addEventListener("click", () => setTheme("light"));
  darkBtn.addEventListener("click", () => setTheme("dark"));
});



// SCROLL REVEAL
// Reference: https://css-tricks.com/scroll-triggered-animation-vanilla-javascript/
function scrollTrigger(selector, options = {}){
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
        addObserver(el, options)
    })
}

function addObserver(el, options){
    if(!('IntersectionObserver' in window)){
        if(options.cb){
            options.cb(el)
        }else{
            entry.target.classList.add('active')
        }
        return
    }
    let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(options.cb){
                    options.cb(el)
                }else{
                    entry.target.classList.add('active')
                }
                observer.unobserve(entry.target)
            }
        })
    }, options)
    observer.observe(el)
}

scrollTrigger('.scroll-reveal', {
    rootMargin: '0px', // shift the boundaries of the viewport that we consider for triggering the reveal
})
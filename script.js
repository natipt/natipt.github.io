document.addEventListener("DOMContentLoaded", function() {
    // // Array of image paths
    // const images = [
    //     "media/IMG_3931.png",
    //     "media/IMG_6998.JPG",
    //     "media/IMG_6161.png",
    //     "media/IMG_4428.PNG",
    //     "media/IMG_3955 2.png"
    // ];

    // // Select a random image
    // const randomIndex = Math.floor(Math.random() * images.length);
    // const randomImage = images[randomIndex];

    // // Set the image source
    // document.querySelector(".header-image").src = randomImage;

    const imageGallery = document.querySelector(".flexbox-image-gallery");
    const listItems = document.querySelectorAll(".hidden-galleries li");
    const body = document.body;

    listItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            console.log("hovered");
            const images = JSON.parse(item.getAttribute("data-images"));
            console.log(images)
            body.classList.add("no-backgrounds");

            images.forEach((imgId, index) => {
                const imgElement = document.getElementById(imgId);
                console.log("got image by id?")
                console.log(imgId)
                console.log(imgElement.classList)
                imgElement.classList.add("visible");
            });
        });

        item.addEventListener("mouseleave", () => {
            // Fade out images
            const images = document.querySelectorAll(".flexbox-image-gallery .visible");
            console.log("unhovered")
            images.forEach((img, index) => {
                setTimeout(() => {
                    img.classList.remove("visible"); // Start fade-out
                }, index * 100);
            });
            body.classList.remove("no-backgrounds");
        });
    });

    const allItems = document.querySelectorAll(".list ul li");
    const menu = document.getElementById("menu");
    const menuspan = menu.querySelector(".source span");
    allItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const t = item.getAttribute("data-source");
            menu.classList.add("highlight");
            menuspan.innerHTML = t;
        });
        item.addEventListener("mouseleave", () => {
            menu.classList.remove("highlight");
            menuspan.innerHTML = "";
        });
    });
});


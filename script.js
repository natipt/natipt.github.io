document.addEventListener("DOMContentLoaded", () => {
    const backgroundContainer = document.querySelector(".background-container");
    const backgroundCover = document.querySelector(".background-cover");
    const listItems = document.querySelectorAll(".hidden-gallery");
    const body = document.body;

    listItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            console.log("hovered");
            const images = JSON.parse(item.getAttribute("data-images"));
            
            // Clear previous tiles
            backgroundContainer.innerHTML = "";

            // Add class to body
            body.classList.add("background-gallery-active");
            body.classList.add("text-white");
            
            // Make background visible
            backgroundContainer.style.opacity = "1";
            backgroundCover.style.opacity="0.1";

            images.forEach((imgSrc, index) => {
                const imgElement = document.createElement("img");
                imgElement.src = imgSrc;
                imgElement.classList.add("background-gallery-image");

                // Delay the fade-in effect for a staggered appearance
                // Stagger effect every 200ms
                // setTimeout(() => {
                imgElement.classList.add("visible");
                // }, index * 200); 

                backgroundContainer.appendChild(imgElement);
            });
        });

        item.addEventListener("mouseleave", () => {
            backgroundContainer.style.opacity = "0";
            backgroundCover.style.opacity="1";
            body.classList.remove("text-white");

            // Remove class from body
            body.classList.remove("dark");
            setTimeout(() => {
                backgroundContainer.innerHTML = ""; // Remove images after fading out
                // Remove class from body
                body.classList.remove("background-gallery-active");
            }, 500);
        });
    });
});

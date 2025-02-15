document.addEventListener("DOMContentLoaded", function() {
    // Array of image paths
    const images = [
        "media/IMG_3931.png",
        "media/IMG_6998.JPG",
        "media/IMG_6161.png",
        "media/IMG_4428.PNG",
        "media/IMG_3955 2.png"
    ];

    // Select a random image
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    // Set the image source
    document.querySelector(".header-image").src = randomImage;
});


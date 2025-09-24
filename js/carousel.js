document.addEventListener('DOMContentLoaded', () => {
    // Select all carousel components on the page
    const carousels = document.querySelectorAll('.project-carousel');

    carousels.forEach(carousel => {
        const imageContainer = carousel.querySelector('.carousel-images');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        
        // Get all images within this specific carousel
        const images = imageContainer.querySelectorAll('img');
        const imageCount = images.length;
        let currentIndex = 0;

        // Function to show the correct image by transforming the container
        function showImage(index) {
            const offset = -index * 100; // Calculate percentage to slide
            imageContainer.style.transform = `translateX(${offset}%)`;
        }

        // Event listener for the "next" button
        nextButton.addEventListener('click', () => {
            // If at the last image, wrap around to the first, otherwise go to the next
            currentIndex = (currentIndex + 1) % imageCount;
            showImage(currentIndex);
        });

        // Event listener for the "previous" button
        prevButton.addEventListener('click', () => {
            // If at the first image, wrap around to the last, otherwise go to the previous
            currentIndex = (currentIndex - 1 + imageCount) % imageCount;
            showImage(currentIndex);
        });

        // Initialize the first image position
        showImage(currentIndex);
    });
});
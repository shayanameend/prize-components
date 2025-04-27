// Creates an image carousel with navigation and indicators
function createCarousel({
  images,
  altText = "Image",
  showBadge = false,
  badgeText = "",
  badgeIcon = "",
  badgeClass = "",
}) {
  const imageContainer = document.createElement("div");
  imageContainer.className = "carousel-image-container responsive-carousel";

  // Badge
  if (showBadge) {
    const badge = document.createElement("span");
    badge.className = `carousel-badge ${badgeClass}`;
    badge.innerHTML = badgeIcon
      ? `<i class="${badgeIcon}"></i> ${badgeText}`
      : badgeText;
    imageContainer.appendChild(badge);
  }

  // Navigation
  const prevButton = document.createElement("div");
  prevButton.className = "carousel-nav nav-prev";
  prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  imageContainer.appendChild(prevButton);

  const nextButton = document.createElement("div");
  nextButton.className = "carousel-nav nav-next";
  nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  imageContainer.appendChild(nextButton);
  images.forEach((imgSrc, index) => {
    const img = document.createElement("img");

    // Simplified initial class assignment
    img.className = "carousel-image";
    if (index === 0) {
      img.classList.add("active");
    } else {
      img.classList.add("next"); // All non-first images start as 'next'
    }

    img.src = imgSrc;
    img.alt = `${altText} - ${index + 1}`;
    img.dataset.index = index;

    img.onload = function () {
      if (index === 0) {
        img.style.opacity = "1";
      }

      // Calculate and store the natural aspect ratio of the image
      const aspectRatio = this.naturalWidth / this.naturalHeight;
      img.dataset.aspectRatio = aspectRatio.toFixed(2);

      // Add class based on image orientation
      if (aspectRatio > 1.2) {
        img.classList.add("landscape");
      } else if (aspectRatio < 0.8) {
        img.classList.add("portrait");
      } else {
        img.classList.add("square");
      }
    };

    imageContainer.appendChild(img);
  });

  // Indicators
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "carousel-dots";

  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  imageContainer.appendChild(dotsContainer);

  let currentIndex = 0;
  const carouselImages = imageContainer.querySelectorAll(".carousel-image");
  const dots = dotsContainer.querySelectorAll(".dot");

  function showImage(index, direction = null) {
    if (index === currentIndex) return;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");

    if (direction) {
      const newImage = carouselImages[index];
      const currentImage = carouselImages[currentIndex];

      newImage.classList.remove(
        "slide-in-from-left",
        "slide-in-from-right",
        "slide-out-to-left",
        "slide-out-to-right",
        "prev",
        "next"
      );

      if (direction === "next") {
        newImage.classList.add("next");
      } else if (direction === "prev") {
        newImage.classList.add("prev");
      }

      // Force a reflow to ensure the browser recognizes the position change
      void newImage.offsetWidth;

      if (direction === "next") {
        newImage.classList.add("active");
        currentImage.classList.add("slide-out-to-left");
        newImage.classList.add("slide-in-from-right");
      } else if (direction === "prev") {
        newImage.classList.add("active");
        currentImage.classList.add("slide-out-to-right");
        newImage.classList.add("slide-in-from-left");
      }

      setTimeout(() => {
        carouselImages.forEach((img) => {
          img.classList.remove(
            "slide-in-from-left",
            "slide-in-from-right",
            "slide-out-to-left",
            "slide-out-to-right"
          );

          const imgIndex = parseInt(img.dataset.index);
          img.classList.remove("active", "prev", "next");

          if (imgIndex === index) {
            img.classList.add("active");
          } else if (imgIndex < index) {
            img.classList.add("prev");
          } else {
            img.classList.add("next");
          }
        });
      }, 400);
    } else {
      carouselImages.forEach((img) => {
        img.classList.remove(
          "active",
          "prev",
          "next",
          "slide-in-from-left",
          "slide-in-from-right",
          "slide-out-to-left",
          "slide-out-to-right"
        );

        const imgIndex = parseInt(img.dataset.index);
        if (imgIndex === index) {
          img.classList.add("active");
        } else if (imgIndex < index) {
          img.classList.add("prev");
        } else {
          img.classList.add("next");
        }
      });
    }

    currentIndex = index;

    // Update aspect ratio based on the new active image
    const activeImage = carouselImages[index];
    if (activeImage && activeImage.dataset.aspectRatio) {
      // Call the resize handler to adjust the container aspect ratio
      handleResize();
    }
  }

  prevButton.addEventListener("click", () => {
    const newIndex =
      (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(newIndex, "prev");
  });

  nextButton.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % carouselImages.length;
    showImage(newIndex, "next");
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      // Determine direction based on index
      let direction = null;
      if (index > currentIndex) {
        direction = "next";
      } else if (index < currentIndex) {
        direction = "prev";
      }
      showImage(index, direction);
    });
  });

  // Handle window resize for better responsive behavior
  const handleResize = () => {
    // Get the current active image
    const activeImage = imageContainer.querySelector(".carousel-image.active");
    if (activeImage && activeImage.dataset.aspectRatio) {
      const aspectRatio = parseFloat(activeImage.dataset.aspectRatio);

      // Adjust container aspect ratio based on screen width and image orientation
      if (window.innerWidth <= 360) {
        // Very small mobile screens - use 4:3 for all images
        imageContainer.style.aspectRatio = "4 / 3";
      } else if (window.innerWidth <= 480) {
        // Mobile view - maintain 16:9 for better viewing
        imageContainer.style.aspectRatio = "16 / 9";
      } else if (window.innerWidth <= 768) {
        // Tablet view - adjust based on image orientation
        if (aspectRatio > 1.2) {
          // Landscape
          imageContainer.style.aspectRatio = "16 / 9";
        } else if (aspectRatio < 0.8) {
          // Portrait
          imageContainer.style.aspectRatio = "4 / 3";
        } else {
          // Square-ish
          imageContainer.style.aspectRatio = "4 / 3";
        }
      } else {
        // Desktop view - closer to original aspect ratio
        if (aspectRatio > 1.5) {
          // Very wide landscape
          imageContainer.style.aspectRatio = "16 / 9";
        } else if (aspectRatio > 1) {
          // Moderate landscape
          imageContainer.style.aspectRatio = "16 / 10";
        } else if (aspectRatio < 0.7) {
          // Tall portrait
          imageContainer.style.aspectRatio = "4 / 3";
        } else {
          // Square-ish or moderate portrait
          imageContainer.style.aspectRatio = "4 / 3";
        }
      }
    }
  };

  // Initial resize handling
  handleResize();

  // Add resize event listener
  window.addEventListener("resize", handleResize);

  // Add touch support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  imageContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  imageContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance required for a swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - show next image
      const newIndex = (currentIndex + 1) % carouselImages.length;
      showImage(newIndex, "next");
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - show previous image
      const newIndex =
        (currentIndex - 1 + carouselImages.length) % carouselImages.length;
      showImage(newIndex, "prev");
    }
  }

  return imageContainer;
}

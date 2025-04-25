// Creates an image carousel with navigation and indicators
function createCarousel({
  container,
  images,
  altText = 'Image',
  showBadge = false,
  badgeText = '',
  badgeIcon = '',
  badgeClass = ''
}) {
  const imageContainer = document.createElement("div");
  imageContainer.className = "carousel-image-container";

  // Badge
  if (showBadge) {
    const badge = document.createElement("span");
    badge.className = `carousel-badge ${badgeClass}`;
    badge.innerHTML = badgeIcon ? `<i class="${badgeIcon}"></i> ${badgeText}` : badgeText;
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

    if (index === 0) {
      img.className = "carousel-image active";
    } else if (index > 0) {
      img.className = "carousel-image next";
    } else {
      img.className = "carousel-image prev";
    }

    img.src = imgSrc;
    img.alt = `${altText} - ${index + 1}`;
    img.dataset.index = index;

    img.onload = function() {
      if (index === 0) {
        img.style.opacity = "1";
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

  if (container) {
    container.appendChild(imageContainer);
  }
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

      newImage.classList.remove('slide-in-from-left', 'slide-in-from-right', 'slide-out-to-left', 'slide-out-to-right', 'prev', 'next');

      if (direction === 'next') {
        newImage.classList.add('next');
      } else if (direction === 'prev') {
        newImage.classList.add('prev');
      }

      // Force a reflow to ensure the browser recognizes the position change
      void newImage.offsetWidth;

      if (direction === 'next') {
        newImage.classList.add('active');
        currentImage.classList.add('slide-out-to-left');
        newImage.classList.add('slide-in-from-right');
      } else if (direction === 'prev') {
        newImage.classList.add('active');
        currentImage.classList.add('slide-out-to-right');
        newImage.classList.add('slide-in-from-left');
      }

      setTimeout(() => {
        carouselImages.forEach((img) => {
          img.classList.remove('slide-in-from-left', 'slide-in-from-right', 'slide-out-to-left', 'slide-out-to-right');

          const imgIndex = parseInt(img.dataset.index);
          img.classList.remove('active', 'prev', 'next');

          if (imgIndex === index) {
            img.classList.add('active');
          } else if (imgIndex < index) {
            img.classList.add('prev');
          } else {
            img.classList.add('next');
          }
        });
      }, 400);
    } else {
      carouselImages.forEach((img) => {
        img.classList.remove('active', 'prev', 'next', 'slide-in-from-left', 'slide-in-from-right', 'slide-out-to-left', 'slide-out-to-right');

        const imgIndex = parseInt(img.dataset.index);
        if (imgIndex === index) {
          img.classList.add('active');
        } else if (imgIndex < index) {
          img.classList.add('prev');
        } else {
          img.classList.add('next');
        }
      });
    }

    currentIndex = index;
  }

  prevButton.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(newIndex, 'prev');
  });

  nextButton.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % carouselImages.length;
    showImage(newIndex, 'next');
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      // Determine direction based on index
      let direction = null;
      if (index > currentIndex) {
        direction = 'next';
      } else if (index < currentIndex) {
        direction = 'prev';
      }
      showImage(index, direction);
    });
  });

  return imageContainer;
}

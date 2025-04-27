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

  if (showBadge) {
    const badge = document.createElement("span");
    badge.className = `carousel-badge ${badgeClass}`;
    badge.innerHTML = badgeIcon
      ? `<i class="${badgeIcon}"></i> ${badgeText}`
      : badgeText;
    imageContainer.appendChild(badge);
  }

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

    img.className = "carousel-image";
    if (index === 0) {
      img.classList.add("active");
    } else {
      img.classList.add("next");
    }

    img.src = imgSrc;
    img.alt = `${altText} - ${index + 1}`;
    img.dataset.index = index;

    img.onload = function () {
      if (index === 0) {
        img.style.opacity = "1";
      }
    };

    imageContainer.appendChild(img);
  });

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
      let direction = null;
      if (index > currentIndex) {
        direction = "next";
      } else if (index < currentIndex) {
        direction = "prev";
      }
      showImage(index, direction);
    });
  });

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
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      const newIndex = (currentIndex + 1) % carouselImages.length;
      showImage(newIndex, "next");
    } else if (touchEndX > touchStartX + swipeThreshold) {
      const newIndex =
        (currentIndex - 1 + carouselImages.length) % carouselImages.length;
      showImage(newIndex, "prev");
    }
  }

  return imageContainer;
}

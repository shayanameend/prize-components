function createCarousel({
  images,
  altText = "Image",
  showBadge = false,
  badgeText = "",
  badgeIcon = "",
  badgeClass = "",
}) {
  const imageContainer = document.createElement("div");
  imageContainer.className =
    "ca-carousel-image-container ca-responsive-carousel";

  if (showBadge) {
    const badge = document.createElement("span");
    badge.className = `ca-carousel-badge ${badgeClass}`;
    badge.innerHTML = badgeIcon
      ? `<i class="${badgeIcon}"></i> ${badgeText}`
      : badgeText;
    imageContainer.appendChild(badge);
  }

  const prevButton = document.createElement("div");
  prevButton.className = "ca-carousel-nav ca-nav-prev";
  prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  imageContainer.appendChild(prevButton);

  const nextButton = document.createElement("div");
  nextButton.className = "ca-carousel-nav ca-nav-next";
  nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  imageContainer.appendChild(nextButton);

  images.forEach((imgSrc, index) => {
    const img = document.createElement("img");

    img.className = "ca-carousel-image";
    if (index === 0) {
      img.classList.add("ca-active");
    } else {
      img.classList.add("ca-next");
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
  dotsContainer.className = "ca-carousel-dots";

  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `ca-dot ${index === 0 ? "ca-active" : ""}`;
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  imageContainer.appendChild(dotsContainer);

  let currentIndex = 0;
  const carouselImages = imageContainer.querySelectorAll(".ca-carousel-image");
  const dots = dotsContainer.querySelectorAll(".ca-dot");

  function showImage(index, direction = null) {
    if (index === currentIndex) return;

    dots.forEach((dot) => dot.classList.remove("ca-active"));
    dots[index].classList.add("ca-active");

    if (direction) {
      const newImage = carouselImages[index];
      const currentImage = carouselImages[currentIndex];

      newImage.classList.remove(
        "ca-slide-in-from-left",
        "ca-slide-in-from-right",
        "ca-slide-out-to-left",
        "ca-slide-out-to-right",
        "ca-prev",
        "ca-next"
      );

      if (direction === "next") {
        newImage.classList.add("ca-next");
      } else if (direction === "prev") {
        newImage.classList.add("ca-prev");
      }
      void newImage.offsetWidth;

      if (direction === "next") {
        newImage.classList.add("ca-active");
        currentImage.classList.add("ca-slide-out-to-left");
        newImage.classList.add("ca-slide-in-from-right");
      } else if (direction === "prev") {
        newImage.classList.add("ca-active");
        currentImage.classList.add("ca-slide-out-to-right");
        newImage.classList.add("ca-slide-in-from-left");
      }

      setTimeout(() => {
        carouselImages.forEach((img) => {
          img.classList.remove(
            "ca-slide-in-from-left",
            "ca-slide-in-from-right",
            "ca-slide-out-to-left",
            "ca-slide-out-to-right"
          );

          const imgIndex = parseInt(img.dataset.index);
          img.classList.remove("ca-active", "ca-prev", "ca-next");

          if (imgIndex === index) {
            img.classList.add("ca-active");
          } else if (imgIndex < index) {
            img.classList.add("ca-prev");
          } else {
            img.classList.add("ca-next");
          }
        });
      }, 400);
    } else {
      carouselImages.forEach((img) => {
        img.classList.remove(
          "ca-active",
          "ca-prev",
          "ca-next",
          "ca-slide-in-from-left",
          "ca-slide-in-from-right",
          "ca-slide-out-to-left",
          "ca-slide-out-to-right"
        );

        const imgIndex = parseInt(img.dataset.index);
        if (imgIndex === index) {
          img.classList.add("ca-active");
        } else if (imgIndex < index) {
          img.classList.add("ca-prev");
        } else {
          img.classList.add("ca-next");
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

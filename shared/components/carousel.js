/**
 * Creates an image carousel with navigation and indicators
 */
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
    img.className = "carousel-image";
    img.src = imgSrc;
    img.alt = `${altText} - ${index + 1}`;
    img.style.display = index === 0 ? "block" : "none";
    img.dataset.index = index;
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

  function showImage(index) {
    carouselImages.forEach((img) => (img.style.display = "none"));
    dots.forEach((dot) => dot.classList.remove("active"));

    carouselImages[index].style.display = "block";
    dots[index].classList.add("active");
    currentIndex = index;
  }

  prevButton.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(newIndex);
  });

  nextButton.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % carouselImages.length;
    showImage(newIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      showImage(index);
    });
  });

  return imageContainer;
}

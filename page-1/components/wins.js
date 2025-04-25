function loadWins({ container, data }) {
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  sortedData.forEach((win) => {
    let winCard;

    if (win.type === "main") {
      winCard = createMainPrizeCard(win);
    } else {
      winCard = createRegularWinCard(win);
    }

    container.appendChild(winCard);
  });
}

function formatDate(date, longFormat = false) {
  if (longFormat) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

function createRegularWinCard(win) {
  const card = document.createElement("div");
  card.className = "win-card card";

  const typeCol = document.createElement("div");
  typeCol.className = "win-type";

  const typeLabel = document.createElement("div");
  typeLabel.className = "win-label";
  typeLabel.textContent = "Win Type";
  typeCol.appendChild(typeLabel);

  const typeValue = document.createElement("div");
  typeValue.className = "win-value";

  if (win.type === "mini") {
    const badge = document.createElement("span");
    badge.className = "win-badge badge-mini";
    badge.innerHTML = '<i class="fa-solid fa-gift"></i> Mini Prize';
    typeValue.appendChild(badge);
  } else {
    typeValue.textContent = "Incentive Prize";
  }

  typeCol.appendChild(typeValue);
  card.appendChild(typeCol);

  const dateCol = document.createElement("div");
  dateCol.className = "win-date";

  const dateLabel = document.createElement("div");
  dateLabel.className = "win-label";
  dateLabel.textContent = "Date";
  dateCol.appendChild(dateLabel);

  const dateValue = document.createElement("div");
  dateValue.className = "win-value";
  dateValue.textContent = formatDate(win.date);
  dateCol.appendChild(dateValue);

  card.appendChild(dateCol);

  const prizeCol = document.createElement("div");
  prizeCol.className = "win-prize";

  const prizeLabel = document.createElement("div");
  prizeLabel.className = "win-label";
  prizeLabel.textContent = "Prize Won";
  prizeCol.appendChild(prizeLabel);

  const prizeValue = document.createElement("div");
  prizeValue.className = "win-value";
  prizeValue.textContent = win.title;
  prizeCol.appendChild(prizeValue);

  card.appendChild(prizeCol);

  const imageCol = document.createElement("div");
  imageCol.className = "win-image-container";

  const image = document.createElement("img");
  image.className = "win-image";
  image.src = win.image;
  image.alt = win.title;
  imageCol.appendChild(image);

  card.appendChild(imageCol);

  return card;
}

function createMainPrizeCard(win) {
  const card = document.createElement("div");
  card.className = "main-prize-card card";

  const imageContainer = document.createElement("div");
  imageContainer.className = "main-prize-image-container";

  const badge = document.createElement("span");
  badge.className = "win-badge badge-main main-prize-badge";
  badge.innerHTML = '<i class="fa-solid fa-trophy"></i> Main Prize';
  imageContainer.appendChild(badge);

  const prevButton = document.createElement("div");
  prevButton.className = "main-prize-nav nav-prev";
  prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  imageContainer.appendChild(prevButton);

  const nextButton = document.createElement("div");
  nextButton.className = "main-prize-nav nav-next";
  nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  imageContainer.appendChild(nextButton);

  win.images.forEach((imgSrc, index) => {
    const img = document.createElement("img");
    img.className = "main-prize-image";
    img.src = imgSrc;
    img.alt = `${win.title} - Image ${index + 1}`;
    img.style.display = index === 0 ? "block" : "none";
    img.dataset.index = index;
    imageContainer.appendChild(img);
  });

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "main-prize-dots";

  win.images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  imageContainer.appendChild(dotsContainer);
  card.appendChild(imageContainer);

  const infoSection = document.createElement("div");
  infoSection.className = "main-prize-info";

  const titleContainer = document.createElement("div");

  const subtitle = document.createElement("div");
  subtitle.className = "main-prize-subtitle";
  subtitle.textContent = win.subtitle;
  titleContainer.appendChild(subtitle);

  const title = document.createElement("div");
  title.className = "main-prize-title";
  title.textContent = win.title;
  titleContainer.appendChild(title);

  infoSection.appendChild(titleContainer);

  const dateContainer = document.createElement("div");
  dateContainer.className = "main-prize-date";
  dateContainer.textContent = `Selected ${formatDate(win.date, true)}`;
  infoSection.appendChild(dateContainer);

  card.appendChild(infoSection);

  let currentIndex = 0;
  const images = imageContainer.querySelectorAll(".main-prize-image");
  const dots = dotsContainer.querySelectorAll(".dot");

  function showImage(index) {
    images.forEach((img) => (img.style.display = "none"));
    dots.forEach((dot) => dot.classList.remove("active"));

    images[index].style.display = "block";
    dots[index].classList.add("active");
    currentIndex = index;
  }

  prevButton.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(newIndex);
  });

  nextButton.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % images.length;
    showImage(newIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      showImage(index);
    });
  });

  return card;
}

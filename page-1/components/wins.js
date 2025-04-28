function loadWins({ container, data }) {
  data.forEach((win) => {
    let winCard;

    if (win.type === "main") {
      winCard = createMainPrizeCard(win);
    } else {
      winCard = createRegularWinCard(win);
    }

    container.appendChild(winCard);
  });
}

function createRegularWinCard(win) {
  const card = document.createElement("div");
  card.className = "ca-win-card ca-card";

  const typeCol = document.createElement("div");
  typeCol.className = "ca-win-type";

  const typeLabel = document.createElement("div");
  typeLabel.className = "ca-win-label";
  typeLabel.textContent = "Win Type";
  typeCol.appendChild(typeLabel);

  const typeValue = document.createElement("div");
  typeValue.className = "ca-win-value";

  if (win.type === "mini") {
    const badge = document.createElement("span");
    badge.className = "ca-win-badge ca-badge-mini";
    badge.innerHTML = '<i class="fa-solid fa-gift"></i> Mini Prize';
    typeValue.appendChild(badge);
  } else {
    typeValue.textContent = "Incentive Prize";
  }

  typeCol.appendChild(typeValue);
  card.appendChild(typeCol);

  const dateCol = document.createElement("div");
  dateCol.className = "ca-win-date";

  const dateLabel = document.createElement("div");
  dateLabel.className = "ca-win-label";
  dateLabel.textContent = "Date";
  dateCol.appendChild(dateLabel);

  const dateValue = document.createElement("div");
  dateValue.className = "ca-win-value";
  dateValue.textContent = formatDate(win.date);
  dateCol.appendChild(dateValue);

  card.appendChild(dateCol);

  const prizeCol = document.createElement("div");
  prizeCol.className = "ca-win-prize";

  const prizeLabel = document.createElement("div");
  prizeLabel.className = "ca-win-label";
  prizeLabel.textContent = "Prize Won";
  prizeCol.appendChild(prizeLabel);

  const prizeValue = document.createElement("div");
  prizeValue.className = "ca-win-value";
  prizeValue.textContent = win.title;
  prizeCol.appendChild(prizeValue);

  card.appendChild(prizeCol);

  const imageCol = document.createElement("div");
  imageCol.className = "ca-win-image-container";

  const image = document.createElement("img");
  image.className = "ca-win-image";
  image.src = win.image;
  image.alt = win.title;
  imageCol.appendChild(image);

  card.appendChild(imageCol);

  return card;
}

function createMainPrizeCard(win) {
  const card = document.createElement("div");
  card.className = "ca-main-prize-card ca-card";

  const imageContainer = createCarousel({
    images: win.images,
    altText: win.title,
    showBadge: true,
    badgeText: "Main Prize",
    badgeIcon: "fa-solid fa-trophy",
    badgeClass: "ca-badge-main",
  });

  imageContainer.classList.add("ca-main-prize-image-container");

  const dateContainer = document.createElement("div");
  dateContainer.className = "ca-main-prize-date";
  dateContainer.textContent = `Selected ${formatDate(win.date, true)}`;

  const titleContainer = document.createElement("div");
  titleContainer.className = "ca-main-prize-title-container";

  const subtitle = document.createElement("div");
  subtitle.className = "ca-main-prize-subtitle";
  subtitle.textContent = win.subtitle;
  titleContainer.appendChild(subtitle);

  const title = document.createElement("div");
  title.className = "ca-main-prize-title";
  title.textContent = win.title;
  titleContainer.appendChild(title);

  const infoSection = document.createElement("div");
  infoSection.className = "ca-main-prize-info";

  const mobileLayout = document.createElement("div");
  mobileLayout.className = "ca-main-prize-mobile-layout";

  const mobileDateContainer = document.createElement("div");
  mobileDateContainer.className = "ca-main-prize-date";
  mobileDateContainer.textContent = `Selected ${formatDate(win.date, true)}`;

  const mobileTitleContainer = document.createElement("div");
  mobileTitleContainer.className = "ca-main-prize-title-container";

  const mobileSubtitle = document.createElement("div");
  mobileSubtitle.className = "ca-main-prize-subtitle";
  mobileSubtitle.textContent = win.subtitle;
  mobileTitleContainer.appendChild(mobileSubtitle);

  const mobileTitle = document.createElement("div");
  mobileTitle.className = "ca-main-prize-title";
  mobileTitle.textContent = win.title;
  mobileTitleContainer.appendChild(mobileTitle);

  mobileLayout.appendChild(mobileDateContainer);
  mobileLayout.appendChild(mobileTitleContainer);

  const desktopLayout = document.createElement("div");
  desktopLayout.className = "ca-main-prize-desktop-layout";
  desktopLayout.appendChild(dateContainer);
  desktopLayout.appendChild(titleContainer);

  card.appendChild(imageContainer);
  card.appendChild(mobileLayout);
  card.appendChild(desktopLayout);

  return card;
}

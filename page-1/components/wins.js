function loadWins({ container, data }) {
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
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

  const imageContainer = createCarousel({
    images: win.images,
    altText: win.title,
    showBadge: true,
    badgeText: "Main Prize",
    badgeIcon: "fa-solid fa-trophy",
    badgeClass: "badge-main",
  });

  imageContainer.classList.add("main-prize-image-container");

  // Create date container before info section
  const dateContainer = document.createElement("div");
  dateContainer.className = "main-prize-date";
  dateContainer.textContent = `Selected ${formatDate(win.date, true)}`;

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

  // Append elements in the new order: image, date, info
  card.appendChild(imageContainer);
  card.appendChild(dateContainer); // Append date after image
  card.appendChild(infoSection); // Append info section last

  return card;
}

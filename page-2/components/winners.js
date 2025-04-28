function loadWinners({ container, data }) {
  const heading = document.createElement("h2");
  heading.className = "ca-winners-heading";
  heading.textContent = "All Winners";
  container.appendChild(heading);

  const winnersTable = document.createElement("div");
  winnersTable.className = "ca-winners-table";

  const winnersHeader = document.createElement("div");
  winnersHeader.className = "ca-winners-header";
  const headerCells = [
    { className: "ca-user-cell", text: "User" },
    { className: "ca-country-cell", text: "Country" },
    { className: "ca-win-type-cell", text: "Win Type" },
    { className: "ca-date-cell", text: "Date" },
    { className: "ca-prize-cell", text: "Prize Won" },
  ];

  headerCells.forEach((cell) => {
    const headerCell = document.createElement("div");
    headerCell.className = `ca-header-cell ${cell.className}`;
    headerCell.textContent = cell.text;
    winnersHeader.appendChild(headerCell);
  });

  winnersTable.appendChild(winnersHeader);

  const winnersList = document.createElement("div");
  winnersList.id = "ca-winners-list";
  winnersTable.appendChild(winnersList);

  container.appendChild(winnersTable);
  populateWinnersList({
    container: winnersList,
    data: data,
  });
}

function populateWinnersList({ container, data }) {
  data.forEach((winner) => {
    let winnerRow;

    if (winner.type === "main") {
      winnerRow = createMainPrizeRow(winner);
    } else {
      winnerRow = createRegularWinnerRow(winner);
    }

    container.appendChild(winnerRow);
  });
}

function createRegularWinnerRow(winner) {
  const row = document.createElement("div");
  row.className = "ca-winner-row ca-card";

  const userCell = document.createElement("div");
  userCell.className = "ca-winner-cell ca-user-cell";
  userCell.setAttribute("data-label", "User");

  const userInfo = document.createElement("div");
  userInfo.className = "ca-user-info";

  const userPhoto = document.createElement("img");
  userPhoto.className = "ca-user-photo";
  userPhoto.src = winner.photo;
  userPhoto.alt = `${winner.name}'s photo`;
  userInfo.appendChild(userPhoto);

  const nameCountryWrapper = document.createElement("div");
  nameCountryWrapper.className = "ca-user-name-country-wrapper";

  const userName = document.createElement("div");
  userName.className = "ca-user-name";
  userName.textContent = winner.name;
  nameCountryWrapper.appendChild(userName);

  const mobileCountryInfo = document.createElement("div");
  mobileCountryInfo.className = "ca-user-country-mobile";
  mobileCountryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;
  nameCountryWrapper.appendChild(mobileCountryInfo);

  userInfo.appendChild(nameCountryWrapper);

  userCell.appendChild(userInfo);
  row.appendChild(userCell);

  const countryCell = document.createElement("div");
  countryCell.className = "ca-winner-cell ca-country-cell";
  countryCell.setAttribute("data-label", "Country");

  const countryInfo = document.createElement("div");
  countryInfo.className = "ca-country-info";
  countryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;

  countryCell.appendChild(countryInfo);
  row.appendChild(countryCell);

  const typeCell = document.createElement("div");
  typeCell.className = "ca-winner-cell ca-type-cell";
  typeCell.setAttribute("data-label", "Win Type");

  if (winner.type === "mini") {
    const badge = document.createElement("span");
    badge.className = "ca-win-badge ca-badge-mini";
    badge.innerHTML = '<i class="fa-solid fa-gift"></i> Mini Prize';
    typeCell.appendChild(badge);
  } else {
    typeCell.textContent = "Incentive Prize";
    typeCell.style.color = "var(--text-light)";
  }

  row.appendChild(typeCell);

  const dateCell = document.createElement("div");
  dateCell.className = "ca-winner-cell ca-date-cell";
  dateCell.setAttribute("data-label", "Date");
  dateCell.textContent = formatDate(winner.date);
  row.appendChild(dateCell);

  const prizeCell = document.createElement("div");
  prizeCell.className = "ca-winner-cell ca-prize-cell";
  prizeCell.setAttribute("data-label", "Prize Won");
  prizeCell.textContent = winner.prize;
  row.appendChild(prizeCell);

  return row;
}

function createMainPrizeRow(winner) {
  const row = document.createElement("div");
  row.className = "ca-main-prize-row ca-card";

  const infoSection = document.createElement("div");
  infoSection.className = "ca-main-prize-info";

  const userCell = document.createElement("div");
  userCell.className = "ca-winner-cell ca-user-cell";
  userCell.setAttribute("data-label", "User");

  const userInfo = document.createElement("div");
  userInfo.className = "ca-user-info ca-main-prize-user-info";

  const userPhoto = document.createElement("img");
  userPhoto.className = "ca-user-photo";
  userPhoto.src = winner.photo;
  userPhoto.alt = `${winner.name}'s photo`;
  userInfo.appendChild(userPhoto);

  const nameCountryWrapper = document.createElement("div");
  nameCountryWrapper.className = "ca-user-name-country-wrapper";

  const userName = document.createElement("div");
  userName.className = "ca-user-name";
  userName.textContent = winner.name;
  nameCountryWrapper.appendChild(userName);

  const mobileCountryInfo = document.createElement("div");
  mobileCountryInfo.className = "ca-user-country-mobile";
  mobileCountryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;
  nameCountryWrapper.appendChild(mobileCountryInfo);

  userInfo.appendChild(nameCountryWrapper);

  userCell.appendChild(userInfo);
  infoSection.appendChild(userCell);

  const countryCell = document.createElement("div");
  countryCell.className = "ca-winner-cell ca-country-cell";
  countryCell.setAttribute("data-label", "Country");

  const countryInfo = document.createElement("div");
  countryInfo.className = "ca-country-info";
  countryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;

  countryCell.appendChild(countryInfo);
  infoSection.appendChild(countryCell);

  const typeCell = document.createElement("div");
  typeCell.className = "ca-winner-cell ca-type-cell";
  typeCell.setAttribute("data-label", "Win Type");

  const badge = document.createElement("span");
  badge.className = "ca-win-badge ca-badge-main";
  badge.innerHTML = '<i class="fa-solid fa-trophy"></i> Main Prize';
  typeCell.appendChild(badge);

  infoSection.appendChild(typeCell);

  const dateCell = document.createElement("div");
  dateCell.className = "ca-winner-cell ca-date-cell";
  dateCell.setAttribute("data-label", "Date");
  dateCell.textContent = formatDate(winner.date);
  infoSection.appendChild(dateCell);

  const prizeCell = document.createElement("div");
  prizeCell.className = "ca-winner-cell ca-prize-cell";
  prizeCell.setAttribute("data-label", "Prize Won");
  prizeCell.textContent = winner.prize;
  infoSection.appendChild(prizeCell);

  row.appendChild(infoSection);

  const imageContainer = createCarousel({
    images: winner.images,
    altText: winner.prize,
    showBadge: true,
    badgeText: "Main Prize",
    badgeIcon: "fa-solid fa-trophy",
    badgeClass: "ca-badge-main",
  });

  imageContainer.classList.add("ca-main-prize-image-container");

  row.appendChild(imageContainer);

  return row;
}

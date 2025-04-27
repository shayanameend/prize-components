function loadWinners({ container, data }) {
  const heading = document.createElement("h2");
  heading.className = "winners-heading";
  heading.textContent = "All Winners";
  container.appendChild(heading);

  const winnersTable = document.createElement("div");
  winnersTable.className = "winners-table";

  const winnersHeader = document.createElement("div");
  winnersHeader.className = "winners-header";
  const headerCells = [
    { className: "user-cell", text: "User" },
    { className: "country-cell", text: "Country" },
    { className: "win-type-cell", text: "Win Type" },
    { className: "date-cell", text: "Date" },
    { className: "prize-cell", text: "Prize Won" },
  ];

  headerCells.forEach((cell) => {
    const headerCell = document.createElement("div");
    headerCell.className = `header-cell ${cell.className}`;
    headerCell.textContent = cell.text;
    winnersHeader.appendChild(headerCell);
  });

  winnersTable.appendChild(winnersHeader);

  const winnersList = document.createElement("div");
  winnersList.id = "winners-list";
  winnersTable.appendChild(winnersList);

  container.appendChild(winnersTable);
  populateWinnersList({
    container: winnersList,
    data: data,
  });
}

function populateWinnersList({ container, data }) {
  // Use the data directly without sorting
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
  row.className = "winner-row card";

  // User cell
  const userCell = document.createElement("div");
  userCell.className = "winner-cell user-cell";
  userCell.setAttribute("data-label", "User");

  const userInfo = document.createElement("div");
  userInfo.className = "user-info";

  const userPhoto = document.createElement("img");
  userPhoto.className = "user-photo";
  userPhoto.src = winner.photo;
  userPhoto.alt = `${winner.name}'s photo`;
  userInfo.appendChild(userPhoto);

  // Create a wrapper for name and mobile country
  const nameCountryWrapper = document.createElement("div");
  nameCountryWrapper.className = "user-name-country-wrapper";

  const userName = document.createElement("div");
  userName.className = "user-name";
  userName.textContent = winner.name;
  nameCountryWrapper.appendChild(userName); // Add name to wrapper

  // Add country info for mobile view inside user-info
  const mobileCountryInfo = document.createElement("div");
  mobileCountryInfo.className = "user-country-mobile";
  mobileCountryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;
  nameCountryWrapper.appendChild(mobileCountryInfo); // Add mobile country to wrapper

  userInfo.appendChild(nameCountryWrapper); // Add wrapper to userInfo

  userCell.appendChild(userInfo);
  row.appendChild(userCell);

  // Country cell (remains for larger screens)
  const countryCell = document.createElement("div");
  countryCell.className = "winner-cell country-cell";
  countryCell.setAttribute("data-label", "Country");

  const countryInfo = document.createElement("div");
  countryInfo.className = "country-info";
  countryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;

  countryCell.appendChild(countryInfo);
  row.appendChild(countryCell);

  // Win Type cell
  const typeCell = document.createElement("div");
  typeCell.className = "winner-cell type-cell";
  typeCell.setAttribute("data-label", "Win Type");

  if (winner.type === "mini") {
    const badge = document.createElement("span");
    badge.className = "win-badge badge-mini";
    badge.innerHTML = '<i class="fa-solid fa-gift"></i> Mini Prize';
    typeCell.appendChild(badge);
  } else {
    typeCell.textContent = "Incentive Prize";
    typeCell.style.color = "var(--text-light)";
  }

  row.appendChild(typeCell);

  // Date cell
  const dateCell = document.createElement("div");
  dateCell.className = "winner-cell date-cell";
  dateCell.setAttribute("data-label", "Date");
  dateCell.textContent = formatDate(winner.date);
  row.appendChild(dateCell);

  // Prize cell
  const prizeCell = document.createElement("div");
  prizeCell.className = "winner-cell prize-cell";
  prizeCell.setAttribute("data-label", "Prize Won");
  prizeCell.textContent = winner.prize;
  row.appendChild(prizeCell);

  return row;
}

function createMainPrizeRow(winner) {
  const row = document.createElement("div");
  row.className = "main-prize-row card";

  // Main prize info section
  const infoSection = document.createElement("div");
  infoSection.className = "main-prize-info";

  // User cell
  const userCell = document.createElement("div");
  userCell.className = "winner-cell user-cell";
  userCell.setAttribute("data-label", "User");

  const userInfo = document.createElement("div");
  userInfo.className = "user-info main-prize-user-info"; // Keep main prize structure

  const userPhoto = document.createElement("img");
  userPhoto.className = "user-photo";
  userPhoto.src = winner.photo;
  userPhoto.alt = `${winner.name}'s photo`;
  userInfo.appendChild(userPhoto);

  const userName = document.createElement("div");
  userName.className = "user-name";
  userName.textContent = winner.name;
  userInfo.appendChild(userName);

  // Add country info for mobile view inside user-info (remains hidden by CSS for main prize)
  const mobileCountryInfo = document.createElement("div");
  mobileCountryInfo.className = "user-country-mobile";
  mobileCountryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;
  userInfo.appendChild(mobileCountryInfo);

  userCell.appendChild(userInfo);
  infoSection.appendChild(userCell);

  // Country cell (remains for larger screens)
  const countryCell = document.createElement("div");
  countryCell.className = "winner-cell country-cell";
  countryCell.setAttribute("data-label", "Country");

  const countryInfo = document.createElement("div");
  countryInfo.className = "country-info";
  countryInfo.innerHTML = `<span>${winner.country}</span> ${winner.flag}`;

  countryCell.appendChild(countryInfo);
  infoSection.appendChild(countryCell);

  // Win Type cell
  const typeCell = document.createElement("div");
  typeCell.className = "winner-cell type-cell";
  typeCell.setAttribute("data-label", "Win Type");

  const badge = document.createElement("span");
  badge.className = "win-badge badge-main";
  badge.innerHTML = '<i class="fa-solid fa-trophy"></i> Main Prize';
  typeCell.appendChild(badge);

  infoSection.appendChild(typeCell);

  // Date cell
  const dateCell = document.createElement("div");
  dateCell.className = "winner-cell date-cell";
  dateCell.setAttribute("data-label", "Date");
  dateCell.textContent = formatDate(winner.date);
  infoSection.appendChild(dateCell);

  // Prize cell
  const prizeCell = document.createElement("div");
  prizeCell.className = "winner-cell prize-cell";
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
    badgeClass: "badge-main",
  });

  imageContainer.classList.add("main-prize-image-container");

  row.appendChild(imageContainer);

  return row;
}

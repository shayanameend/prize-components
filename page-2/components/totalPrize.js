function loadTotalPrize({ container, value }) {

  const formattedValue = formatCentsToDollars(value);

  const totalPrizeCard = document.createElement("div");
  totalPrizeCard.className = "total-prize-card card";

  const totalPrizeHeading = document.createElement("div");
  totalPrizeHeading.className = "total-prize-heading";
  totalPrizeHeading.textContent = "Total Prize Value Given Away";
  totalPrizeCard.appendChild(totalPrizeHeading);

  const totalPrizeValue = document.createElement("div");
  totalPrizeValue.className = "total-prize-value";
  totalPrizeValue.textContent = formattedValue;
  totalPrizeCard.appendChild(totalPrizeValue);

  container.appendChild(totalPrizeCard);
}

function formatCentsToDollars(cents) {
  const dollars = cents / 100;
  const formatted = dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatted + " USD";
}

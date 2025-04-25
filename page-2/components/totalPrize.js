function loadTotalPrize({ container, value }) {
  // Format the cents value to dollars with commas and 2 decimal places
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

// Helper function to format cents to dollars
function formatCentsToDollars(cents) {
  // Convert cents to dollars
  const dollars = cents / 100;

  // Format with commas and 2 decimal places
  const formatted = dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatted + " USD";
}

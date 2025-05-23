function loadTotalPrize({ container, value }) {
  const totalPrizeCard = document.createElement("div");
  totalPrizeCard.className = "ca-total-prize-card ca-card";

  const totalPrizeHeading = document.createElement("div");
  totalPrizeHeading.className = "ca-total-prize-heading";
  totalPrizeHeading.textContent = "Total Prize Value Given Away";
  totalPrizeCard.appendChild(totalPrizeHeading);

  const totalPrizeValue = document.createElement("div");
  totalPrizeValue.className = "ca-total-prize-value";
  totalPrizeValue.textContent = "$0.00 USD";
  totalPrizeCard.appendChild(totalPrizeValue);

  container.appendChild(totalPrizeCard);

  const startValue = 0;
  animateCountUp(totalPrizeValue, startValue, value);
}

function formatCentsToDollars(cents) {
  const dollars = cents / 100;
  const formatted = dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatted + " USD";
}

function animateCountUp(element, startValue, endValue, duration = 2000) {
  const startTime = performance.now();
  const difference = endValue - startValue;

  function updateCount(currentTime) {
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < duration) {
      const progress = easeOutExpo(elapsedTime / duration);
      const currentValue = Math.floor(startValue + difference * progress);
      element.textContent = formatCentsToDollars(currentValue);
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = formatCentsToDollars(endValue);
    }
  }

  requestAnimationFrame(updateCount);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

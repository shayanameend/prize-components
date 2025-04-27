function loadTotalPrize({ container, value }) {
  const totalPrizeCard = document.createElement("div");
  totalPrizeCard.className = "total-prize-card card";

  const totalPrizeHeading = document.createElement("div");
  totalPrizeHeading.className = "total-prize-heading";
  totalPrizeHeading.textContent = "Total Prize Value Given Away";
  totalPrizeCard.appendChild(totalPrizeHeading);

  const totalPrizeValue = document.createElement("div");
  totalPrizeValue.className = "total-prize-value";
  totalPrizeValue.textContent = "$0.00 USD";
  totalPrizeCard.appendChild(totalPrizeValue);

  container.appendChild(totalPrizeCard);

  const startValue = 0;
  animateCountUp(totalPrizeValue, startValue, value);
}

// Formats a number (in cents) into a USD currency string.
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

// Animates a number count-up effect on an HTML element.
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

// Easing function for the count-up animation.
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

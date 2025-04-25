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

  setTimeout(() => {
    const startValue = Math.min(value * 0.01, 1000);
    animateCountUp(totalPrizeValue, startValue, value);
  }, 300);
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

function animateCountUp(element, startValue, endValue, duration = 2500) {
  const startTime = performance.now();
  const difference = endValue - startValue;

  element.classList.add('animating');

  setTimeout(() => {
    function updateCount(currentTime) {
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        const progress = easeOutExpo(elapsedTime / duration);
        const currentValue = Math.floor(startValue + (difference * progress));
        element.textContent = formatCentsToDollars(currentValue);
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = formatCentsToDollars(endValue);
        setTimeout(() => {
          element.classList.remove('animating');
        }, 300);
      }
    }

    requestAnimationFrame(updateCount);
  }, 500);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/**
 * Format a date to a string
 * @param {Date} date - The date to format
 * @param {boolean} [longFormat=false] - Whether to use long format (month name) or short format (numeric month)
 * @returns {string} - The formatted date string
 */
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

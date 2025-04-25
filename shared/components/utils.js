/**
 * Format date to Month Day, Year or MM/DD/YYYY
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

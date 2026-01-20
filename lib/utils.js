// lib/utils.js
// Utility functions

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Scroll to section
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Generate gradient class
export const getGradientClass = (color) => {
  return `bg-gradient-to-r ${color}`;
};

// Format percentage
export const formatPercentage = (value) => {
  return `${value}%`;
};

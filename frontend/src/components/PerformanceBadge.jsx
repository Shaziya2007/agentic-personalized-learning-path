import React from "react";

export const PerformanceBadge = ({ level, status, type, className = "" }) => {
  let badgeClass = "badge-not-started";
  let label = level || status || type || "Unknown";

  const upper = String(level || status || type).toUpperCase();

  if (upper === "STRONG" || upper === "COMPLETED") {
    badgeClass = "badge-strong";
    if (upper === "STRONG") label = "Strong (80%+)";
  } else if (upper === "MODERATE" || upper === "IN PROGRESS") {
    badgeClass = "badge-moderate";
    if (upper === "MODERATE") label = "Moderate (50-79%)";
  } else if (upper === "WEAK" || upper === "NEEDS REVIEW") {
    badgeClass = "badge-weak";
    if (upper === "WEAK") label = "Weak (<50%)";
  } else if (upper.startsWith("CO")) {
    badgeClass = "badge-co";
  } else if (upper.startsWith("PO")) {
    badgeClass = "badge-po";
  }

  return <span className={`badge ${badgeClass} ${className}`}>{label}</span>;
};

export default PerformanceBadge;

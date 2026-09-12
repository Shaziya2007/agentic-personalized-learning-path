import React from "react";

export const ProgressBar = ({
  value = 0,
  target = null,
  label,
  showPercentage = true,
  height = 8,
  variant = "auto", // auto | primary | success | warning | danger
  className = ""
}) => {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

  // Auto determine color based on attainment threshold
  let fillVariant = variant;
  if (variant === "auto") {
    if (clampedValue >= 80) fillVariant = "fill-success";
    else if (clampedValue >= 50) fillVariant = "fill-warning";
    else fillVariant = "fill-danger";
  } else {
    fillVariant = `fill-${variant}`;
  }

  return (
    <div className={`progress-container ${className}`}>
      {(label || showPercentage) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && (
            <span className="progress-percent">
              {clampedValue}% {target ? `(Target: ${target}%)` : ""}
            </span>
          )}
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-fill ${fillVariant}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

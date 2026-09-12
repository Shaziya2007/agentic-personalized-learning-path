import React from "react";
import { IconAlertTriangle } from "./Icons";
import Button from "./Button";

export const ErrorMessage = ({
  title = "An Error Occurred",
  message = "Unable to complete the requested action.",
  onRetry
}) => {
  return (
    <div
      style={{
        background: "var(--danger-light)",
        border: "1px solid var(--danger-border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        margin: "1.5rem 0"
      }}
    >
      <div style={{ color: "var(--danger)", flexShrink: 0, marginTop: "0.15rem" }}>
        <IconAlertTriangle size={24} />
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--danger)", marginBottom: "0.25rem" }}>
          {title}
        </h4>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: onRetry ? "0.75rem" : 0 }}>
          {message}
        </p>

        {onRetry && (
          <Button size="sm" variant="danger" onClick={onRetry}>
            Retry Request
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

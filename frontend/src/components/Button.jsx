import React from "react";

export const Button = ({
  children,
  variant = "primary", // primary | secondary | outline | success | danger
  size = "md", // sm | md | lg
  icon: Icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
    </button>
  );
};

export default Button;

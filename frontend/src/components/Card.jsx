import React from "react";

export const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <div className={`card ${className}`} style={style} {...props}>
      {(title || subtitle || headerAction) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;

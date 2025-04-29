import React, { useState } from "react";
import "./css/TechIconsCard.css";

const TechIconsCard = ({
  name,
  Icon,
  hoverEffect = true,
  shadow = true,
  style = {}, 
  iconSize = 30, 
  theme = "default",
}) => {
  const cardClass = `technology-card ${theme} ${hoverEffect ? "hover-effect" : ""} ${
    shadow ? "with-shadow" : ""
  }`;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cardClass}
      style={{
        ...style, 
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="technology-icon"
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
        }}
      >
        <Icon />
      </div>
      {isHovering && <span className="technology-label">{name}</span>}
    </div>
  );
};

export default TechIconsCard;

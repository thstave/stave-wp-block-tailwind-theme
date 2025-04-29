import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  generateGridPositions,
  getRandomDelay,
  getTechIconsArray,
} from "../../components/utils/techIcons";
import TechIconsCard from "./TechIconsCard";
import { useResizeObserver, useIntersectionObserver } from '@thstave/stave-react-utils';;
import "./css/TechIcons.css";
import DebugPanel from "./DebugPanel";


const TechIcons = ({ title, theme, responsiveHeight }) => {
  console.log('TechIcons', responsiveHeight)
  const containerRef = useRef(null);
  const scatterRef = useRef(null);
  const [layoutConfig, setLayoutConfig] = useState({
    rows: 3,
    columns: 9,
    iconSize: 70,
    padding: 10,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  });
  const [debugVisible, setDebugVisible] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(false);

  const handleResize = useCallback(() => {
    const maxColumns = 10;
    const width = scatterRef.current?.offsetWidth || window.innerWidth;
    const height = scatterRef.current?.offsetHeight || window.innerHeight;

    let iconSize = 70;
    let padding = 10;
    let columns = 0;
    let rows = 0;
    let done = false;

    const totalIcons = getTechIconsArray().length;
    rows = Math.max(Math.floor(height / (iconSize + padding)), 1);

    do {
      columns = Math.max(Math.floor(width / (iconSize + padding)), 1);
      columns = columns > maxColumns ? maxColumns : columns;

      if (columns * rows >= totalIcons || iconSize < 20) {
        done = true;
      } else {
        const remainingSpace = height - rows * (iconSize + padding + 10);
        if (remainingSpace > iconSize) {
          rows += 1;
        } else {
          iconSize -= 4;
          padding += 1;
        }
      }
    } while (!done);

    // Calculate grid size
    const gridWidth = columns * (iconSize + padding) - padding;
    const gridHeight = rows * (iconSize + padding) - padding;

    // Calculate centering offsets
    const offsetX = Math.max((width - gridWidth) / 2, 0);
    const offsetY = Math.max((height - gridHeight) / 2, 0) - 8;

    setLayoutConfig({
      rows,
      columns,
      iconSize,
      padding,
      offsetX,
      offsetY,
      width,
      height,
      totalIcons
    });
  }, []);

  useResizeObserver(containerRef, handleResize);

  // --- Intersection observer setup ---
  useIntersectionObserver(
    containerRef,
    (entry) => {
      if (entry.isIntersecting) {
        setAnimationEnabled(true);
      }
    },
    {
      threshold: 0.2,
    }
  );

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  const iconsWithPositions = useMemo(() => {
    const entries = getTechIconsArray();
    const positions = generateGridPositions({
      rows: layoutConfig.rows,
      columns: layoutConfig.columns,
      iconSize: layoutConfig.iconSize,
      padding: layoutConfig.padding,
      totalIcons: entries.length,
    });

    return entries.map(({ name, Icon }, index) => {
      const pos = positions[index] || { top: 0, left: 0 };
      return {
        name,
        Icon,
        top: layoutConfig.offsetY + pos.top,
        left: layoutConfig.offsetX + pos.left,
        delay: getRandomDelay(index),
      };
    });
  }, [layoutConfig]);

  return (
    <div className={`technology-scatter-container ${theme} ${responsiveHeight}`} ref={containerRef}>
      <div className="technology-scatter" ref={scatterRef}>
        {animationEnabled &&
          iconsWithPositions.map((icon, index) => (
            <TechIconsCard
              key={index}
              name={icon.name}
              Icon={icon.Icon}
              iconSize={layoutConfig.iconSize}
              theme={theme}
              style={{
                top: `${icon.top}px`,
                left: `${icon.left}px`,
                animationDelay: `${icon.delay / 1000}s`,
              }}
            />
          ))}
      </div>
      <DebugPanel data={layoutConfig} visible={debugVisible} />
      <button
        onClick={() => setDebugVisible((v) => !v)}
        style={{
          position: "absolute",
          top: "0.5em",
          right: "0.5em",
          background: "#0f0",
          border: "none",
          padding: "0.5em 1em",
          borderRadius: "0.5em",
          cursor: "pointer",
          fontSize: "0.75em",
          zIndex: 10000,
        }}
      >
        {debugVisible ? "Hide Debug" : "Show Debug"}
      </button>
    </div>
  );
};

export default TechIcons;

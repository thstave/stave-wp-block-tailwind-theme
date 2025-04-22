import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useThrottleEvent } from "../composable/useThrottleEvent";
import { useResizeObserver } from "../composable/useResizeObserver";
import {
  measureElementWidth,
  parseCssUnitToPixels,
} from "../utils/measureElementUtils";
import "./Slider.css";

const Slider = forwardRef(
  (
    {
      dataList = [],
      onSelected,
      type = "in-between",
      gap = "16px",
      minSpace = 16,
      debug = false,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const [slideWidth, setSlideWidth] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const wrapperRef = useRef(null);
    const firstSlideRef = useRef(null);
    let gapWidth = minSpace;

    // const calculateGapWidth = (count, containerWidth, width) => {
    //   console.log("calculateSlideWidth", { count, containerWidth, width });
    //   // gap, in-between space-around
    //   let whitespaceSize;
    //   let returnWidth = width;
    //   switch (type) {
    //     case "gap":
    //       returnWidth = parseCssUnitToPixels(gap, containerWidth);
    //       break;
    //     case "in-between":
    //       whitespaceSize = containerWidth - count * width;
    //       returnWidth = whitespaceSize / (count - 1) + width;
    //       console.log("in-between", { whitespaceSize, returnWidth });
    //       break;
    //     case "space-around":
    //       whitespaceSize = containerWidth - count * width;
    //       returnWidth = whitespaceSize / (count + 1) + width;
    //       break;
    //     default:
    //       returnWidth = minSpace;
    //       break;
    //   }
    //   return returnWidth;
    // };

    const calculateWidths = (containerWidth, minSpace) => {
      if (!firstSlideRef.current) return { slideWidth: 0, gapWidth: minSpace };
    
      const elementWidth = measureElementWidth(firstSlideRef.current, containerWidth);
    
      const maxSlides = Math.floor((containerWidth + minSpace) / (elementWidth + minSpace));
    
      if (maxSlides < 1) return { slideWidth: elementWidth, gapWidth: minSpace };
    
      const totalGapSpace = containerWidth - maxSlides * elementWidth;
      const trueGap = maxSlides > 1 ? totalGapSpace / (maxSlides - 1) : 0;
    
      return { slideWidth: elementWidth, gapWidth: trueGap };
    };
    

    // const handleResize = () => {
    //   const wrapper = wrapperRef.current;
    //   const firstSlide = firstSlideRef.current?.firstElementChild;
    //   if (!wrapper || !firstSlide || !(firstSlide instanceof Element)) return;

    //   const containerWidth = wrapper.clientWidth;
    //   let width = measureElementWidth(firstSlide, containerWidth);

    //   if (width === 0) {
    //     console.warn('⚠️ Slider detected 0px width, retrying...');
    //     setTimeout(handleResize, 100); // Retry after 100ms
    //     return;
    //   }

    //   const count = Math.max(
    //     1,
    //     Math.floor((containerWidth + minSpace) / (width + minSpace))
    //   );
    //   gapWidth = calculateGapWidth(count, containerWidth, width);

    //   setVisibleCount(count);
    //   setSlideWidth(width);
    //   debug && console.log("📐 Resized", { containerWidth, width, count });
    // };

    const handleResize = () => {
      console.log("Inside handleResize");
      const wrapper = wrapperRef.current;
      const firstSlide = firstSlideRef.current;
      if (!wrapper || !firstSlide || !(firstSlide instanceof Element)) return;
    
      const containerWidth = wrapper.clientWidth;
      const { slideWidth: calculatedWidth, gapWidth: calculatedGap } = calculateWidths(containerWidth, minSpace);
      console.log("container width : ", containerWidth);
      console.log("widths : ", { slideWidth: calculatedWidth, gapWidth: calculatedGap });
    
      if (calculatedWidth === 0) {
        console.warn('⚠️ Slider detected 0px width, retrying...');
        setTimeout(handleResize, 100);
        return;
      }
    
      const count = Math.max(
        1,
        Math.floor((containerWidth + minSpace) / (calculatedWidth + minSpace))
      );
    
      gapWidth = calculatedGap;
    
      setVisibleCount(count);
      setSlideWidth(calculatedWidth);
      debug && console.log("📐 Resized", { containerWidth, calculatedWidth, calculatedGap, count });
    };
    


    // Throttle resize event to avoid performance issues
    useThrottleEvent(window, "resize", 100, handleResize);
    useResizeObserver(firstSlideRef, handleResize);

    useEffect(() => {
      const timeout = setTimeout(() => {
        requestAnimationFrame(() => {
          handleResize();
        });
      }, 0);
      return () => clearTimeout(timeout);
    }, []);

    useImperativeHandle(ref, () => ({
      next: () => {
        if (currentIndex + visibleCount < dataList.length) {
          setIsAnimating(true);
          setCurrentIndex((prev) => prev + 1);
        }
      },
      previous: () => {
        if (currentIndex > 0) {
          setIsAnimating(true);
          setCurrentIndex((prev) => prev - 1);
        }
      },
      setIndex: (index) => {
        if (index >= 0 && index <= dataList.length - visibleCount) {
          setCurrentIndex(index);
        }
      },
      getIndex: () => currentIndex,
    }));

    const slideOffset = -(currentIndex * (slideWidth + gapWidth));

    return (
      <div className="slider-outer" >
        <div
        ref={wrapperRef}
          className="slider-track"
          style={{
            transform: `translateX(${slideOffset}px)`,
            transition: isAnimating ? "transform 0.5s ease" : "none",
          }}
          onTransitionEnd={() => setIsAnimating(false)}
        >
          {dataList.map((slide, index) => (
            <div
              key={index}
              className="slider-slide"
              ref={index === 0 ? firstSlideRef : null}
              style={{
                width: slideWidth ? `${slideWidth}px` : "auto",
                marginRight: index < dataList.length - 1 ? `${gapWidth}px` : 0,
                opacity:
                  index >= currentIndex && index < currentIndex + visibleCount
                    ? 1
                    : 0.25,
                transition: isAnimating ? "opacity 0.5s ease" : "none",
              }}
              onClick={() => onSelected?.(index)}
            >
              {typeof slide === "function" ? slide(index) : slide}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default Slider;

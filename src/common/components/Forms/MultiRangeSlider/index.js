import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
/* import "./multiRangeSlider.css"; */
import styled from 'styled-components';
import { config } from "../../../utils/config";


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  position: relative;
  height: 20px;

  .slider {
    position: relative;
    width: 100px;
  }

  .slider__track,
  .slider__range,
  .slider__left-value,
  .slider__right-value {
    position: absolute;
  }

  .slider__track,
  .slider__range {
    border-radius: 12px;
    height: 12px;
    top: -6px;
  }

  .slider__track {
    background-color: ${({ theme }) => theme.colors.transport.slider.background};
    width: 100%;
    z-index: 1;
  }

  .slider__range {
    background-color: ${({ theme }) => theme.colors.transport.slider.range};
    z-index: 2;
  }

  .slider__left-value,
  .slider__right-value {
    color: #dee2e6;
    font-size: 12px;
  }

  .slider__left-value {
    left: 0px;
    width: 20px;
  }

  .slider__right-value {
    right: 0px;
    width: 20px;
  }

  /* Removing the default appearance */
  .thumb,
  .thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 100px;
    outline: none;
  }

  .thumb--left {
    z-index: 3;
  }

  .thumb--right {
    z-index: 4;
  }

  /* For Chrome browsers */
  .thumb::-webkit-slider-thumb {
    background-color: ${({ theme }) => theme.colors.transport.slider.thumb};
    border: none;
    border-radius: 50%;
    /* box-shadow: 0 0 1px 1px #ced4da; */
    cursor: pointer;
    height: 10px;
    width: 10px;
    margin-top: 0px;
    pointer-events: all;
    position: relative;
  }

  /* For Firefox browsers */
  .thumb::-moz-range-thumb {
    background-color: ${({ theme }) => theme.colors.transport.slider.thumb};
    border: none;
    border-radius: 50%;
    /* box-shadow: 0 0 1px 1px #ced4da; */
    cursor: pointer;
    height: 10px;
    width: 10px;
    margin-top: 0px;
    pointer-events: all;
    position: relative;
  }
`

const MultiRangeSlider = ({ min, max, onChange, minimumOne=false, presetValues }) => {
  const [minVal, setMinVal] = useState(presetValues.from);
  const [maxVal, setMaxVal] = useState(presetValues.to);
  const minValRef = useRef(presetValues.from);
  const maxValRef = useRef(presetValues.to);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `calc(${minPercent}%)`;
      range.current.style.width = `calc(${maxPercent - minPercent}%)`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <Container>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider__left-value">{minVal}</div>

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>

      <div className="slider__right-value">{minimumOne?(maxVal-1):maxVal}</div>
    </Container>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;

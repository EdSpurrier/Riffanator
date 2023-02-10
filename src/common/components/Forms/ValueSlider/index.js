import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
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
    background-color: ${({ theme }) => theme.colors.machine.slider.background};
    width: 100%;
    z-index: 1;
  }

  .slider__range {
    background-color: ${({ theme }) => theme.colors.machine.slider.range};
    z-index: 2;
  }

  .slider__left-value,
  .slider__right-value {
    color: #dee2e6;
    font-size: 12px;
  }

  .slider__left-value {
    left: -5px;
    width: 20px;
  }

  .slider__right-value {
    right: -5px;
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
    background-color: ${({ theme }) => theme.colors.machine.slider.thumb};
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
    background-color: ${({ theme }) => theme.colors.machine.slider.thumb};
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

const ValueSlider = ({ min, max, onChange, minimumOne=false, presetValue, valueSide='left' }) => {
  const [sliderVal, setSliderVal] = useState(presetValue);
  const sliderValRef = useRef(presetValue);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const percent = getPercent(sliderValRef.current);

    if (range.current) {
      range.current.style.left = `calc(${0}%)`;
      range.current.style.width = `calc(${percent}%)`;
    }

    onChange({ value : sliderVal });
  }, [sliderVal, onChange]);

  return (
    <Container>
      <input
        type="range"
        min={min}
        max={max}
        value={sliderVal}
        onChange={(event) => {
          const value = Number(event.target.value);
          setSliderVal(value);
          sliderValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      {(valueSide==='left'? <div className="slider__left-value">{sliderVal}</div>:<></>)}

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>

      {(valueSide==='right'? <div className="slider__right-value">{sliderVal}</div>:<></>)}

    </Container>
  );
};

ValueSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ValueSlider;

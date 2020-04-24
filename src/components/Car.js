import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ShaftContext } from "../context/ShaftContext";
import Easing from "easing";

const CarStyled = styled.div`
    height: ${props => props.floorHeight - props.positionLetOnLoad}px;
    background: #999;
    position: absolute;
    bottom: ${props => props.positionLetOnLoad}px;
    width: 100%;
    border-width: 4px 0;
    border-style: solid;
    text-align: center;
`;

const SpeedControl = styled.div`
    position: relative;
    height: 4px;
    background-image: linear-gradient(to right, green, #999900, #ff9900, red);
    border-bottom: 1px solid;
    opacity: ${props => (props.speed < 0.5 ? 0.5 : props.speed)};
`;

const SpeedMarkChanger = styled.div`
    width: ${props => 100 - 100 * props.speed}%;
    background: #999;
    position: absolute;
    z-index: 1000;
    right: 0;
    top: -0.5px;
    height: 5px;
`;

const Door = styled.div`
    background-color: red;
    width: 100%;
    height: 3px;
    opacity: 0;
    ${props =>
        props.open
            ? "width: 0%; transition: 2s linear width; opacity: 1"
            : null}
`;

const frameIntervalTime = 10;

const Car = ({ floorHeight, carId }) => {
    return (
        <CarStyled
            floorHeight={floorHeight}
            positionLetOnLoad={-4}
            style={{
                transform: `translateY(-${0}px)`
            }}
        >
            <SpeedControl speed={0}>
                <SpeedMarkChanger speed={0} />
            </SpeedControl>
            <p>T: {String("target")}</p>
            <p>Now: {"-"}</p>
        </CarStyled>
    );
};

export default Car;

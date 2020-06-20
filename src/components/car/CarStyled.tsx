import styled from "styled-components";

export const CarStyled = styled.div<{ numberOfFloors: number }>`
    text-align: center;
    width: 100%;
    height: ${props => 100 / props.numberOfFloors}%;
    background-color: #555;
    border-style: solid;
    border-color: #222;
    border-width: 2px 1px;
    position: relative;
    flex-wrap: wrap;
    margin: 0 1px;
    &::before,
    &::after {
        display: block;
        position: absolute;
        height: 2px;
        left: -1px;
        right: -1px;
        background: #222;
        content: "";
    }
    &::after {
        bottom: -4px;
    }
    &::before {
        top: -4px;
    }
`;

export const Data = styled.p`
    position: absolute;
    text-align: center;
    top: -20px;
    height: 20px;
    width: 100%;
    font-size: 12px;
    color: #fff;
`;

export const Door = styled.div<{
    carState: string;
    carColor: string;
    left?: boolean;
}>`
    width: ${props => (props.carState.includes("door-open") ? "5px; " : "50%")};
    height: 100%;
    transition: 1s 0.2s ease-in-out width, 0.8s linear background-color;
    background-color: ${props => props.carColor};
    left: ${props => (props.left ? "0" : "")};
    right: ${props => (props.left ? "" : "0")};
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-left-width: ${props => (props.left ? "" : "0.5px")};
    border-right-width: ${props => (props.left ? "0.5px" : "")};
    position: absolute;
    z-index: 1;
`;

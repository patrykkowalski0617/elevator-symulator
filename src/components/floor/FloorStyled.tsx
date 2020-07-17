import styled, { keyframes, css } from "styled-components";

export const FloorStyled = styled.div<{
    numberOfFloors: number;
    floorColor: string;
}>`
    height: ${props => 100 / props.numberOfFloors}%;
    border-style: solid;
    border-color: #222;
    border-width: 2px 0;
    background-color: ${props => props.floorColor};
    position: relative;
`;

export const CarInfo = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
`;

export const CarInfoItem = styled.div`
    margin: 1px;
    color: #eee;
    border: none;
    width: 20px;
    height: 20px;
    font-size: 12px;
    > * {
        width: 100%;
        height: 100%;
        font-size: inherit;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0.6;
        color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const CreateBtn = styled.button`
    cursor: pointer;
    border: none;
    line-height: 1;
    font-size: 18px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.15);
        opacity: 0.8;
    }
`;

const waitingAnimationColor = "#999";
const waitingForCarAnimationFrames = keyframes`
  0% {
    box-shadow: 1px 1px 0px  ${waitingAnimationColor}, -1px -1px 0px  ${waitingAnimationColor};
  }
  50% {
    box-shadow: 0px 0px 0px  ${waitingAnimationColor}, 0px 0px 0px  ${waitingAnimationColor};
  }
  100% {
    box-shadow: 1px 1px 0px  ${waitingAnimationColor}, -1px -1px 0px  ${waitingAnimationColor};
  }
`;

const waitingForCarAnimation = css`
    animation: ${waitingForCarAnimationFrames} 2s ease-in-out infinite;
`;

export const Light = styled.div<{
    waitingForCar: { up: boolean; down: boolean };
    noCar: boolean;
}>`
    ${props => (props.noCar ? waitingForCarAnimation : "")}
    opacity: 0.6;
    flex-direction: column-reverse;
    &::before,
    &::after {
        content: "";
        display: block;
        border: 5px solid;
    }
    &::before {
        border-color: #eee transparent transparent transparent;
        opacity: ${props => (props.waitingForCar.down ? "1" : "0.2")};
    }
    &::after {
        border-color: transparent transparent #eee transparent;

        margin-bottom: 2px;
        opacity: ${props => (props.waitingForCar.up ? "1" : "0.2")};
    }
`;

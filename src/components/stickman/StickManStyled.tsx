import styled, { css, keyframes } from "styled-components";

const waitForCarCass = ({ index }: { index: number }) => css`
    left: calc(60px + 15px * ${index});
`;

const getIntoCss = ({
    lifeState,
    carWidth,
    carId,
    placeInCar
}: {
    lifeState: string;
    carWidth: string;
    carId: number | null;
    placeInCar: number | null;
}) => {
    const floorW = "100%";
    const carStartPos = "11px";
    const calcVal = `${floorW} + ${carStartPos} + ${carWidth} * ${carId} + 12px * ${placeInCar}`;

    return css`
        left: calc(${calcVal});
        ${lifeState === "kill" ? "display: none" : ""};
    `;
};

const getIntoFrame = keyframes`
    from{
        transform: scale(1);
    }
    to{
        transform: scale(0.9);
    }
`;

const inCarCss = ({ placeInCar }: { placeInCar: number | null }) => css`
    left: calc(7px + 12px * ${placeInCar});
    /* animation: 0.2s ${getIntoFrame} forwards; */
`;

const getOffCss = ({
    index,
    lifeState
}: {
    index: number;
    lifeState: string;
}) => css`
    background-color: green;
`;

const waitForDead = ({ index }: { index: number }) => css``;

export const Container = styled.div<{
    lifeState: string;
    index: number;
    carWidth: string;
    carId: number | null;
    placeInCar: number | null;
}>`
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 10px;
    transition: 0.5s 1.5s;
    &:hover {
        bottom: 1px;
    }
    ${props => {
        const { index, lifeState, carWidth, carId, placeInCar } = props;
        return lifeState === "wait-for-car"
            ? waitForCarCass({ index })
            : lifeState === "get-into-car" || lifeState === "kill"
            ? getIntoCss({ lifeState, carWidth, carId, placeInCar })
            : lifeState === "in-car"
            ? inCarCss({ placeInCar })
            : lifeState === "get-off-car"
            ? getOffCss({ index, lifeState })
            : lifeState === "wait-for-dead"
            ? waitForDead({ index })
            : "";
    }}
`;

export const FloorInfo = styled.p`
    margin-left: 50%;
    transform: translateX(-50%);
`;

export const StickManHead = styled.div`
    background-color: #666;
    border: 2px solid;
    width: 100%;
    display: block;
    height: 10px;
    border-radius: 100%;
`;

export const StickManStyled = styled.div<{ color: string }>`
    width: 10px;
    height: 35px;
    &::before,
    &::after {
        content: "";
        width: 100%;
        height: 23px;
        display: block;
        border-radius: 5px 5px 0 0;
        border: 2px solid;
    }
    &::before {
        position: absolute;
        background-color: ${props => props.color};
        bottom: 0;
    }
    &::after {
        background-color: #555;
        margin-top: 2px;
    }
`;

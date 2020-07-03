import styled, { css } from "styled-components";

const waitForCarCass = ({ index }: { index: number }) => css`
    left: calc(5px + 15px * ${index});
`;

const getIntoCss = ({
    index,
    carWidth,
    carId
}: {
    index: number;
    lifeState: string;
    carWidth: string;
    carId: number | null;
}) => {
    const floorW = "100%";
    const carStartPos = "11px";
    const calcVal = `${floorW} + ${carStartPos} + ${carWidth} * ${carId} + 12px * ${index}`;

    return css`
        left: calc(${calcVal});
    `;
};

const inCarCss = ({
    index,
    lifeState
}: {
    index: number;
    lifeState: string;
}) => css`
    left: calc(7px + 12px * ${index});
`;

const getOffCss = ({
    index,
    lifeState
}: {
    index: number;
    lifeState: string;
}) => css``;

const waitForDead = ({ index }: { index: number }) => css``;

export const Container = styled.div<{
    lifeState: string;
    index: number;
    carWidth: string;
    carId: number | null;
}>`
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 10px;
    transition: 0.5s left, right;
    &:hover {
        bottom: 1px;
    }
    ${props => {
        const { index, lifeState, carWidth, carId } = props;
        return lifeState === "wait-for-car"
            ? waitForCarCass({ index })
            : lifeState === "get-into-car"
            ? getIntoCss({ index, lifeState, carWidth, carId })
            : lifeState === "in-car"
            ? inCarCss({ index, lifeState })
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

// transition: 0.8s
// ${
//     props => {
//         return `calc(0.2s * ${props.numberOfPassengers - props.stickId})`;
//     }
// }
// ease -in -out left;
// left: ${
//     props => {
//         const carPostion = `100% + ${props.assignedCar} * ${props.carWidth}`;
//         const firstStickmanInCarPos = `12px`;
//         return props.getIn && props.lifeState === "floor"
//             ? `calc(${carPostion} + ${firstStickmanInCarPos})`
//             : `${props.stickId * 20 + 10}px`;
//     }
// };
// left: ${
//     props =>
//     props.lifeState === "car" ? `${7 + 12 * props.stickId}px` : ""
// };

export const StickManStyled = styled.div<{ color: string }>`
    width: 10px;
    height: 35px;
    &::before {
        content: "";
        width: 100%;
        display: block;
        height: 10px;
        background-color: ${props => props.color};
        border: 1px solid;
        border-radius: 100%;
    }
    &::after {
        content: "";
        background-color: #222;
        width: 100%;
        display: block;
        height: 23px;
        margin-top: 2px;
        border-radius: 5px 5px 0 0;
    }
`;

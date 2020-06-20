import styled from "styled-components";

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

export const AssignedCar = styled.div`
    margin: 2px 7px;
`;

export const CarInfo = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
`;

export const CreateBtn = styled.button`
    background-color: rgba(0, 0, 0, 0.5);
    color: #eee;
    opacity: 0.6;
    border: none;
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.15);
        opacity: 0.8;
    }
`;

export const NoCarInfo = styled.p`
    background-color: #f40;
    height: 25px;
    padding: 5px;
    font-size: 15px;
    line-height: 15px;
`;

export const Light = styled.div<{ waitingForCar: boolean }>`
    position: relative;
    width: 25px;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0.6;
    &::before,
    &::after {
        content: "";
        display: block;
        position: absolute;
        border: 6px solid;
        left: 6.5px;
    }
    &::before {
        border-color: transparent transparent #eee transparent;
        top: -1px;
        opacity: ${props => (props.waitingForCar ? "1" : "0.2")};
    }
    &::after {
        border-color: #eee transparent transparent transparent;
        bottom: -1px;
        opacity: ${props => (false ? "1" : "0.2")};
    }
`;

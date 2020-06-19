import styled from "styled-components";

export const ShaftStyled = styled.div<{ carWidth: string }>`
    background-color: #778;
    width: ${props => props.carWidth};
    position: relative;
    display: flex;
    align-items: flex-end;
    &::before,
    &::after {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: #222;
        content: "";
    }
    &::after {
        bottom: 0;
    }
    &::before {
        top: 0;
    }
`;

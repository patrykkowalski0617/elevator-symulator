import styled, { css } from "styled-components";

const buttonCss = css`
    color: #eee;
    border: none;
    padding: 5px 20px;
    background: inherit;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        background-color: #272727;
        color: orange;
    }
    &:focus {
        outline: none;
    }
    &:disabled {
        background-color: #323232;
        color: #666;
    }
`;

export const AutomationWrapper = styled.div`
    position: absolute;
    background-color: #222;
    top: -35px;
    right: 50%;
    transform: translateX(50%);
    border: 2px solid #222;
    display: flex;
    border-radius: 30px 30px 0px 0px;
    overflow: hidden;
`;

export const Button = styled.button`
    ${buttonCss}
`;

export const Select = styled.select`
    ${buttonCss}
    margin-right: 20px;
    padding-right: 0;
`;

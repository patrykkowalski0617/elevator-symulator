import React from "react";
import styled from "styled-components";

const StickManStyled = styled.div`
    background-color: #222;
    width: 5px;
    height: 25px;
    position: absolute;
    bottom: 0;
    &::before {
        content: "";
        width: 100%;
        display: block;
        height: 5px;
        background-color: red;
    }
`;

const StickMan: React.FC = () => {
    return <StickManStyled />;
};

export default StickMan;

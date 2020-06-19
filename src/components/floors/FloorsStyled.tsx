import styled from "styled-components";

export const FloorWrapper = styled.div<{ floorWidth: string }>`
    width: ${props => props.floorWidth};
    border-style: solid;
    background: #555;
    border-width: 0 2px;
`;

import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(33, 33, 43, 0.75);
`;

export const Form = styled.form`
    background-color: #445;
    padding: 30px;
    width: 250px;
    border: 5px solid #000;
    color: #eee;
    text-align: center;
    position: relative;
    label {
        display: block;
        font-size: 15px;
    }
    button {
        cursor: pointer;
    }
    fieldset {
        padding: 30px 0 15px;
        border: none;
    }
`;

export const Input = styled.input<{ wrongData?: boolean }>`
    display: block;
    font-size: 15px;
    font-size: 20px;
    width: 100px;
    text-align: right;
    margin: 5px auto 0;
    background-color: ${props => (props.wrongData ? "#f40" : "")};
`;

export const Submit = styled.button`
    padding: 5px;
    width: 100%;
`;

export const Close = styled.button`
    position: absolute;
    background-color: #445;
    color: #ccc;
    font-family: sans-serif;
    font-weight: bolder;
    width: 40px;
    height: 40px;
    font-size: 20px;
    border-radius: 100%;
    border: 2px solid;
    top: -20px;
    right: -20px;
    outline: none;
`;

export const ValidationInfo = styled.p`
    font-size: 10px;
    position: absolute;
    bottom: 5px;
`;

export const Item = styled.div`
    position: relative;
    padding-bottom: 30px;
`;

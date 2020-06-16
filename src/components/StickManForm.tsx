import React, { useContext } from "react";
import styled from "styled-components";
import { BuildingContext } from "../context/BuildingContext";

const Container = styled.div`
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

const Form = styled.form`
    background-color: #333339;
    padding: 30px;
    border: 5px solid #000;
    color: #eee;
    text-align: center;
    position: relative;
    label,
    input {
        display: block;
        margin: 15px auto 0;
        font-size: 15px;
    }
    button {
        cursor: pointer;
    }
    fieldset {
        padding: 30px;
        border: none;
        input {
            font-size: 20px;
            max-width: 100px;
            text-align: right;
        }
    }
`;

const Submit = styled.button`
    padding: 5px;
    width: 100%;
`;

const Close = styled.button`
    position: absolute;
    background-color: #333339;
    color: #ccc;
    font-family: sans-serif;
    font-weight: bolder;
    width: 40px;
    height: 40px;
    font-size: 20px;
    border-radius: 100%;
    border: 3px solid;
    top: -20px;
    right: -20px;
    outline: none;
`;

type StickManFormProps = {
    floorNumber: number;
};

const StickManForm = ({ floorNumber }: StickManFormProps) => {
    const { setCreatingStickMan } = useContext(BuildingContext);
    const closeHandler = (e: any) => {
        e.preventDefault();
        setCreatingStickMan(false);
    };

    return (
        <Container>
            <Form>
                <Close onClick={closeHandler}>x</Close>
                <h3>Create Stickman on floor {floorNumber}</h3>
                <fieldset>
                    <label htmlFor="how-many">How many:</label>
                    <input type="number" id="how-many"></input>
                    <label htmlFor="destination">Destiantion:</label>
                    <input type="number" id="destination"></input>
                </fieldset>
                <Submit>Submit</Submit>
            </Form>
        </Container>
    );
};

export default StickManForm;

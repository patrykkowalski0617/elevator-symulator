import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BuildingContext } from "../context/BuildingContext";
import { FloorsContext } from "../context/FloorsContext";

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
    background-color: #445;
    padding: 30px;
    width: 320px;
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
            width: 100px;
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

const ValidationInfo = styled.p`
    font-size: 12px;
    margin-top: 10px;
`;

type StickManFormProps = {
    floorNumber: number;
};

const StickManForm = ({ floorNumber }: StickManFormProps) => {
    const { setCreatingStickMan, numberOfFloors } = useContext(BuildingContext);
    const { addAllStickMansDestinations } = useContext(FloorsContext);

    const [howMany, setHowMany] = useState<number>(1);
    const [destination, setDestination] = useState<number>(0);

    const closeHandler = (e: any) => {
        e.preventDefault();
        setCreatingStickMan(null);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (floorNumber !== destination) {
            addAllStickMansDestinations(floorNumber, howMany, destination);
            setCreatingStickMan(null);
        }
    };

    return (
        <Container>
            <Form>
                <Close onClick={closeHandler}>x</Close>
                <h3>Create Stickman on floor {floorNumber}</h3>
                <fieldset>
                    <label htmlFor="how-many">How many:</label>
                    <input
                        type="number"
                        id="how-many"
                        min={1}
                        max={5}
                        value={howMany}
                        onChange={e => {
                            setHowMany(Number(e.target.value));
                        }}
                    ></input>
                    <label htmlFor="destination">Destiantion:</label>
                    <input
                        type="number"
                        id="destination"
                        min={0}
                        max={numberOfFloors - 1}
                        style={
                            floorNumber === destination
                                ? { backgroundColor: "red" }
                                : {}
                        }
                        value={destination}
                        onChange={e => {
                            setDestination(Number(e.target.value));
                        }}
                    ></input>
                    {floorNumber === destination ? (
                        <ValidationInfo>
                            Destiantion should be different than floor you
                            create StickMan
                        </ValidationInfo>
                    ) : null}
                </fieldset>
                <Submit
                    onClick={submitHandler}
                    disabled={floorNumber === destination}
                >
                    Submit
                </Submit>
            </Form>
        </Container>
    );
};

export default StickManForm;

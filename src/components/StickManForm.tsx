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

const Input = styled.input<{ wrongData?: boolean }>`
    display: block;
    font-size: 15px;
    font-size: 20px;
    width: 100px;
    text-align: right;
    margin: 5px auto 0;
    background-color: ${props => (props.wrongData ? "#f40" : "")};
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
    font-size: 10px;
    position: absolute;
    bottom: 5px;
`;

const Item = styled.div`
    position: relative;
    padding-bottom: 30px;
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
                    <Item>
                        <label htmlFor="how-many">How many:</label>
                        <Input
                            type="number"
                            id="how-many"
                            min={1}
                            max={5}
                            value={howMany}
                            onChange={e => {
                                setHowMany(Number(e.target.value));
                            }}
                        ></Input>
                    </Item>
                    <Item>
                        <label htmlFor="destination">Destiantion:</label>
                        <Input
                            type="number"
                            id="destination"
                            min={0}
                            max={numberOfFloors - 1}
                            wrongData={floorNumber === destination}
                            value={destination}
                            onChange={e => {
                                setDestination(Number(e.target.value));
                            }}
                        ></Input>
                        {floorNumber === destination ? (
                            <ValidationInfo>
                                Destiantion should be different than floor you
                                create Stickman
                            </ValidationInfo>
                        ) : null}
                    </Item>
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

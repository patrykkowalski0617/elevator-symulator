import React, { useContext, useState, useEffect } from "react";
import { BuildingContext } from "../../context/BuildingContext";
import { FloorsContext } from "../../context/FloorsContext";
import {
    Container,
    Form,
    Input,
    Submit,
    Close,
    ValidationInfo,
    Item
} from "./StickManFormStyled";

type StickManFormProps = {
    floorNumber: number;
};

const StickManForm = ({ floorNumber }: StickManFormProps) => {
    const { setCreatingStickMan, numberOfFloors } = useContext(BuildingContext);
    const { addAllFloorsStickMansDestinations } = useContext(FloorsContext);

    const [howMany, setHowMany] = useState<number>(1);
    const [destination, setDestination] = useState<number>(0);

    const closeHandler = (e: any) => {
        e.preventDefault();
        setCreatingStickMan(null);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (floorNumber !== destination) {
            addAllFloorsStickMansDestinations(
                floorNumber,
                howMany,
                destination
            );
            setCreatingStickMan(null);
        }
    };

    // mange form using keyboard
    useEffect(() => {
        const manageKeyboard = (e: any) => {
            if (e.key === "Escape") {
                setCreatingStickMan(null);
            } else if (e.key === "Enter" || e.key === " ") {
                submitHandler(e);
            }
        };

        window.addEventListener("keydown", manageKeyboard);

        return () => {
            window.removeEventListener("keydown", manageKeyboard);
        };
    });

    return (
        <Container>
            <Form>
                <Close onClick={closeHandler}>x</Close>
                <h3>
                    Create Stickmans
                    <br />
                    on floor {floorNumber}
                </h3>
                <fieldset>
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
                            autoFocus={true}
                        ></Input>
                        {floorNumber === destination ? (
                            <ValidationInfo>
                                Destiantion should be different than floor you
                                create Stickman
                            </ValidationInfo>
                        ) : null}
                    </Item>
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

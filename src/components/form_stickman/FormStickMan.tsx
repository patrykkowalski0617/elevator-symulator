import React, { useContext, useState, useEffect } from "react";
import { BuildingContext } from "../../context";
import {
    Container,
    Form,
    Input,
    Submit,
    Close,
    ValidationInfo,
    Item
} from "./FormStickManStyled";

type StickManFormProps = {
    floorNumber: number;
};

const StickManForm = ({ floorNumber }: StickManFormProps) => {
    const {
        setCreatingStickMan,
        setFormSickManData,
        numberOfFloors
    } = useContext(BuildingContext);

    const [howMany, setHowMany] = useState<number | string>(2);
    const [destination, setDestination] = useState<number | string>(0);

    const closeHandler = (e: any) => {
        e.preventDefault();
        setCreatingStickMan(null);
        setFormSickManData(null);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (
            !(
                floorNumber === Number(destination) ||
                destination === "" ||
                howMany === ""
            )
        ) {
            setFormSickManData({
                floorNumber,
                howMany: Number(howMany),
                destination: Number(destination)
            });
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
                            wrongData={floorNumber === Number(destination)}
                            value={destination}
                            onChange={e => {
                                setDestination(e.target.value);
                            }}
                            autoFocus={true}
                        ></Input>
                        {floorNumber === Number(destination) ? (
                            <ValidationInfo>
                                Destiantion should be different than floor you
                                create Stickman
                            </ValidationInfo>
                        ) : null}
                        {destination === "" ? (
                            <ValidationInfo>
                                This field is required
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
                                setHowMany(e.target.value);
                            }}
                        ></Input>
                        {howMany === "" ? (
                            <ValidationInfo>
                                This field is required
                            </ValidationInfo>
                        ) : null}
                    </Item>
                </fieldset>
                <Submit
                    onClick={submitHandler}
                    disabled={
                        floorNumber === Number(destination) ||
                        destination === "" ||
                        howMany === ""
                    }
                >
                    Submit
                </Submit>
            </Form>
        </Container>
    );
};

export default StickManForm;

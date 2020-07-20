import React, { useContext,  useEffect } from "react";
import { BuildingContext } from "../../context";
import { AutomationStyled } from "./AutomationStyled";

const Automation: React.FC = () => {
    const {
        numberOfFloors,
        setFormSickManData,
        automationIsOn,
        setAutomationIsOn
    } = useContext(BuildingContext);

    useEffect(() => {
        let timeoutId: number;
        if (automationIsOn) {
            const getRandomInt = (min: number, max: number) =>
                Math.floor(Math.random() * (max - min));

            const data = () => {
                const floorNumber = getRandomInt(0, numberOfFloors - 1);
                let howMany = getRandomInt(0, 3);
                howMany = howMany > 2 ? getRandomInt(0, 5) : howMany;
                let destination = getRandomInt(0, numberOfFloors - 1);
                destination =
                    destination === floorNumber ? destination - 1 : destination;
                return {
                    floorNumber,
                    howMany,
                    destination
                };
            };
            const startAutomation = () => {
                const time = getRandomInt(5000, 15000);
                timeoutId = setTimeout(() => {
                    setFormSickManData(data());

                    clearTimeout(timeoutId);
                    startAutomation();
                }, time);
            };
            startAutomation();
            setFormSickManData(data());
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [automationIsOn]);

    return (
        <AutomationStyled
            onClick={() => {
                setAutomationIsOn(!automationIsOn);
            }}
        >
            Automation is {automationIsOn ? "ON" : "OFF"}
        </AutomationStyled>
    );
};

export default Automation;

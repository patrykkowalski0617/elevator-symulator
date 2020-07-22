import React, { useContext, useEffect, useState } from "react";
import { BuildingContext } from "../../context";
import { AutomationStyled } from "./AutomationStyled";

const Automation: React.FC = () => {
    const {
        numberOfFloors,
        setFormSickManData,
        automationIsOn,
        setAutomationIsOn
    } = useContext(BuildingContext);

    const [dataHistory, setDataHistory] = useState<
        {
            _data: {
                floorNumber: number;
                howMany: number;
                destination: number;
            };
            time: number;
        }[]
    >([]);
    const [dataToPush, setDataToPush] = useState<{
        _data: { floorNumber: number; howMany: number; destination: number };
        time: number;
    } | null>(null);

    useEffect(() => {
        if (dataToPush) {
            setDataHistory([...dataHistory, dataToPush]);
        }
    }, [dataToPush]);

    useEffect(() => {
        console.log(dataHistory);
    }, [dataHistory]);

    useEffect(() => {
        let timeoutId: number;
        if (automationIsOn) {
            const getRandomInt = (min: number, max: number) =>
                Math.floor(Math.random() * max) + min;

            const data = () => {
                const floorNumber = getRandomInt(0, numberOfFloors - 1);
                let howMany = getRandomInt(1, 3);
                howMany = howMany > 2 ? getRandomInt(1, 5) : howMany;
                let destination = getRandomInt(0, numberOfFloors - 1);
                destination =
                    destination === floorNumber &&
                    destination < numberOfFloors - 1
                        ? destination + 1
                        : destination === floorNumber && destination > 0
                        ? destination - 1
                        : destination;
                return {
                    floorNumber,
                    howMany,
                    destination
                };
            };
            const startAutomation = () => {
                const time = getRandomInt(5000, 15000);
                timeoutId = setTimeout(() => {
                    const _data = data();
                    setFormSickManData(_data);
                    setDataToPush({ _data, time });

                    clearTimeout(timeoutId);
                    startAutomation();
                }, time);
            };
            startAutomation();

            const _data = data();
            setFormSickManData(_data);
            setDataToPush({ _data, time: 0 });
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

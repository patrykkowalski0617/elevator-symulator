import React, { useContext, useEffect, useState } from "react";
import { BuildingContext } from "../../context";
import { AutomationWrapper, Button, Select } from "./AutomationStyled";

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

    const [storedAutomationData, setStoredAutomationData] = useState<
        {
            _data: {
                floorNumber: number;
                howMany: number;
                destination: number;
            };
            time: number;
        }[][]
    >([]);
    const [
        selectedStoredAutomationData,
        setSelectedStoredAutomationData
    ] = useState<number | null>(null);

    useEffect(() => {
        if (dataToPush) {
            setDataHistory([...dataHistory, dataToPush]);
        }
    }, [dataToPush]);

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
            if (selectedStoredAutomationData === null) {
                startAutomation();
                const _data = data();
                setFormSickManData(_data);
                setDataToPush({ _data, time: 0 });
            } else if (storedAutomationData !== null) {
                const storedData: {
                    _data: {
                        floorNumber: number;
                        howMany: number;
                        destination: number;
                    };
                    time: number;
                }[] = storedAutomationData[selectedStoredAutomationData];

                for (let i = 0; i < storedData.length; i++) {
                    const { _data, time } = storedData[i];
                    setTimeout(() => {
                        setFormSickManData(_data);
                    }, time);
                }
            }
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [automationIsOn]);

    useEffect(() => {
        let storedData = window.localStorage.getItem("automationData");
        if (storedData === null) {
            window.localStorage.setItem("automationData", JSON.stringify([]));
        }
        storedData = window.localStorage.getItem("automationData");
        if (storedData !== null) {
            setStoredAutomationData(JSON.parse(storedData));
        }
    }, []);

    const automationOnClickHandler = () => {
        setAutomationIsOn(!automationIsOn);
    };

    const storeDataOnClickHandler = () => {
        if (
            dataHistory.length &&
            storedAutomationData !== null &&
            Array.isArray(storedAutomationData)
        ) {
            // set local storage
            window.localStorage.setItem(
                "automationData",
                JSON.stringify([...storedAutomationData, dataHistory])
            );
            // set component state
            const storedData = window.localStorage.getItem("automationData");
            if (storedData !== null) {
                setStoredAutomationData(JSON.parse(storedData));
            }
        }
    };

    return (
        <AutomationWrapper>
            <Button onClick={automationOnClickHandler}>
                Automation is {automationIsOn ? "ON" : "OFF"}
            </Button>
            <Button disabled={automationIsOn} onClick={storeDataOnClickHandler}>
                Store
            </Button>
            <Select
                onChange={e => {
                    const val = Number(e.target.value);
                    setSelectedStoredAutomationData(val !== NaN ? val : null);
                }}
            >
                <option>Select stored sequence</option>
                {storedAutomationData.map((item, index) => {
                    return <option key={index}>{index}</option>;
                })}
            </Select>
        </AutomationWrapper>
    );
};

export default Automation;

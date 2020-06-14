import React from "react";
import Floor from "./Floor";
import renderer from "react-test-renderer";
import ShaftContext from "../context/ShaftContext";
import BuildingContext from "../context/BuildingContext";
import FloorsContext from "../context/FloorsContext";

test("Floor - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FloorsContext>
                    <Floor
                        floorNumber={1}
                        numberOfFloors={2}
                        role={"role"}
                        floorColor="red"
                    ></Floor>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );

    expect(tree.toJSON()).toMatchSnapshot();
});

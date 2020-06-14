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
                    <Floor></Floor>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );

    expect(tree.toJSON()).toMatchSnapshot();
});

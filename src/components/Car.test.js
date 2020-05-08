import React from "react";
import Car from "./Car";
import renderer from "react-test-renderer";
import ShaftContext from "../context/ShaftContext";
import BuildingContext from "../context/BuildingContext";

test("Car - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <Car></Car>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

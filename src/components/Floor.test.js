import React from "react";
import Floor from "./Floor";
import renderer from "react-test-renderer";
import ShaftContext from "../context/ShaftContext";
import BuildingContext from "../context/BuildingContext";

test("", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <Floor title="tiiitle"></Floor>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

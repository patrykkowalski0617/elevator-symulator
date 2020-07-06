import React from "react";
import Floor from "./Floor";
import renderer from "react-test-renderer";
import { ShaftContext, FloorsContext, BuildingContext } from "../../context";

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

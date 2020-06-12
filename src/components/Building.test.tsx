import React from "react";
import Building from "./Building";
import renderer from "react-test-renderer";
import ShaftContext from "../context/ShaftContext";
import BuildingContext from "../context/BuildingContext";
import FloorsContext from "../context/FloorsContext";

test("Building - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FloorsContext>
                    <Building></Building>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

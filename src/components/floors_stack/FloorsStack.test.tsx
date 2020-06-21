import React from "react";
import Floors from "./Floors";
import renderer from "react-test-renderer";
import ShaftContext from "../../context/ShaftContext";
import BuildingContext from "../../context/BuildingContext";
import FloorsContext from "../../context/FloorsContext";

test("Floors - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FloorsContext>
                    <Floors></Floors>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

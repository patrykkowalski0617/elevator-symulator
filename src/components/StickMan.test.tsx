import React from "react";
import StickMan from "./StickMan";
import renderer from "react-test-renderer";
import ShaftContext from "../context/ShaftContext";
import BuildingContext from "../context/BuildingContext";
import FloorsContext from "../context/FloorsContext";

test("StickMan - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FloorsContext>
                    <StickMan></StickMan>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

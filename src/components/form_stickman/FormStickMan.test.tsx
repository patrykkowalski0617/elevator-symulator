import React from "react";
import FormStickMan from "./FormStickMan";
import renderer from "react-test-renderer";
import ShaftContext from "../../context/ShaftContext";
import BuildingContext from "../../context/BuildingContext";
import FloorsContext from "../../context/FloorsContext";

test("FormStickMan - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FloorsContext>
                    <FormStickMan></FormStickMan>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

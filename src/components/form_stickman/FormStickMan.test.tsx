import React from "react";
import FormStickMan from "./FormStickMan";
import renderer from "react-test-renderer";
import { ShaftContext, BuildingContext } from "../../context";

test("FormStickMan - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FormStickMan></FormStickMan>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

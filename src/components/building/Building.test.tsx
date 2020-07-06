import React from "react";
import Building from "./Building";
import renderer from "react-test-renderer";
import { ShaftContext, FloorsContext, BuildingContext } from "../../context";

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

import React from "react";
import Floors from "./Floors";
import renderer from "react-test-renderer";
import { ShaftContext, FloorsContext, BuildingContext } from "../../context";

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

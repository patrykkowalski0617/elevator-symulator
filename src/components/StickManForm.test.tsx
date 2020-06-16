import React from "react";
import StickManForm from "./StickManForm";
import renderer from "react-test-renderer";
import ShaftContext from "../context/ShaftContext";
import BuildingContext from "../context/BuildingContext";
import FloorsContext from "../context/FloorsContext";

test("StickManForm - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FloorsContext>
                    <StickManForm></StickManForm>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

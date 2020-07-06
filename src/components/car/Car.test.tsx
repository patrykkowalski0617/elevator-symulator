import React from "react";
import Car from "./Car";
import renderer from "react-test-renderer";
import { ShaftContext, FloorsContext, BuildingContext } from "../../context";

test("Car - render and match snapshot", () => {
    const tree = renderer.create(
        <BuildingContext>
            <ShaftContext>
                <FloorsContext>
                    <Car carId={1}></Car>
                </FloorsContext>
            </ShaftContext>
        </BuildingContext>
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

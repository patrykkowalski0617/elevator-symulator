import React from "react";
import Shaft from "./Shaft";
import renderer from "react-test-renderer";
test("Shaft - render and match snapshot", () => {
    // Add test that will check if Shaft does not have border top and bottom
    const tree = renderer.create(<Shaft></Shaft>);
    expect(tree.toJSON()).toMatchSnapshot();
});

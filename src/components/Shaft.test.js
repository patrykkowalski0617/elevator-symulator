import React from "react";
import Shaft from "./Shaft";
import renderer from "react-test-renderer";
test("Shaft - render and match snapshot", () => {
    const tree = renderer.create(<Shaft></Shaft>);
    expect(tree.toJSON()).toMatchSnapshot();
});

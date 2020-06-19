import React from "react";
import Shaft from "./Shaft";
import { ShaftStyled } from "./ShaftStyled";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";

test("Shaft - render and match snapshot", () => {
    const tree = renderer.create(<Shaft></Shaft>);
    expect(tree.toJSON()).toMatchSnapshot();
});

afterEach(cleanup);
test("Shaft has no vertical border, padding and margin", () => {
    render(<ShaftStyled carWidth={10}></ShaftStyled>);

    const className = ShaftStyled.styledComponentId;
    const ShaftRoots = document.getElementsByClassName(className)[0];
    const style = window.getComputedStyle(ShaftRoots);

    expect(style.borderTopWidth).toBe("");
    expect(style.borderBottomWidth).toBe("");
    expect(style.paddingTop).toBe("");
    expect(style.paddingBottom).toBe("");
});

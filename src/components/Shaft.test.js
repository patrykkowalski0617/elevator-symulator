import React from "react";
import Shaft, { CarShaftStyled } from "./Shaft";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";

test("Shaft - render and match snapshot", () => {
    const tree = renderer.create(<Shaft></Shaft>);
    expect(tree.toJSON()).toMatchSnapshot();
});

afterEach(cleanup);
test("Shaft has no vertical border, padding or margin", () => {
    render(<CarShaftStyled></CarShaftStyled>);

    const className = CarShaftStyled.styledComponentId;
    const ShaftRoots = document.getElementsByClassName(className)[0];
    const style = window.getComputedStyle(ShaftRoots);

    expect(style.borderTopWidth).toBe("");
    expect(style.borderBottomWidth).toBe("");
    expect(style.paddingTop).toBe("");
    expect(style.paddingBottom).toBe("");
});

import React from "react";
import { render } from "@testing-library/react";
import Floor from "./Floor";

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useContext: () => "context_value"
}));

test("Floor render", () => {
    render(<Floor />);
});

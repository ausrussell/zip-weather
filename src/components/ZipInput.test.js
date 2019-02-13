import React from "react";
import { shallow, mount } from "enzyme";
import ZipInput from "./ZipInput";
import ErrorItem from "./ZipInput";

it("renders header", () => {
  const wrapper = shallow(<ZipInput />);
  const input = <h1>Zip Weather</h1>;
  expect(wrapper.contains(input)).toEqual(true);
});

describe("the user populates the zip input", () => {
  const wrapper = shallow(<ZipInput />);
  const zip = "94612";
  beforeEach(() => {
    const input = wrapper.find("input").first();
    input.simulate("change", {
      target: { value: zip }
    });
  });
  test("should update the state property `zip`", () => {
    expect(wrapper.state().zip).toEqual(zip);
  });
});

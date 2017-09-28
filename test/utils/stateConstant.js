import { expect } from "chai";
import stateConstant from "../../lib/utils/stateConstant";

describe("stateConstant", () => {
  it("returns the argument fed when called 2 more time", () => {
    const arg = 42;
    expect(stateConstant(arg)()()).to.equal(arg);
  });
});

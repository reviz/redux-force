import { expect } from "chai";
import getStateConstant from "../../lib/utils/getStateConstant";

describe("getStateConstant", () => {
  it("returns the same exact function when fed with a function", () => {
    const arg = () => {};
    expect(getStateConstant(arg)).to.equal(arg);
  });

  it("returns a function whatever was fed", () => {
    expect(getStateConstant(undefined)).to.be.a("function");
    expect(getStateConstant(3)).to.be.a("function");
    expect(getStateConstant(null)).to.be.a("function");
    expect(getStateConstant("foo")).to.be.a("function");
  });
});

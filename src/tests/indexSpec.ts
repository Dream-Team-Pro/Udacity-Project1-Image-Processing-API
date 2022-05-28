import {
  checkUrlData
} from "../routes";

// jasmine unit testing to chek Url Data intered from user
describe("test checkUrlData", () => {
  it("should True because all parameters entered", () => {
    const validate = checkUrlData("fish", 150, 250);
    expect(validate).toBeTrue();
  });

  it("should false because some parameters ar missing", () => {
    const validate = checkUrlData("", 100, 240);
    expect(validate).toBeFalse();
  });
});

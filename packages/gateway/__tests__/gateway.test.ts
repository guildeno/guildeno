import { gateway } from "../src/gateway";

test("My gateway", () => {
    expect(gateway()).toBe(true);
});

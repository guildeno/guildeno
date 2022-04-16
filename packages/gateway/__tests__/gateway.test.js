"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gateway_1 = require("../src/gateway");
test("My gateway", () => {
    expect((0, gateway_1.gateway)()).toBe(true);
});
//# sourceMappingURL=gateway.test.js.map
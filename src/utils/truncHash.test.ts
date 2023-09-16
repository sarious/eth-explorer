import { truncHash } from "./truncHash";

test("trancate hash at start", () => {
  const result = truncHash("0x0123456789", 6, "start");

  expect(result).toBe("...456789");
});

test("trancate hash in the end", () => {
  const result = truncHash("0x0123456789", 6, "end");

  expect(result).toBe("0x0123...");
});

test("trancate hash in the middle", () => {
  const result = truncHash("0x0123456789", 6, "middle");

  expect(result).toBe("0x0...789");
});

test("trancate hash in the middle with odd number of left characters", () => {
  const result = truncHash("0x0123456789", 5, "middle");

  expect(result).toBe("0x0...89");
});

test("trancate hash in the middle when truncated count equal to 3", () => {
  const result = truncHash("0x0123456789", 9, "middle");

  expect(result).toBe("0x0123456789");
});

test("trancate hash in the middle when truncated count less than 3", () => {
  const result = truncHash("0x0123456789", 10, "middle");

  expect(result).toBe("0x0123456789");
});

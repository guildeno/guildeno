import { Collection } from "../../src/utils/collection.ts";
import { assertEquals, assertExists } from "../deps.ts";

const baseCollection = new Collection<number, string>([
  [1, "a"],
  [2, "b"],
  [3, "c"],
  [4, "d"],
  [5, "e"],
]);

Deno.test({
  name: "[collection] base exists",
  fn(): void {
    assertExists(baseCollection);
  },
});

Deno.test({
  name: "[collection] set",
  fn(): void {
    baseCollection.set(6, "f");
    assertEquals(
      baseCollection,
      new Collection<number, string>([
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
        [5, "e"],
        [6, "f"],
      ])
    );

    baseCollection.set(7, "g");
    assertEquals(
      baseCollection,
      new Collection<number, string>([
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
        [5, "e"],
        [6, "f"],
        [7, "g"],
      ])
    );
  },
});

Deno.test({
  name: "[collection] max size",
  fn() {
    const col = new Collection<number, string>();
    col.maxSize = 2;

    col.set(1, "a");
    col.set(2, "b");
    assertEquals(col.size, 2);

    col.set(3, "c");
    col.set(4, "d");
    assertEquals(col.size, 2);
  },
});

Deno.test({
  name: "[collection] to array",
  fn() {
    assertEquals(baseCollection.array(), ["a", "b", "c", "d", "e", "f", "g"]);
  },
});

Deno.test({
  name: "[collection] first",
  fn() {
    assertEquals(baseCollection.first(), "a");
  },
});

Deno.test({
  name: "[collection] last",
  fn() {
    assertEquals(baseCollection.last(), "g");
  },
});

// No random test because idk how to implement it

Deno.test({
  name: "[collection] find",
  fn() {
    assertEquals(
      baseCollection.find((v) => v === ("c" || "e")),
      "c"
    );
  },
});

Deno.test({
  name: "[collection] find",
  fn() {
    assertEquals(
      baseCollection.find((v) => v === "e" || v === "c"),
      "c"
    );
  },
});

Deno.test({
  name: "[collection] filter",
  fn() {
    assertEquals(
      baseCollection.filter((v) => v === "e" || v === "c"),
      new Collection<number, string>([
        [3, "c"],
        [5, "e"],
      ])
    );
  },
});

Deno.test({
  name: "[collection] map",
  fn() {
    const mapped = baseCollection.map((v) => `map ${v}`);
    assertEquals(mapped, ["map a", "map b", "map c", "map d", "map e", "map f", "map g"]);
  },
});

Deno.test({
  name: "[collection] some",
  fn() {
    assertEquals(
      baseCollection.some((v) => v === "f"),
      true
    );
    assertEquals(
      baseCollection.some((v) => v === "i"),
      false
    );
  },
});

Deno.test({
  name: "[collection] every",
  fn() {
    assertEquals(
      baseCollection.every((v) => v === "f"),
      false
    );
    assertEquals(
      baseCollection.every((v) => typeof v === "string"),
      true
    );
  },
});

Deno.test({
  name: "[collection] reduce",
  fn() {
    assertEquals(
      baseCollection.reduce((ac, v) => {
        ac += v;
        return ac;
      }, ""),
      "abcdefg"
    );
  },
});

import { chooseRandom } from "./random.ts";

export class Collection<K, V> extends Map<K, V> {
  maxSize?: number;

  set(key: K, value: V) {
    // When this collection is maxSizeed make sure we can add first
    if (this.maxSize !== undefined && this.size >= this.maxSize) {
      return this;
    }

    return super.set(key, value);
  }

  array() {
    return [...this.values()];
  }

  first(): V | undefined {
    return this.values().next().value;
  }

  last(): V | undefined {
    return [...this.values()].pop()!;
  }

  random(): V | undefined {
    return chooseRandom<V>(this.array());
  }

  find(callback: (value: V, key: K) => boolean) {
    for (const entry of this) {
      if (callback(entry[1], entry[0])) return entry[1];
    }

    // If nothing matched
    return;
  }

  filter(callback: (value: V, key: K) => boolean) {
    const relevant = new Collection<K, V>();
    this.forEach((value, key) => {
      if (callback(value, key)) relevant.set(key, value);
    });

    return relevant;
  }

  map<T>(callback: (value: V, key: K) => T) {
    const results: T[] = [];
    this.forEach((value, key) => results.push(callback(value, key)));

    return results;
  }

  some(callback: (value: V, key: K) => boolean) {
    for (const entry of this) {
      if (callback(entry[1], entry[0])) return true;
    }

    return false;
  }

  every(callback: (value: V, key: K) => boolean) {
    for (const entry of this) {
      if (!callback(entry[1], entry[0])) return false;
    }

    return true;
  }

  reduce<T>(callback: (accumulator: T, value: V, key: K) => T, initialValue?: T): T {
    let accumulator: T = initialValue!;

    for (const entry of this) {
      accumulator = callback(accumulator, entry[1], entry[0]);
    }

    return accumulator;
  }
}

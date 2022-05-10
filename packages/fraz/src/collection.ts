export class Collection<K, V> extends Map<K, V> {
    maxSize: number | undefined;

    constructor(entries?: (readonly (readonly [K, V])[] | null) | Map<K, V>, options?: { maxSize?: number }) {
        super(entries ?? []);

        this.maxSize = options?.maxSize;
    }

    set(key: K, value: V) {
        if ((this.maxSize || this.maxSize === 0) && this.size >= this.maxSize) {
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
        return [...this.values()][this.size - 1];
    }

    random(): V | undefined {
        return this.array()[Math.floor(Math.random() * this.size)];
    }

    find(callback: (value: V, key: K) => boolean) {
        let value;

        for (const key of this.keys()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value = this.get(key)!;
            if (callback(value, key)) {
                return value;
            }
        }

        return;
    }

    filter(callback: (value: V, key: K) => boolean) {
        const relevant = new Collection<K, V>();
        let value;

        for (const key of this.keys()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value = this.get(key)!;
            if (callback(value, key)) {
                relevant.set(key, value);
            }
        }

        return relevant;
    }

    map<T>(callback: (value: V, key: K) => T) {
        const results = [];
        let value;

        for (const key of this.keys()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value = this.get(key)!;
            results.push(callback(value, key));
        }

        return results;
    }

    some(callback: (value: V, key: K) => boolean) {
        let value;

        for (const key of this.keys()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value = this.get(key)!;
            if (callback(value, key)) {
                return true;
            }
        }

        return false;
    }

    every(callback: (value: V, key: K) => boolean) {
        let value;

        for (const key of this.keys()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value = this.get(key)!;
            if (!callback(value, key)) {
                return false;
            }
        }

        return true;
    }

    reduce<T>(callback: (accumulator: T, value: V, key: K) => T, initialValue: T): T {
        let accumulator: T = initialValue;
        let value;

        for (const key of this.keys()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value = this.get(key)!;
            accumulator = callback(accumulator, value, key);
        }

        return accumulator;
    }

    retain(fn: (value: V) => boolean): void {
        for (const key of this.keys()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (!fn(this.get(key)!)) {
                this.delete(key);
            }
        }
    }

    isEmpty(): boolean {
        return !(this.size > 0);
    }
}

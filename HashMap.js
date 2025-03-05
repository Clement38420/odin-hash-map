export default class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = Array.from(new Array(this.capacity), () => []);
  }

  get safeCapacity() {
    return this.capacity * this.loadFactor;
  }

  grow() {
    const entries = this.entries();
    this.capacity = this.capacity * 2;
    this.buckets = Array.from(new Array(this.capacity), () => []);
    for (let entry of entries) {
      this.set(entry[0], entry[1]);
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashedKey = this.hash(key);
    const existingPair = this.buckets[hashedKey].find(
      (pair) => pair.key === key,
    );

    if (existingPair) {
      existingPair.value = value;
    } else {
      if (this.length() >= this.safeCapacity) this.grow();
      this.buckets[hashedKey].push({ key, value });
    }
  }

  get(key) {
    const hashedKey = this.hash(key);
    return this.buckets[hashedKey].find((pair) => pair.key === key);
  }

  has(key) {
    const hashedKey = this.hash(key);
    return (
      this.buckets[hashedKey].find((pair) => pair.key === key) !== undefined
    );
  }

  remove(key) {
    const hashedKey = this.hash(key);
    const keyBucket = this.buckets[hashedKey];
    const keyIndex = keyBucket.findIndex((pair) => pair.key === key);
    if (keyIndex === -1) return false;
    else {
      this.buckets[hashedKey].splice(keyIndex, 1);
      return true;
    }
  }

  length() {
    let count = 0;
    for (let bucket of this.buckets) {
      count += bucket.length;
    }
    return count;
  }

  clear() {
    for (let bucket of this.buckets) {
      bucket.length = 0;
    }
  }

  keys() {
    let keys = [];
    for (let bucket of this.buckets) {
      keys = keys.concat(
        bucket.reduce((acc, curr) => {
          return acc.concat([curr.key]);
        }, []),
      );
    }

    return keys;
  }

  values() {
    let values = [];
    for (let bucket of this.buckets) {
      values = values.concat(
        bucket.reduce((acc, curr) => {
          return acc.concat([curr.value]);
        }, []),
      );
    }

    return values;
  }

  entries() {
    let entries = [];
    for (let bucket of this.buckets) {
      entries = entries.concat(
        bucket.reduce((acc, curr) => {
          acc.push([curr.key, curr.value]);
          return acc;
        }, []),
      );
    }

    return entries;
  }
}

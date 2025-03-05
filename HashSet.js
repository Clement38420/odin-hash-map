export default class HashSet {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = Array.from(new Array(this.capacity), () => []);
  }

  get safeCapacity() {
    return this.capacity * this.loadFactor;
  }

  grow() {
    const keys = this.keys();
    this.capacity = this.capacity * 2;
    this.buckets = Array.from(new Array(this.capacity), () => []);
    for (let key of keys) {
      this.set(key);
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

  set(key) {
    const hashedKey = this.hash(key);

    if (this.buckets[hashedKey].indexOf(key) === -1) {
      if (this.length() >= this.safeCapacity) this.grow();
      this.buckets[hashedKey].push(key);
    }
  }

  get(key) {
    const hashedKey = this.hash(key);
    return this.buckets[hashedKey].find((elKey) => elKey === key);
  }

  has(key) {
    const hashedKey = this.hash(key);
    return this.buckets[hashedKey].includes(key);
  }

  remove(key) {
    const hashedKey = this.hash(key);
    const keyBucket = this.buckets[hashedKey];
    const keyIndex = keyBucket.findIndex((elKey) => elKey === key);
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
      keys = keys.concat(bucket);
    }

    return keys;
  }
}

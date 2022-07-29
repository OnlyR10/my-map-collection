class MyMap extends Map {
  constructor() {
    super();
    this.indexesStorage = [];
  }

  set(key, value) {
    super.set(key, value);
    const targetProp = this.indexesStorage.findIndex((item) => item.key === key);
    if (targetProp === -1) {
      this.indexesStorage.push({ key, value });
    } else {
      this.indexesStorage[targetProp] = { key, value };
    }
    return this;
  }

  has(key) {
    return super.has(key);
  }

  hasIndex(index) {
    if (this.indexesStorage[index]) {
      return super.has(this.indexesStorage[index].key);
    }
    return false;
  }

  get(key) {
    return super.get(key);
  }

  getByIndex(index) {
    if (this.indexesStorage[index]) {
      return super.get(this.indexesStorage[index].key);
    }
    return;
  }

  remove(key) {
    super.delete(key);
  }

  size() {
    return super.size;
  }

  forEach(callback) {
    return super.forEach(callback);
  }

  union(...maps) {
    maps.forEach((map) => {
      for (let entry of map) {
        this.set(...entry);
      }
    });
    return this;
  }

  uniq() {
    const set = new Set();
    this.forEach((value) => set.add(value));
    return set;
  }

  uniqKeys() {
    return new Set(super.keys());
  }

  sort(callback) {
    this.indexesStorage.sort((a, b) => callback(a.value, b.value, a.key, b.key));
    this.reconstruct();
  }

  sortIndexes(callback) {
    this.indexesStorage.sort((a, b) => callback(this.indexesStorage.indexOf(a), this.indexesStorage.indexOf(b)));
    this.reconstruct();
  }

  setTo(index, value) {
    const key = Symbol();
    this.indexesStorage.splice(index + 1, 0, { key, value });
    this.reconstruct();
  }

  removeAt(index, count = 1) {
    this.indexesStorage.splice(index + 1, count);
    this.reconstruct();
  }

  reconstruct() {
    super.clear();
    this.indexesStorage.forEach((item) => super.set(item.key, item.value));
  }
}

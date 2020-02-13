"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("tslib");
const Exceptions_1 = require("./Exceptions");
class CacheExpiredException extends Exceptions_1.Exception {
    constructor() {
        super("The cache has expired");
        this.name = "CacheExpiredException";
    }
}
exports.CacheExpiredException = CacheExpiredException;
class CacheItem {
    constructor(value, expiryPolicy) {
        this._value = value;
        this._expiryPolicy = expiryPolicy;
    }
    get value() {
        if (this.expired) {
            throw new CacheExpiredException();
        }
        return this._value;
    }
    get expired() {
        return this._expiryPolicy(this._value);
    }
    get valueAsync() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.expiredAsync) {
                    throw new CacheExpiredException();
                }
                resolve(this._value);
            }
            catch (ex) {
                reject(ex);
            }
        }));
    }
    get expiredAsync() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                resolve(this._expiryPolicy(this._value));
            }
            catch (ex) {
                reject(ex);
            }
        }));
    }
}
exports.CacheItem = CacheItem;
class AsyncCacheItem {
    constructor(promiseOrValue, expiryPolicy) {
        this._promiseOrValue = promiseOrValue;
        this._expiryPolicy = expiryPolicy;
    }
    get valueAsync() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.expiredAsync) {
                    throw new CacheExpiredException();
                }
                resolve(yield this._promiseOrValue);
            }
            catch (ex) {
                reject(ex);
            }
        }));
    }
    get expiredAsync() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                resolve(this._expiryPolicy(yield this._promiseOrValue));
            }
            catch (ex) {
                reject(ex);
            }
        }));
    }
}
exports.AsyncCacheItem = AsyncCacheItem;
class MemoryCache {
    constructor() {
        this._internalCache = new Map();
    }
    add(key, value, expiryPolicy) {
        if (this._internalCache.has(key)) {
            throw new Exceptions_1.KeyAlreadyDefinedException(key);
        }
        this._internalCache.set(key, new CacheItem(value, expiryPolicy));
    }
    addOrGet(key, factory, expiryPolicy) {
        const cacheItem = this._internalCache.get(key);
        if (cacheItem !== undefined && !cacheItem.expired) {
            return cacheItem.value;
        }
        const value = factory(key);
        this._internalCache.set(key, new CacheItem(value, expiryPolicy));
        return value;
    }
    addOrUpdate(key, value, expiryPolicy) {
        this._internalCache.set(key, new CacheItem(value, expiryPolicy));
    }
    clean() {
        this._internalCache.forEach((value, key, map) => {
            if (value.expired) {
                map.delete(key);
            }
        });
    }
    get(key) {
        const cacheItem = this._internalCache.get(key);
        if (cacheItem === undefined) {
            throw new Exceptions_1.KeyNotFoundException(key);
        }
        if (cacheItem.expired) {
            this._internalCache.delete(key);
            throw new Exceptions_1.KeyNotFoundException(key);
        }
        return cacheItem.value;
    }
    tryGet(key) {
        const cacheItem = this._internalCache.get(key);
        if (cacheItem === undefined) {
            return { success: false };
        }
        if (cacheItem.expired) {
            this._internalCache.delete(key);
            return { success: false };
        }
        return { success: true, value: cacheItem.value };
    }
    update(key, value, expiryPolicy) {
        if (!this._internalCache.has(key)) {
            throw new Exceptions_1.KeyNotFoundException(key);
        }
        this._internalCache.set(key, new CacheItem(value, expiryPolicy));
    }
}
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=Cache.js.map
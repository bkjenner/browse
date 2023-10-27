Rules.prototype.cacheGetHashKeys = function (input) {
    return new Promise((resolve, reject) => {
        if (input.hash) {
            cache.getHashKeys(input.hash).then((val) => {
                resolve(val);
            });
        } else {
            reject(new Error("hash and name must be provided"));
        }
    });
};

Rules.prototype.cacheDeleteHashKey = function (input) {
    return new Promise((resolve, reject) => {
        if (input.hash && input.key) {
            cache.deleteHashKey(input.hash, input.key).then((val) => {
                resolve(val);
            });
        } else {
            reject(new Error("Hash and key must be provided."));
        }
    });
};

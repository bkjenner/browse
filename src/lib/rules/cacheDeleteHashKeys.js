Rules.prototype.cacheDeleteHashKeys = function (input) {
    return new Promise((resolve, reject) => {
        if (input.hash) {
            r.cacheGetHashKeys({ hash: input.hash }).then((keys) => {
                return Promise.each(keys, (k) => {
                    return r.cacheDeleteHashKey({ hash: input.hash, key: k });
                }).then(() => {
                    resolve();
                });
            });
        } else {
            reject(new Error("Hash must be provided."));
        }
    });
};

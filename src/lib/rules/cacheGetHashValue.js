Rules.prototype.cacheGetHashValue = function (input) {
    return new Promise((resolve, reject) => {
        if (input.hash && input.name) {
            console.time("Retrieving Hash Cache");
            cache.getHashValue(input.hash, input.name).then((val) => {
                console.timeEnd("Retrieving Hash Cache");
                resolve(val);
            });
        } else {
            reject(new Error("hash and name must be provided"));
        }
    });
};

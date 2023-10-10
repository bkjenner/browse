Rules.prototype.primeReactTableSaveLayout = function (input) {
    return new Promise((resolve, reject) => {
        if (input && input.layoutMeta && input.key) {
            console.log('saved to cache '+input.key);
            console.log(input.layoutMeta);
            cache.setHashValue("layoutMeta", input.key, JSON.stringify(input.layoutMeta));
            resolve();
        }
        else{
            console.log('Failed! Missing layoutMeta input');
            resolve();
        }
    });
};

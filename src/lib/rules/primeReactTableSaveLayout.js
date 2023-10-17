Rules.prototype.primeReactTableSaveLayout = function (input) {
    return new Promise((resolve, reject) => {
        if (input && input.layoutMeta && input.layoutName) {
            console.log('saved to cache '+input.layoutName);
            console.log(input.layoutMeta);
            cache.setHashValue("layoutMeta", input.layoutName, JSON.stringify(input.layoutMeta));
            resolve();
        }
        else{
            console.log('Failed! Missing layoutMeta input');
            resolve();
        }
    });
};

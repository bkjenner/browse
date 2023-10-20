Rules.prototype.primeReactTableFetchLayout = function (input) {
    return new Promise((resolve, reject) => {
        console.log('fetch all layoutMeta from redis cache');
        return cache.getAllHashValues("layoutMeta")
        .then((list)=>{
            let res = []
            for (let k in list) {
                // console.log(k);
                // console.log(JSON.parse(list[k]));
                res.push(
                    {
                        name: k,
                        value: JSON.parse(list[k])
                    }
                );
            }
            
            resolve(_.orderBy(res, ['name'], ['desc']))
        })
    });
};

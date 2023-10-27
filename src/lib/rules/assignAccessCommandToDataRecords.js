Rules.prototype.assignAccessCommandToDataRecords = function (input) {
    return new Promise((resolve, reject) => {
        // testing rule to inject a dummy command group value into fetched data
        // to test around the command group access 
        // console.log(input);
        let res =[];
        if (input.data && input.data.length >0 && input.execUserId) {

            return r.cacheGetHashValue({
                hash: 'userGroup:'+ input.execUserId,
                name: 'userGroup',
            })
            .then((userGroup)=>{
                //userGroup -> "staff-admin"
                userGroup = userGroup.split('-');
                return Promise.each(input.data, (ele) => {
                    let actionList = [];
                    return cache.getAllHashValues('dataGroup:'+ ele.dataRecordGroup)
                    .then((data)=>{
                        // data -> { visitor: 'view', staff: 'view-edit', admin: 'view-edit-delete' }
                        // console.log(data);
                        userGroup.forEach((ug)=>{
                            
                            if(data[ug]){
                                actionList.push(...data[ug].split('-'));
                            }
                            
                        });
                        let uniList = _.uniq(actionList);
                        res.push({
                            ...ele,
                            accessibleActions:uniList.join('-'),
                        })
                    })
                })
                .then(()=>{
                    resolve(res);
                })
            })
            
            
        } else {
            console.log("Failed to assign access commands");
            resolve(input.data);
        }
    });
};

Rules.prototype.orgsGroupInsertDummyRecords = function (input) {
    return new Promise((resolve, reject) => {
        // testing rule to insert dummy user command group values into redis cache

        //pretend fetched the below OrgStructure data from the db
        let userGroupForUsers = [
            {
                userID:1000000, //publicUserAccount from setting
                userGroups:[
                    'visitor',
                    'staff', // can View and Edit
                    'admin', // staff has all access that vistor and staff had
                    // ... potentially more groups if necessary
                ]
            },
            {
                userID:1000001, 
                userGroups:[
                    'visitor',
                ]
            },
            //..... a list for all user IDs
        ];

        let dataGroupForAccess = [
            {
                dataGroup: 'DataRecordGroup1',
                // list of user groups that has access to
                acl: [
                    {
                        userGroupName: 'visitor',
                        commandList: ['View']
                    },
                    {
                        userGroupName: 'staff',
                        commandList: ['View', 'Edit']
                    },
                    {
                        userGroupName: 'admin',
                        commandList: ['View', 'Edit', 'Delete']
                    },
                ]
            },
            {
                dataGroup: 'DataRecordGroup2',
                // list of user groups that has access to
                acl: [
                    {
                        userGroupName: 'staff',
                        commandList: ['View']
                    },
                    {
                        userGroupName: 'admin',
                        commandList: ['View', 'Edit']
                    },
                ]
            },
            {
                dataGroup: 'DataRecordGroup3',
                // list of user groups that has access to
                acl: [
                    {
                        userGroupName: 'admin',
                        commandList: ['View']
                    },
                ]
            },


        ];

        // and each data records has an extra DataRecordGroup columns to store access control list
        

        // redis-cli hset userModules:905 cache registeredusers-member
        
        return Promise.each(userGroupForUsers, (ele) => {
            return r.cacheDeleteHashKeys({ hash: "userGroup:" + ele.userID.toString() })
            .then(() => {
                return cache.setHashValue("userGroup:" + ele.userID.toString(), 'userGroup', ele.userGroups.join('-'));
            });
            
        })
        .then(()=>{
            return Promise.each(dataGroupForAccess, (ele) => {
                return r.cacheDeleteHashKeys({ hash: "dataGroup:" + ele.dataGroup })
                .then(() => {
                    if(ele.acl && ele.acl.length>0){
                        return Promise.each(ele.acl, (userGroup) => {
                            return cache.setHashValue("dataGroup:" + ele.dataGroup, userGroup.userGroupName, userGroup.commandList.join('-'));
                        })
                    }
                });  
            })
        })
        .then(()=>{
            resolve();
        })
    });
};
Rules.prototype.commandGroupAccessTest = function (input) {
    return new Promise((resolve, reject) => {
        // testing rule to inject a dummy command group value into fetched data
        // to test around the command group access 
        // console.log(input);

        if (input && input.dataFetchRule) {
            return r[input.dataFetchRule]({
                ...input
            })
            .then((data)=>{
                let res=[];
                // assign dummy dataGroup to each row record.
                // in reality, it should come with rest of the data from DB fetch result
                if(data.activities && data.activities.length >0){
                    data.activities.forEach((ele)=>{
                        // assign data record to a dummy group based on last digit of ID
                        let offset = ele.id && parseInt(ele.id.toString().slice(-1))%2 == 0 
                            ? 1 
                            : ele.id && parseInt(ele.id.toString().slice(-1))%3 == 0
                            ? 3
                            : 2
                        res.push({
                            ...ele,
                            dataRecordGroup:`DataRecordGroup${offset}`,
                        });
                    })
                    data.activities = res;
                }


                // before resolving fetched data,
                // do a loop through rows and assign the accessible actions to each record based on current user's userGroup
                return r.assignAccessCommandToDataRecords({data: data.activities, execUserId:input.execUserId})
                .then((res)=>{
                    data.activities = res;
                    resolve(data);
                })

                
            })
            
        } else {
            console.log("Failed! Missing dataFetchRule input");
            resolve();
        }
    });
};

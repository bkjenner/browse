Rules.prototype.testGetMemberForDynamicRendering = function (input) {
    return new Promise((resolve, reject) => {
        if (input) {
            console.log(moment().local().format("s"));
            Db.models.client
                .findAll({
                    raw: true,
                    nest: true, // without nest render all return table data in one object
                    where: {
                        recordstatus: "A",
                        clientnumber: { [Op.like]: `%${moment().local().format("ss").slice(-1)}` } 
                    },
                    limit: 50,
                    attributes: ['id', 'clientnumber','clientname'],
                    include: [
                        {
                            model: Db.models.member,
                            as: "member",
                            where: { 
                                firstmembcountrydate: { [Op.between]: ["2022-01-01", "2023-12-31"] } 
                            },
                            attributes: ['registeredname', 'firstmembcountrydate'],
                            required: true,
                            include: [
                                {
                                    model: Db.models.referencefields,
                                    as: "memberstatus",
                                    required: false,
                                    attributes: ['description'],
                                },
                                {
                                    model: Db.models.referencefields,
                                    as: "membersubstatus",
                                    required: false,
                                    attributes: ['description'],
                                },
                                {
                                    model: Db.models.referencefields,
                                    as: "membersubstatusreason",
                                    required: false,
                                    attributes: ['description'],
                                },
                                // {
                                //     model: Db.models.membercondition,
                                //     as: "membermembercondition",
                                //     required: false,
                                // },
                            ]
                        }
                    ],
                })
                .then((members) => {
                    resolve(members);
                });
        }
    });
};

Rules.prototype.testGetMember = function (input) {
    return new Promise((resolve, reject) => {
        if (input) {
            Db.models.client
                .findAll({
                    raw: true,
                    where: {
                        recordstatus: "A",
                    },
                    include: [
                        {
                            model: Db.models.member,
                            as: "member",
                            where: { 
                                firstmembcountrydate: { [Op.between]: ["2022-01-01", "2022-12-31"] } 
                            },
                            // attributes: [],
                            required: true,
                            include: [
                                {
                                    model: Db.models.referencefields,
                                    as: "memberstatus",
                                    required: false,
                                },
                                {
                                    model: Db.models.referencefields,
                                    as: "membersubstatus",
                                    required: false,
                                },
                                {
                                    model: Db.models.referencefields,
                                    as: "membersubstatusreason",
                                    required: false,
                                },
                                {
                                    model: Db.models.membercondition,
                                    as: "membermembercondition",
                                    required: false,
                                },
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

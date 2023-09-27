module.exports = {
    Query: {
        clients: (instance, args, context, info) => {
            let query = {};
            let includes = [];

            if (args?.clientname) {
                query["clientname"] = {
                    [context.Op.like]: `%${args.clientname}%`,
                };
            }

            if (args?.employed == true) {
                includes.push({
                    model: context.models.memberemployment,
                    as: "clientmemberemployment",
                    where: {
                        iscurrent: true,
                        recordstatus: "A",
                    },
                });
            }

            return context.models.client.findAll({
                where: { ...query, recordstatus: "A" },
                include: includes,
                limit: 10,
            });
        },
        client: (instance, args, context, info) => {
            return context.models.client.findOne({
                where: {
                    clientnumber: args.clientnumber,
                },
                include: [
                    { model: context.models.member, as: "member" },
                    { model: context.models.clientaddress, as: "addresses" },
                ],
            });
        },
    },
};

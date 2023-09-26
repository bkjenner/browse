module.exports = {
    Query: {
        clients: (instance, args, context, info) => {
            const { filter } = args;
            let query = {};

            if (filter?.clientname) {
                query["clientname"] = {
                    [context.Op.like]: `%${filter.clientname}%`,
                };
            }

            return context.models.client.findAll({
                where: { ...query, recordstatus: "A" },
                include: [
                    { model: context.models.member, as: "member" },
                    { model: context.models.clientaddress, as: "addresses" },
                ],
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

module.exports = {
    Query: {
        members: (instance, args, context, info) => {
            const { filter } = args;
            let query = {};

            if (args.refclientstatusid) {
                query["refclientstatusid"] = parseInt(args.refclientstatusid);
            }

            return context.models.member.findAll({
                where: { ...query, recordstatus: "A" },
                limit: parseInt(args.limit) ? parseInt(args.limit) : 100,
            });
        },
        member: (instance, args, context, info) => {
            return context.models.member.findOne({
                where: {
                    clientid: args.clientid,
                    recordstatus: "A",
                },
            });
        },
    },
};

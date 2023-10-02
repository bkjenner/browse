module.exports = {
    Query: {
        offices: (instance, args, context, info) => {
            let query = {};
            let includes = [];

            if (args) {
                query = context.constructQuery(args.filter);
            }

            return context.models.office.findAll({
                where: { ...query, recordstatus: "A" },
                limit: parseInt(args.limit) ? parseInt(args.limit) : 100,
                include: includes,
            });
        },
    },
};

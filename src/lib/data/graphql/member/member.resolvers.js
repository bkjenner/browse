module.exports = {
    Query: {
        members: (instance, args, context, info) => {
            let query = {};
            let includes = [];

            if (args) {
                query = context.constructQuery(args.filter);

                if (args.client) {
                    includes.push({ model: context.models.client, as: "client", where: context.constructQuery(args.client) });
                }

                if (args.clientaddress) {
                    includes.push({ model: context.models.clientaddress, as: "clientaddress", where: context.constructQuery(args.clientaddress) });
                }

                if (args.memberemployment) {
                    includes.push({
                        model: context.models.memberemployment,
                        as: "memberemployment",
                        where: context.constructQuery(args.memberemployment),
                    });
                }

                if (args.memberduestatushistory) {
                    includes.push({
                        model: context.models.memberduestatushistory,
                        as: "memberduestatushistory",
                        where: context.constructQuery(args.memberduestatushistory),
                    });
                }
            }

            return context.models.member.findAll({
                logging: console.log,
                where: { ...query, recordstatus: "A" },
                limit: parseInt(args.limit) ? parseInt(args.limit) : 100,
                include: includes,
            });
        },
        // member: (instance, args, context, info) => {
        //     return context.models.member.findOne({
        //         where: {
        //             clientid: args.clientid,
        //             recordstatus: "A",
        //         },
        //     });
        // },
    },
};

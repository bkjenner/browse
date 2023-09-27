module.exports = {
    Query: {
        members: (instance, args, context, info) => {
            let query = {};
            let includes = [];

            if (args) {
                if (args.member?.registeredname) {
                    query.registeredname = {
                        [context.Op.like]: `${args.member.registeredname}%`,
                    };
                }

                if (args.member?.cicano) {
                    query.cicano = {
                        [context.Op.like]: `${args.input.cicano}%`,
                    };
                }

                let clientQuery = { recordstatus: "A" };
                if (args.client) {
                    context._.map(args.client, (v, k) => {
                        clientQuery[k] = v;
                    });
                }

                includes.push({ model: context.models.client, as: "client", where: clientQuery });

                let addressQuery = { recordstatus: "A" };
                if (args.address) {
                    context._.map(args.address, (v, k) => {
                        addressQuery[k] = v;
                    });
                }
                includes.push({ model: context.models.clientaddress, as: "memberclientaddress", where: addressQuery });

                if (args.input?.employed == true) {
                    includes.push({
                        model: context.models.memberemployment,
                        as: "memberemployment",
                        where: {
                            iscurrent: true,
                            recordstatus: "A",
                        },
                    });
                }
            }

            return context.models.member.findAll({
                where: { ...query, recordstatus: "A" },
                limit: parseInt(args.limit) ? parseInt(args.limit) : 100,
                include: includes,
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

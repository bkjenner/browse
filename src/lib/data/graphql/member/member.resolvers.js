const Db = require("../../models");
const { Op } = require("sequelize");

module.exports = {
    Query: {
        members: (instance, args, context, info) => {
            let query = {};

            if (args.refclientstatusid) {
                query["refclientstatusid"] = parseInt(args.refclientstatusid);
            }

            return Db.models.member.findAll({ where: { ...query, recordstatus: "A" }, limit: parseInt(args.limit) ? parseInt(args.limit) : 100 });
        },
        member: (instance, args, context, info) => {
            return Db.models.member.findOne({
                where: {
                    clientid: args.clientid,
                    recordstatus: "A",
                },
            });
        },
    },
};

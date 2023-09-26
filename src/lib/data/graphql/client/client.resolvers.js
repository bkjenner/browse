const Db = require("../../models");
const { Op } = require("sequelize");

module.exports = {
    Query: {
        clients: (instance, args, context, info) => {
            let query = {};

            if (args.clientname) {
                query["clientname"] = {
                    [Op.like]: `%${args.clientname}%`,
                };
            }

            return Db.models.client.findAll({
                where: { ...query, recordstatus: "A" },
                include: [
                    { model: Db.models.member, as: "member" },
                    { model: Db.models.clientaddress, as: "addresses" },
                ],
            });
        },
        client: (instance, args, context, info) => {
            return Db.models.client.findOne({
                where: {
                    clientnumber: args.clientnumber,
                },
                include: [
                    { model: Db.models.member, as: "member" },
                    { model: Db.models.clientaddress, as: "addresses" },
                ],
            });
        },
    },
};

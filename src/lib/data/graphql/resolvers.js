const Db = require("../models");
const { Op } = require("sequelize");

const resolvers = {
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
        members: (instance, args, context, info) => {
            let query = {};

            if (args.refclientstatusid) {
                query["refclientstatusid"] = parseInt(args.refclientstatusid);
            }

            return Db.models.member.findAll({ where: { ...query, recordstatus: "A" }, limit: parseInt(args.limit) ? parseInt(args.limit) : 100 });
        },
        referencefield: (instance, args, context, info) => {
            return Db.models.referencefields.findOne({
                where: {
                    id: args.id,
                    recordstatus: "A",
                },
            });
        },
    },
    ReferenceField: {
        description: (instance, args, context, info) => {
            return Db.models.referencefields
                .findOne({
                    where: {
                        id: parseInt(instance),
                        recordstatus: "A",
                    },
                })
                .then((field) => {
                    if (field && field.description) {
                        return field.description;
                    }
                });
        },
    },
};

module.exports = resolvers;

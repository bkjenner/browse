const Db = require("../../models");
const { Op } = require("sequelize");

module.exports = {
    Query: {
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

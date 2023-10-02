const { GraphQLScalarType, Kind } = require("graphql");
const moment = require("moment");
const Db = require("../../models");
const cache = require("../../../framework/cache");

module.exports = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        serialize(value) {
            return moment(value).local().format("MM/DD/YYYY");
        },
        parseValue(value) {
            if (typeof value === "number") {
                return moment(value).local().format("YYYY-MM-DD HH:mm:ss");
            }
            throw new Error("GraphQL Date Scalar parser expected a `number`");
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // Convert hard-coded AST string to integer and then to Date
                return new Date(parseInt(ast.value, 10));
            }
            // Invalid hard-coded value (not an integer)
            return null;
        },
    }),
    ReferenceField: new GraphQLScalarType({
        name: "ReferenceField",
        description: "Reference field with description",
        serialize(value) {
            return new Promise((resolve, reject) => {
                cache.getHashValue("referencefields", value).then((match) => {
                    if (match) {
                        resolve(match);
                    } else {
                        return Db.models.referencefields
                            .findOne({
                                attributes: ["description"],
                                where: {
                                    id: value,
                                    recordstatus: "A",
                                },
                            })
                            .then((ref) => {
                                cache.setHashValue("referencefields", value, ref.description);

                                resolve(ref.description);
                            });
                    }
                });
            });
        },
        parseValue(value) {
            if (typeof value === "number") {
                return moment(value).local().format("YYYY-MM-DD HH:mm:ss");
            }
            throw new Error("GraphQL Date Scalar parser expected a `number`");
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // Convert hard-coded AST string to integer and then to Date
                return new Date(parseInt(ast.value, 10));
            }
            // Invalid hard-coded value (not an integer)
            return null;
        },
    }),
};

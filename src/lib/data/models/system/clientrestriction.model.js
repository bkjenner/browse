const clientrestriction = db.define(
    "clientrestriction",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        restrictionenddate: { type: Sequelize.DATE },
        notes: { type: Sequelize.STRING(4000) },
        refrestrictionid: { type: Sequelize.INTEGER },
        refrestrictionsourceid: { type: Sequelize.INTEGER },
        refrestrictionstatusid: { type: Sequelize.INTEGER },
        restrictionstartdate: { type: Sequelize.DATE },
        transactiondate: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.STRING(1) },
        recordstatus: {
            type: Sequelize.STRING,
            defaultValue: "A",
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hasTrigger: true,
    },
);

clientrestriction.associate = function (db) {
    db.models.clientrestriction.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "restrictionclient",
    });
    db.models.clientrestriction.belongsTo(db.models.referencefields, {
        foreignKey: "refrestrictionid",
        constraints: false,
        unique: false,
        as: "clientrestrictionrestriction",
    });
    db.models.clientrestriction.belongsTo(db.models.referencefields, {
        foreignKey: "refrestrictionsourceid",
        constraints: false,
        unique: false,
        as: "clientrestrictionsource",
    });
    db.models.clientrestriction.belongsTo(db.models.referencefields, {
        foreignKey: "refrestrictionstatusid",
        constraints: false,
        unique: false,
        as: "clientrestrictionstatus",
    });
};

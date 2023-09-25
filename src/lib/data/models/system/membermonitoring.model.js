const membermonitoring = db.define(
    "membermonitoring",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        actualcompletiondate: { type: Sequelize.DATE },
        clientid: { type: Sequelize.INTEGER },
        completionduedate: { type: Sequelize.DATE },
        description: { type: Sequelize.STRING(500) },
        effectivedate: { type: Sequelize.DATE },
        notes: { type: Sequelize.STRING(4000) },
        refmonitoringsourceid: { type: Sequelize.INTEGER },
        refmonitoringstatusid: { type: Sequelize.INTEGER },
        isvisibletopublic: { type: Sequelize.BOOLEAN },
        updatecount: { type: Sequelize.INTEGER },
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

membermonitoring.associate = function (db) {
    db.models.membermonitoring.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "monitoringmember",
    });
    db.models.membermonitoring.belongsTo(db.models.referencefields, {
        foreignKey: "refmonitoringsourceid",
        constraints: false,
        unique: false,
        as: "membermonitoringsource",
    });
    db.models.membermonitoring.belongsTo(db.models.referencefields, {
        foreignKey: "refmonitoringstatusid",
        constraints: false,
        unique: false,
        as: "membermonitoringstatus",
    });
};

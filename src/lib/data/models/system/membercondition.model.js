const membercondition = db.define(
    "membercondition",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        actualcompletiondate: { type: Sequelize.DATE },
        clientid: { type: Sequelize.INTEGER },
        completionduedate: { type: Sequelize.DATE },
        effectivedate: { type: Sequelize.DATE },
        notes: { type: Sequelize.STRING(4000) },
        refconditionsid: { type: Sequelize.INTEGER },
        refconditionsourceid: { type: Sequelize.INTEGER },
        refconditionstatusid: { type: Sequelize.INTEGER },
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

membercondition.associate = function (db) {
    db.models.membercondition.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "conditionmember",
    });
    db.models.membercondition.belongsTo(db.models.member, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "memberconditionmember",
    });
    db.models.membercondition.belongsTo(db.models.referencefields, {
        foreignKey: "refconditionsid",
        constraints: false,
        unique: false,
        as: "memberconditioncondition",
    });
    db.models.membercondition.belongsTo(db.models.referencefields, {
        foreignKey: "refconditionsourceid",
        constraints: false,
        unique: false,
        as: "memberconditionsource",
    });
    db.models.membercondition.belongsTo(db.models.referencefields, {
        foreignKey: "refconditionstatusid",
        constraints: false,
        unique: false,
        as: "memberconditionstatus",
    });
};

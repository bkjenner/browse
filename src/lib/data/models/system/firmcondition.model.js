const firmcondition = db.define(
    "firmcondition",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        condition: { type: Sequelize.STRING(500) },
        conditionenddate: { type: Sequelize.DATE },
        refconditionsourceid: { type: Sequelize.INTEGER },
        refconditionstatusid: { type: Sequelize.INTEGER },
        conditionstartdate: { type: Sequelize.DATE },
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

const clientcondition = db.define(
    "clientcondition",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        condition: { type: Sequelize.STRING(1000) },
        refconditionsourceid: { type: Sequelize.INTEGER },
        refconditionstatusid: { type: Sequelize.INTEGER },
        conditionstartdate: { type: Sequelize.DATE },
        conditionenddate: { type: Sequelize.DATE },
        transactiondate: { type: Sequelize.DATE },
        notes: { type: Sequelize.STRING(2000) },
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

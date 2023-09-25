const cpdactionplan = db.define(
    "cpdactionplan",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        agreedduedate: { type: Sequelize.DATE },
        approveddate: { type: Sequelize.DATE },
        clientidmember: { type: Sequelize.INTEGER },
        clientidreviewer: { type: Sequelize.INTEGER },
        cpdyear: { type: Sequelize.INTEGER },
        followupdate: { type: Sequelize.DATE },
        followupnotes: { type: Sequelize.STRING("MAX") },
        notes: { type: Sequelize.STRING("MAX") },
        refonactionplanid: { type: Sequelize.INTEGER },
        refplanenteredid: { type: Sequelize.INTEGER },
        refplanstatusid: { type: Sequelize.INTEGER },
        refpriorityid: { type: Sequelize.INTEGER },
        transactiondate: { type: Sequelize.DATE },
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

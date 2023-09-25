const memberdesignation = db.define(
    "memberdesignation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        memberid: { type: Sequelize.INTEGER },
        receiveddate: { type: Sequelize.DATE },
        recordstatus: { type: Sequelize.CHAR(1) },
        refdesignationid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
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

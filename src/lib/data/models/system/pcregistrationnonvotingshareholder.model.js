const pcregistrationnonvotingshareholder = db.define(
    "pcregistrationnonvotingshareholder",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationaddressid: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        classofshares: { type: Sequelize.STRING(500) },
        clientidnonvotingshareholder: { type: Sequelize.STRING(500) },
        clientidrelatedvotingshareholder: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(500) },
        numberofshares: { type: Sequelize.INTEGER },
        refrelationshiptypeid: { type: Sequelize.INTEGER },
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

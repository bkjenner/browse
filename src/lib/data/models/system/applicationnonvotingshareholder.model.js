const applicationnonvotingshareholder = db.define(
    "applicationnonvotingshareholder",
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
        firstname: { type: Sequelize.STRING(500) },
        lastname: { type: Sequelize.STRING(500) },
        clientnumber: { type: Sequelize.INTEGER },
        linkedentitynumber: { type: Sequelize.INTEGER },
        linkedentityclientid: { type: Sequelize.INTEGER },
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

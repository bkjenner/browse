const pcregistrationvotingshareholder = db.define(
    "pcregistrationvotingshareholder",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        classofshares: { type: Sequelize.STRING(500) },
        clientidshareholder: { type: Sequelize.INTEGER },
        membershipnumber: { type: Sequelize.STRING(500) },
        name: { type: Sequelize.STRING(500) },
        numberofshares: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        applicationaddressid: { type: Sequelize.INTEGER },
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

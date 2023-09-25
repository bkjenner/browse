const applicationdirectors = db.define(
    "applicationdirectors",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        membershipnumber: { type: Sequelize.STRING(500) },
        name: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        applicationaddressid: { type: Sequelize.INTEGER },
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

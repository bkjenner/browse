const applicationllpannualdeclaration = db.define(
    "applicationllpannualdeclaration",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        plisufficient: { type: Sequelize.BOOLEAN },
        authorized: { type: Sequelize.BOOLEAN },
        adviseregistrar: { type: Sequelize.BOOLEAN },
        is4ormorecharteredaccountants: { type: Sequelize.BOOLEAN },
        goodstanding: { type: Sequelize.BOOLEAN },
        applicationid: { type: Sequelize.INTEGER },
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

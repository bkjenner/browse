const applicationclienties8 = db.define(
    "applicationclienties8",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
        explanation: { type: Sequelize.STRING(4000) },
        iscompliant: { type: Sequelize.BOOLEAN },
        recordstatus: { type: Sequelize.STRING(1) },
        updatecount: { type: Sequelize.INTEGER },
        declarationdate: { type: Sequelize.DATE },
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

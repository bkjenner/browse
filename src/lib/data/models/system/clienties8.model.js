const clienties8 = db.define(
    "clienties8",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
        iscompliant: { type: Sequelize.BOOLEAN },
        explanation: { type: Sequelize.STRING(4000) },
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

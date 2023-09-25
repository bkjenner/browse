const processaction = db.define(
    "processaction",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: { type: Sequelize.STRING(200) },
        event: { type: Sequelize.STRING(200) },
        name: { type: Sequelize.STRING(100) },
        processid: { type: Sequelize.INTEGER },
        rule: { type: Sequelize.STRING(200) },
        updatecount: { type: Sequelize.INTEGER },
        updatedate: { type: Sequelize.DATE },
        recordstatus: {
            type: Sequelize.STRING(1),
            defaultValue: "A",
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hasTrigger: true,
    },
);

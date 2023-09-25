const siteaction = db.define(
    "siteaction",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: { type: Sequelize.STRING(200) },
        parentid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(200) },
        url: { type: Sequelize.STRING(200) },
        command: { type: Sequelize.STRING(200) },
        sequence: { type: Sequelize.INTEGER },
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

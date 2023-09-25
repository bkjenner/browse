const setting = db.define(
    "setting",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        environment: { type: Sequelize.STRING(20) },
        identityid: { type: Sequelize.INTEGER },
        prompt: { type: Sequelize.BOOLEAN },
        setting1: { type: Sequelize.STRING(100) },
        setting2: { type: Sequelize.STRING(100) },
        setting3: { type: Sequelize.STRING(100) },
        setting4: { type: Sequelize.STRING(150) },
        setting5: { type: Sequelize.STRING(100) },
        setting6: { type: Sequelize.STRING(100) },
        setting7: { type: Sequelize.STRING(100) },
        setting8: { type: Sequelize.STRING(100) },
        settingname: { type: Sequelize.STRING(100) },
        tier: { type: Sequelize.STRING(20) },
        updatecount: { type: Sequelize.INTEGER },
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

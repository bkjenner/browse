const employmentjobtitle = db.define(
    "employmentjobtitle",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        changehistoryid: { type: Sequelize.INTEGER },
        cpacid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(100) },
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

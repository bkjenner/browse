const message = db.define(
    "message",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subject: { type: Sequelize.STRING(4000) },
        content: { type: Sequelize.STRING(4000) },
        active: { type: Sequelize.BOOLEAN },
        dateavailable: { type: Sequelize.DATE },
        dateexpires: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
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

const relationship = db.define(
    "relationship",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comments: { type: Sequelize.TEXT },
        effectivefrom: { type: Sequelize.DATE },
        effectiveto: { type: Sequelize.DATE },
        primaryclientid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        refrelationshipid: { type: Sequelize.INTEGER },
        secondaryclientid: { type: Sequelize.INTEGER },
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

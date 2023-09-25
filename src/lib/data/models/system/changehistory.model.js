const changehistory = db.define(
    "changehistory",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        commandid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(200) },
        rowid: { type: Sequelize.INTEGER },
        rowrecordid: { type: Sequelize.INTEGER },
        contactid: { type: Sequelize.INTEGER },
        comments: { type: Sequelize.STRING(4000) },
        extendedlog: { type: Sequelize.STRING(4000) },
        logdate: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        changehistoryidundo: { type: Sequelize.INTEGER },
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

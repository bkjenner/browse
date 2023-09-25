const memberapplicationdocument = db.define(
    "memberapplicationdocument",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        filename: { type: Sequelize.STRING(500) },
        filetype: { type: Sequelize.STRING(100) },
        filepath: { type: Sequelize.STRING(3000) },
        memberapplicationid: { type: Sequelize.INTEGER },
        foldername: { type: Sequelize.STRING(500) },
        folderpath: { type: Sequelize.STRING(500) },
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

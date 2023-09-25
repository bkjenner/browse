const document = db.define(
    "document",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createdby: { type: Sequelize.INTEGER },
        createddate: { type: Sequelize.DATE },
        filename: { type: Sequelize.STRING(200) },
        filepath: { type: Sequelize.STRING(3000) },
        filetype: { type: Sequelize.STRING(100) },
        foldername: { type: Sequelize.STRING(200) },
        folderpath: { type: Sequelize.STRING(3000) },
        linkedtorowid: { type: Sequelize.STRING(100) },
        linkedtotable: { type: Sequelize.STRING(200) },
        modifieddate: { type: Sequelize.DATE },
        parentfolderid: { type: Sequelize.INTEGER },
        parentfolderpath: { type: Sequelize.STRING(3000) },
        updatecount: { type: Sequelize.INTEGER },
        uploadeddate: { type: Sequelize.DATE },
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

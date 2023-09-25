const downloadableforms = db.define(
    "downloadableforms",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documentid: { type: Sequelize.INTEGER },
        formname: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        category: { type: Sequelize.STRING(500) },
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

downloadableforms.associate = function (db) {
    db.models.downloadableforms.hasOne(db.models.document, {
        foreignKey: "id",
        constraints: false,
        unique: false,
    });
};

const processstatecache = db.define(
    "processstatecache",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        processstateid: { type: Sequelize.INTEGER },
        cacheid: { type: Sequelize.STRING(200) },
        data: { type: Sequelize.TEXT },
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

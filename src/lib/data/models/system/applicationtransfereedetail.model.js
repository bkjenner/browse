const applicationtransfereedetail = db.define(
    "applicationtransfereedetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationaddressid: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING("MAX") },
        updatecount: { type: Sequelize.INTEGER },
        description: { type: Sequelize.STRING(500) },
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

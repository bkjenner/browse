const pspderegistrationtransfereedetail = db.define(
    "pspderegistrationtransfereedetail",
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

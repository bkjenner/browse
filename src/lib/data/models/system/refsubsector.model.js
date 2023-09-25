const refsubsector = db.define(
    "refsubsector",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: { type: Sequelize.STRING(75) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refsectorid: { type: Sequelize.INTEGER },
        shortcode: { type: Sequelize.STRING(2) },
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

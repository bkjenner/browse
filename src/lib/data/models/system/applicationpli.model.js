const applicationpli = db.define(
    "applicationpli",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        ispliinplace: { type: Sequelize.BOOLEAN },
        pliinsurername: { type: Sequelize.STRING(500) },
        plipolicynumber: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        declarationdate: { type: Sequelize.DATE },
        documentplipolicy: { type: Sequelize.STRING(200) },
        hasinsurerchanged: { type: Sequelize.BOOLEAN },
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

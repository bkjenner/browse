const professionalliabilityinsurance = db.define(
    "professionalliabilityinsurance",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        declarationdate: { type: Sequelize.DATE },
        insurername: { type: Sequelize.STRING(500) },
        policynumber: { type: Sequelize.STRING(500) },
        refplistatusid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
        officeid: { type: Sequelize.INTEGER },
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

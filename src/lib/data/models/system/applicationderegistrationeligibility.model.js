const applicationderegistrationeligibility = db.define(
    "applicationderegistrationeligibility",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        auditengagement: { type: Sequelize.BOOLEAN },
        reviewengagement: { type: Sequelize.BOOLEAN },
        specifiedauditingprocedureengagement: { type: Sequelize.BOOLEAN },
        compilationengagement: { type: Sequelize.BOOLEAN },
        adviceinterpretationfiling: { type: Sequelize.BOOLEAN },
        accountingservices: { type: Sequelize.BOOLEAN },
        forensicservices: { type: Sequelize.BOOLEAN },
        businessvaluation: { type: Sequelize.BOOLEAN },
        insolvency: { type: Sequelize.BOOLEAN },
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

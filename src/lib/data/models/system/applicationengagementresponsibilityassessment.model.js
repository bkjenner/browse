const applicationengagementresponsibilityassessment = db.define(
    "applicationengagementresponsibilityassessment",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        refengagementresponsibilityid: { type: Sequelize.INTEGER(4) },
        compilationreport: { type: Sequelize.INTEGER },
        auditorreport: { type: Sequelize.INTEGER },
        reviewengagementreport: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER(4) },
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

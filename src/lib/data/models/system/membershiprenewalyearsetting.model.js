const membershiprenewalyearsetting = db.define(
    "membershiprenewalyearsetting",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        declarationduedate: { type: Sequelize.DATE },
        declarationstartdate: { type: Sequelize.DATE },
        feeduedate: { type: Sequelize.DATE },
        feestartdate: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
        auditdeadline: { type: Sequelize.DATE },
        auditdownload: { type: Sequelize.STRING(255) },
        updatecount: { type: Sequelize.INTEGER },
        updatedate: { type: Sequelize.DATE },
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

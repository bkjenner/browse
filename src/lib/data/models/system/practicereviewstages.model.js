const practicereviewstages = db.define(
    "practicereviewstages",
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        practicereviewid: { type: Sequelize.INTEGER },
        stage: { type: Sequelize.INTEGER },
        invoicenumber: { type: Sequelize.STRING("15") },
        reviewdate: { type: Sequelize.DATE },
        committeemeetingdate: { type: Sequelize.DATE },
        recordstatus: { type: Sequelize.CHAR(1) },
        updatecount: { type: Sequelize.INTEGER },
        refstagereviewstatusid: { type: Sequelize.INTEGER },
        refzoneid: { type: Sequelize.INTEGER },
        areasofnoncompliance: { type: Sequelize.STRING("500") },
        prczone: { type: Sequelize.STRING("5") },
        scopeid: { type: Sequelize.INTEGER },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hasTrigger: true,
    },
);

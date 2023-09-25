const practicereview = db.define(
    "practicereview",
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        clientid: { type: Sequelize.INTEGER },
        refcomplyid: { type: Sequelize.INTEGER },
        reviewdate: { type: Sequelize.DATE },
        nextvisitdate: { type: Sequelize.DATE },
        recordstatus: { type: Sequelize.CHAR(1) },
        updatecount: { type: Sequelize.INTEGER },
        prsexported: { type: Sequelize.INTEGER },
        prsrequiresexport: { type: Sequelize.INTEGER },
        prslocked: { type: Sequelize.BOOLEAN },
        reffollowupscopeid: { type: Sequelize.INTEGER },
        exemptiondate: { type: Sequelize.DATE },
        hascicreferral: { type: Sequelize.BOOLEAN },
        isexempted: { type: Sequelize.BOOLEAN },
        nextdeclarationdate: { type: Sequelize.DATE },
        reviewername: { type: Sequelize.STRING(500) },
        reviewertotalhours: { type: Sequelize.DECIMAL(9, 2) },
        reviewtotalhours: { type: Sequelize.DECIMAL(9, 2) },
        notes: { type: Sequelize.STRING("MAX") },
        reviewtypeid: { type: Sequelize.INTEGER },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hasTrigger: true,
    },
);

practicereview.associate = function (db) {
    db.models.practicereview.belongsTo(db.models.practicereviewstages, {
        foreignKey: "id",
        targetKey: "practicereviewid",
        constraints: false,
        unique: false,
        as: "practicereviewstage",
    });
};

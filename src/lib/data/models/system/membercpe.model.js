const membercpe = db.define(
    "membercpe",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        actionplandetail: { type: Sequelize.TEXT },
        auditdate: { type: Sequelize.DATE },
        clientid: { type: Sequelize.INTEGER },
        cpeyear: { type: Sequelize.INTEGER },
        documentidactionplan: { type: Sequelize.INTEGER },
        isactionplanuploaded: { type: Sequelize.BOOLEAN },
        notes: { type: Sequelize.TEXT },
        oneyearresponse: { type: Sequelize.TEXT },
        recordstatus: { type: Sequelize.CHAR(1) },
        refauditresultid: { type: Sequelize.INTEGER },
        refauditsourceid: { type: Sequelize.INTEGER },
        refauditstatusid: { type: Sequelize.INTEGER },
        refcpdincludeinauditid: { type: Sequelize.INTEGER },
        refoneyearcodeid: { type: Sequelize.INTEGER },
        refoneyearexemptionid: { type: Sequelize.INTEGER },
        refreasoncodeid: { type: Sequelize.INTEGER },
        refreportingstatusid: { type: Sequelize.INTEGER },
        refthreeyearcodeid: { type: Sequelize.INTEGER },
        refthreeyearexemptionid: { type: Sequelize.INTEGER },
        reportingdate: { type: Sequelize.DATE },
        threeyearresponse: { type: Sequelize.TEXT },
        updatecount: { type: Sequelize.INTEGER },
        refprocessstateid: { type: Sequelize.INTEGER },
        actionplandocumentname: { type: Sequelize.STRING(200) },
        refapplicationstatusid: { type: Sequelize.INTEGER },
        refethicscourseid: { type: Sequelize.INTEGER },
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

membercpe.associate = function (db) {
    db.models.membercpe.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "membercpeclient",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refreportingstatusid",
        constraints: false,
        unique: false,
        as: "membercpereportingstatus",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refoneyearcodeid",
        constraints: false,
        unique: false,
        as: "membercpeoneyearcode",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refthreeyearcodeid",
        constraints: false,
        unique: false,
        as: "membercpethreeyearcode",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refoneyearexemptionid",
        constraints: false,
        unique: false,
        as: "membercpeoneyearexcemption",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refcpdincludeinauditid",
        constraints: false,
        unique: false,
        as: "membercpecpdincludeinaudit",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refoneyearexemptionid",
        constraints: false,
        unique: false,
        as: "membercpeoneyearexemption",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refthreeyearexemptionid",
        constraints: false,
        unique: false,
        as: "membercpethreeyearexemption",
    });
    db.models.membercpe.belongsTo(db.models.referencefields, {
        foreignKey: "refethicscourseid",
        constraints: false,
        unique: false,
        as: "membercpeethicscourse",
    });
};

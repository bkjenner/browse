const application = db.define(
    "application",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cashreceiptid: { type: Sequelize.INTEGER },
        chequenumber: { type: Sequelize.STRING(100) },
        createddate: { type: Sequelize.DATE },
        declarationdate: { type: Sequelize.DATE },
        declarationname: { type: Sequelize.STRING(500) },
        paymentreceiveddate: { type: Sequelize.DATE },
        refapplicationstatusid: { type: Sequelize.INTEGER },
        refapplicationtypeid: { type: Sequelize.INTEGER },
        refpaymentmethodid: { type: Sequelize.INTEGER },
        statusupdateddate: { type: Sequelize.DATE },
        submitteddate: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
        updateddate: { type: Sequelize.DATE },
        clientidapplicant: { type: Sequelize.INTEGER },
        invoiceid: { type: Sequelize.INTEGER },
        refcharacterrepstatusid: { type: Sequelize.INTEGER },
        characterrepnotes: { type: Sequelize.STRING(2000) },
        processid: { type: Sequelize.INTEGER },
        clientidentity: { type: Sequelize.INTEGER(10) },
        applicationyear: { type: Sequelize.INTEGER },
        refsubstatusid: { type: Sequelize.INTEGER },
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

application.associate = function (db) {
    db.models.application.belongsTo(db.models.referencefields, {
        foreignKey: "refapplicationstatusid",
        constraints: false,
        unique: false,
        as: "applicationstatus",
    });
    db.models.application.belongsTo(db.models.referencefields, {
        foreignKey: "refpaymentmethodid",
        constraints: false,
        unique: false,
        as: "paymentmethod",
    });
    db.models.application.belongsTo(db.models.referencefields, {
        foreignKey: "refcharacterrepstatusid",
        constraints: false,
        unique: false,
        as: "characterrepstatus",
    });
};

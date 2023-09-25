const professionalcorporation = db.define(
    "professionalcorporation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        directors: { type: Sequelize.STRING(2000) },
        filearticleid: { type: Sequelize.INTEGER },
        firstpermitissuedate: { type: Sequelize.DATE },
        nameeffectivedate: { type: Sequelize.DATE },
        pcclientid: { type: Sequelize.INTEGER },
        permitcertificateid: { type: Sequelize.INTEGER },
        permitcertificateofincorporationid: { type: Sequelize.INTEGER },
        permitid: { type: Sequelize.INTEGER },
        permitregistrationid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(10) },
        refstatusid: { type: Sequelize.INTEGER },
        refsubstatusid: { type: Sequelize.INTEGER },
        refsubstatusreasonid: { type: Sequelize.INTEGER },
        shareholders: { type: Sequelize.STRING(2000) },
        substatusreasondate: { type: Sequelize.DATE },
        underinvestigation: { type: Sequelize.BOOLEAN },
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

professionalcorporation.associate = function (db) {
    db.models.professionalcorporation.belongsTo(db.models.referencefields, {
        foreignKey: "refstatusid",
        constraints: false,
        unique: false,
        as: "pcstatus",
    });
    db.models.professionalcorporation.belongsTo(db.models.referencefields, {
        foreignKey: "refsubstatusid",
        constraints: false,
        unique: false,
        as: "pcsubstatus",
    });
    db.models.professionalcorporation.belongsTo(db.models.referencefields, {
        foreignKey: "refsubstatusreasonid",
        constraints: false,
        unique: false,
        as: "pcsubstatusreason",
    });
    db.models.professionalcorporation.hasOne(db.models.client, {
        foreignKey: "id",
        constraints: false,
        unique: false,
        as: "pcclient",
    });
};

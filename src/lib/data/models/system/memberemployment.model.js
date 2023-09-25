const memberemployment = db.define(
    "memberemployment",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        adjustmentdays: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        employedfrom: { type: Sequelize.DATE },
        employedto: { type: Sequelize.DATE },
        iscurrent: { type: Sequelize.BOOLEAN },
        jobtitleid: { type: Sequelize.INTEGER },
        jobtitleother: { type: Sequelize.STRING(200) },
        officeclientid: { type: Sequelize.INTEGER },
        positiontitle: { type: Sequelize.STRING(75) },
        primaryoffice: { type: Sequelize.BOOLEAN },
        recordstatus: { type: Sequelize.CHAR(1) },
        refemploymentkeyrolesid: { type: Sequelize.INTEGER },
        refregulationid: { type: Sequelize.INTEGER },
        refsenioritylevelid: { type: Sequelize.INTEGER },
        relationshipid: { type: Sequelize.INTEGER },
        sequenceno: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        fulladdress: { type: Sequelize.STRING(200) },
        refsectorid: { type: Sequelize.INTEGER },
        refsubsectorid: { type: Sequelize.INTEGER },
        address1: { type: Sequelize.STRING(75) },
        address2: { type: Sequelize.STRING(75) },
        refcityid: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        refcountryid: { type: Sequelize.INTEGER },
        postalcode: { type: Sequelize.STRING(10) },
        city: { type: Sequelize.STRING(200) },
        province: { type: Sequelize.STRING(200) },
        country: { type: Sequelize.STRING(200) },
        phone: { type: Sequelize.STRING(20) },
        email: { type: Sequelize.STRING(50) },
        tieredaudit: { type: Sequelize.BOOLEAN },
        tieredreview: { type: Sequelize.BOOLEAN },
        tieredcompilation: { type: Sequelize.BOOLEAN },
        tieredtaxation: { type: Sequelize.BOOLEAN },
        tieredaccounting: { type: Sequelize.BOOLEAN },
        tieredbusiness: { type: Sequelize.BOOLEAN },
        tieredinsolvency: { type: Sequelize.BOOLEAN },
        tieredforensic: { type: Sequelize.BOOLEAN },
        tieredother: { type: Sequelize.BOOLEAN },
        tieredauditdate: { type: Sequelize.DATE },
        tieredreviewdate: { type: Sequelize.DATE },
        tieredcompilationdate: { type: Sequelize.DATE },
        tieredtaxationdate: { type: Sequelize.DATE },
        tieredaccountingdate: { type: Sequelize.DATE },
        tieredbusinessdate: { type: Sequelize.DATE },
        tieredinsolvencydate: { type: Sequelize.DATE },
        tieredforensicdate: { type: Sequelize.DATE },
        tieredotherdate: { type: Sequelize.DATE },
        publicpraceligible: { type: Sequelize.BOOLEAN },
        reffulltimeorparttimeid: { type: Sequelize.INTEGER },
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

memberemployment.associate = function (db) {
    db.models.memberemployment.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "memberemploymentclient",
    });
    db.models.memberemployment.belongsTo(db.models.member, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "memberemploymentmember",
    });
    db.models.memberemployment.belongsTo(db.models.client, {
        foreignKey: "officeclientid",
        constraints: false,
        unique: false,
        as: "memberemploymentemployer",
    });
    db.models.memberemployment.belongsTo(db.models.referencefields, {
        foreignKey: "refsenioritylevelid",
        constraints: false,
        unique: false,
        as: "memberemploymentsenioritylevel",
    });
    db.models.memberemployment.belongsTo(db.models.referencefields, {
        foreignKey: "refemploymentkeyrolesid",
        constraints: false,
        unique: false,
        as: "memberemploymentkeyrole",
    });
    db.models.memberemployment.belongsTo(db.models.employmentjobtitle, {
        foreignKey: "jobtitleid",
        constraints: false,
        unique: false,
        as: "memberemploymentjobtitle",
    });
    db.models.memberemployment.belongsTo(db.models.referencefields, {
        foreignKey: "refsectorid",
        constraints: false,
        unique: false,
        as: "sector",
    });
    db.models.memberemployment.belongsTo(db.models.refsubsector, {
        foreignKey: "refsubsectorid",
        constraints: false,
        unique: false,
        as: "subsector",
    });
    db.models.memberemployment.hasMany(db.models.clientaddress, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "officeaddress",
    });
};

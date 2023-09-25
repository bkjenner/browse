const affiliatemembership = db.define(
    "affiliatemembership",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        admissiondate: { type: Sequelize.DATE },
        clientidaccountingbody: { type: Sequelize.INTEGER },
        clientidmember: { type: Sequelize.INTEGER },
        haswishestousecpaustitle: { type: Sequelize.BOOLEAN },
        isapprovedforuseofcpaustitle: { type: Sequelize.BOOLEAN },
        membershipenddate: { type: Sequelize.DATE },
        refcountryid: { type: Sequelize.INTEGER },
        refmeansofadmissionid: { type: Sequelize.INTEGER },
        refmembershipstatusid: { type: Sequelize.INTEGER },
        refmembershiptypeid: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        relationshipid: { type: Sequelize.INTEGER },
        designation: { type: Sequelize.STRING(500) },
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

affiliatemembership.associate = function (db) {
    db.models.affiliatemembership.belongsTo(db.models.client, {
        foreignKey: "clientidmember",
        constraints: false,
        unique: false,
        as: "membershipclient",
    });
    db.models.affiliatemembership.belongsTo(db.models.referencefields, {
        foreignKey: "refcountryid",
        constraints: false,
        unique: false,
        as: "affiliatemembershipcountry",
    });
    db.models.affiliatemembership.belongsTo(db.models.referencefields, {
        foreignKey: "refprovinceid",
        constraints: false,
        unique: false,
        as: "affiliatemembershipprovince",
    });
    db.models.affiliatemembership.belongsTo(db.models.referencefields, {
        foreignKey: "refmeansofadmissionid",
        constraints: false,
        unique: false,
        as: "affiliatemembershipmeansofadmission",
    });
    db.models.affiliatemembership.belongsTo(db.models.referencefields, {
        foreignKey: "refmembershipstatusid",
        constraints: false,
        unique: false,
        as: "affiliatemembershipstatus",
    });
    db.models.affiliatemembership.belongsTo(db.models.referencefields, {
        foreignKey: "refmembershiptypeid",
        constraints: false,
        unique: false,
        as: "affiliatemembershiptype",
    });
    db.models.affiliatemembership.belongsTo(db.models.client, {
        foreignKey: "clientidaccountingbody",
        constraints: false,
        unique: false,
        as: "affiliatemembershipaccountingbody",
    });
};

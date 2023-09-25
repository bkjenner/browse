const memberapplicationmembership = db.define(
    "memberapplicationmembership",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        admissiondate: { type: Sequelize.DATE },
        clientidcparecognizedbody: { type: Sequelize.INTEGER },
        membershipenddate: { type: Sequelize.DATE },
        firstdesignationexamcountry: { type: Sequelize.STRING(500) },
        firstdesignationexamdate: { type: Sequelize.DATE },
        hasresidedinthecountryofaccountingbody: { type: Sequelize.BOOLEAN },
        haswishestouseuscpatitle: { type: Sequelize.BOOLEAN },
        isapprovedforuseofuscpatitle: { type: Sequelize.BOOLEAN },
        islicensedtopractice: { type: Sequelize.BOOLEAN },
        memberapplicationid: { type: Sequelize.INTEGER },
        mranumber: { type: Sequelize.STRING(500) },
        refcountryid: { type: Sequelize.INTEGER },
        refdesignationid: { type: Sequelize.INTEGER },
        refmeansofadmissionid: { type: Sequelize.INTEGER },
        refmembershipstatusid: { type: Sequelize.INTEGER },
        membershipstatusother: { type: Sequelize.STRING(500) },
        refmembershiptype: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        refresidingcountryid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        designation: { type: Sequelize.STRING },
        refcurrentstandingid: { type: Sequelize.INTEGER },
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

memberapplicationmembership.associate = function (db) {
    db.models.memberapplicationmembership.belongsTo(db.models.referencefields, {
        foreignKey: "refmembershipstatusid",
        constraints: false,
        unique: false,
        as: "currentstanding",
    });
    db.models.memberapplicationmembership.belongsTo(db.models.referencefields, {
        foreignKey: "refcountryid",
        constraints: false,
        unique: false,
        as: "accountingcountry",
    });
    db.models.memberapplicationmembership.belongsTo(db.models.client, {
        foreignKey: "clientidcparecognizedbody",
        constraints: false,
        unique: false,
        as: "client",
    });
    db.models.memberapplicationmembership.belongsTo(db.models.referencefields, {
        foreignKey: "refresidingcountryid",
        constraints: false,
        unique: false,
        as: "residingcountry",
    });
    db.models.memberapplicationmembership.belongsTo(db.models.referencefields, {
        foreignKey: "refcurrentstandingid",
        constraints: false,
        unique: false,
        as: "currentstatus",
    });
};

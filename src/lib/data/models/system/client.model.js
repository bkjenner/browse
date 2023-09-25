const client = db.define(
    "client",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        addeddate: { type: Sequelize.DATE },
        clientidupdatedby: { type: Sequelize.INTEGER },
        clientname: { type: Sequelize.STRING(250) },
        clientnumber: { type: Sequelize.INTEGER },
        consentdate: { type: Sequelize.DATE },
        contactbirthdate: { type: Sequelize.DATE },
        createdonline: { type: Sequelize.BOOLEAN },
        designation: { type: Sequelize.STRING(75) },
        firstname: { type: Sequelize.STRING(75) },
        historyofdiscipline: { type: Sequelize.BOOLEAN },
        mailname: { type: Sequelize.STRING(250) },
        middlename: { type: Sequelize.STRING(75) },
        notes: { type: Sequelize.TEXT },
        oldclientnumber: { type: Sequelize.INTEGER },
        password: { type: Sequelize.STRING(255) },
        pdnotes: { type: Sequelize.TEXT },
        pdnotesupdated: { type: Sequelize.DATE },
        pdnotesupdatedbyemployeeid: { type: Sequelize.INTEGER },
        quickcode: { type: Sequelize.STRING(10) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refclienttypeid: { type: Sequelize.INTEGER },
        refconsenttypeid: { type: Sequelize.INTEGER },
        refgenderid: { type: Sequelize.INTEGER },
        refownedbydepartmentid: { type: Sequelize.INTEGER },
        refpreferredbillingaddresstypeid: { type: Sequelize.INTEGER },
        refpreferredemailaddresstypeid: { type: Sequelize.INTEGER },
        refpreferredmailingaddresstypeid: { type: Sequelize.INTEGER },
        refpreferredphoneaddresstypeid: { type: Sequelize.INTEGER },
        refpreferredshippingaddresstypeid: { type: Sequelize.INTEGER },
        refstatusid: { type: Sequelize.INTEGER },
        reftitleid: { type: Sequelize.INTEGER },
        seeprofstandards: { type: Sequelize.BOOLEAN },
        sortname: { type: Sequelize.STRING(100) },
        statuseffectivedate: { type: Sequelize.DATE },
        surname: { type: Sequelize.STRING(75) },
        underinvestigation: { type: Sequelize.BOOLEAN },
        updatecount: { type: Sequelize.INTEGER },
        url: { type: Sequelize.STRING(256) },
        username: { type: Sequelize.STRING(50) },
        activated: { type: Sequelize.BOOLEAN },
        activationcode: { type: Sequelize.STRING(255) },
        clientidparent: { type: Sequelize.INTEGER },
        paidthroughdate: { type: Sequelize.DATE },
        providerid: { type: Sequelize.INTEGER },
        publickey: { type: Sequelize.STRING(1000) },
        refethnicityid: { type: Sequelize.INTEGER },
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

client.associate = function (db) {
    db.models.client.belongsToMany(db.models.orgstructure, {
        through: db.models.orgstructureresource,
        unique: false,
        foreignKey: "contactid",
        constraints: false,
    });
    db.models.client.hasOne(db.models.member, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "member",
    });
    db.models.client.hasMany(db.models.clientaddress, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "addresses",
    });
    db.models.client.hasMany(db.models.memberemployment, {
        foreignKey: "id",
        constraints: false,
        unique: false,
        as: "employment",
    });
    db.models.client.hasMany(db.models.affiliatemembership, {
        foreignKey: "clientidmember",
        constraints: false,
        unique: false,
        as: "clientmembership",
    });
    db.models.client.hasMany(db.models.clientrestriction, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "clientrestriction",
    });
    db.models.client.hasMany(db.models.membercondition, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "membercondition",
    });
    db.models.client.hasMany(db.models.membercpe, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "clientmembercpe",
    });
    db.models.client.hasMany(db.models.cpdactivity, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "clientcpdactivity",
    });
    db.models.client.hasMany(db.models.cpdactivity, {
        foreignKey: "clientidprovider",
        constraints: false,
        unique: false,
        as: "clientcpdactivityprovider",
    });
    db.models.client.hasMany(db.models.awardandachievement, {
        foreignKey: "clientidmember",
        constraints: false,
        unique: false,
        as: "clientaward",
    });
    db.models.client.hasOne(db.models.memberuniversity, {
        foreignKey: "universityclientid",
        constraints: false,
        unique: false,
        as: "clientuniversity",
    });
    db.models.client.hasMany(db.models.memberemployment, {
        foreignKey: "officeclientid",
        constraints: false,
        unique: false,
        as: "employermemberemployment",
    });
    db.models.client.hasMany(db.models.memberemployment, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "clientmemberemployment",
    });
    db.models.client.hasMany(db.models.courseandexam, {
        foreignKey: "clientidmember",
        constraints: false,
        unique: false,
        as: "clientcourses",
    });
    db.models.client.hasMany(db.models.memberuniversity, {
        foreignKey: "memberid",
        constraints: false,
        unique: false,
        as: "clientmemberuniversity",
    });
    db.models.client.belongsTo(db.models.referencefields, {
        foreignKey: "refstatusid",
        constraints: false,
        unique: false,
        as: "clientstanding",
    });
    db.models.client.hasOne(db.models.cparecognizedbody, {
        foreignKey: "clientidcparecognizedbody",
        constraints: false,
        unique: false,
        as: "clientcparecognizedbody",
    });
    db.models.client.hasOne(db.models.office, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "office",
    });
    db.models.client.belongsTo(db.models.referencefields, {
        foreignKey: "refclienttypeid",
        constraints: false,
        unique: false,
        as: "entitytype",
    });
    db.models.client.hasMany(db.models.clientmessage, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "messages",
    });
    db.models.client.hasMany(db.models.membermonitoring, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "membermonitoring",
    });
    db.models.client.hasOne(db.models.professionalcorporation, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "professionalcorporation",
    });
    db.models.client.belongsTo(db.models.referencefields, {
        foreignKey: "refethnicityid",
        constraints: false,
        unique: false,
        as: "clientethnicity",
    });
};

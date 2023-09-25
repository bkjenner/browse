const memberapplicationemployment = db.define(
    "memberapplicationemployment",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationaddressid: { type: Sequelize.INTEGER },
        company: { type: Sequelize.STRING(500) },
        employedfrom: { type: Sequelize.DATE },
        employedto: { type: Sequelize.DATE },
        employeeemail: { type: Sequelize.STRING(500) },
        employmentjobtitleid: { type: Sequelize.INTEGER },
        iscurrentemployer: { type: Sequelize.BOOLEAN },
        isprimaryemployer: { type: Sequelize.BOOLEAN },
        memberapplicationid: { type: Sequelize.INTEGER },
        otherexperience: { type: Sequelize.STRING(500) },
        phoneextension: { type: Sequelize.STRING(500) },
        phonenumber: { type: Sequelize.STRING(500) },
        refkeyroleid: { type: Sequelize.INTEGER },
        refsectorid: { type: Sequelize.INTEGER },
        refsenioritylevelid: { type: Sequelize.INTEGER },
        refsubsectorid: { type: Sequelize.INTEGER },
        reftypeofexperienceid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        refcountryid: { type: Sequelize.INTEGER },
        clientidemployer: { type: Sequelize.INTEGER },
        address1: { type: Sequelize.STRING(75) },
        address2: { type: Sequelize.STRING(75) },
        email: { type: Sequelize.STRING(75) },
        isemployed: { type: Sequelize.STRING(25) },
        postalcode: { type: Sequelize.STRING(50) },
        refcityid: { type: Sequelize.INTEGER },
        city: { type: Sequelize.STRING(200) },
        province: { type: Sequelize.STRING(200) },
        country: { type: Sequelize.STRING(200) },
        isvalidated: { type: Sequelize.BOOLEAN },
        placeid: { type: Sequelize.STRING(200) },
        employeephone: { type: Sequelize.STRING(500) },
        fulladdress: { type: Sequelize.STRING(500) },
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

memberapplicationemployment.associate = function (db) {
    db.models.memberapplicationemployment.belongsTo(db.models.referencefields, {
        foreignKey: "refsenioritylevelid",
        constraints: false,
        unique: false,
        as: "senioritylevel",
    });
    db.models.memberapplicationemployment.belongsTo(db.models.referencefields, {
        foreignKey: "refkeyroleid",
        constraints: false,
        unique: false,
        as: "keyrole",
    });
};

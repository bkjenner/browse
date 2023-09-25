const clientaddress = db.define(
    "clientaddress",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address1: { type: Sequelize.STRING(75) },
        address2: { type: Sequelize.STRING(75) },
        businessname: { type: Sequelize.STRING(500) },
        clientid: { type: Sequelize.INTEGER },
        email: { type: Sequelize.STRING(50) },
        fax: { type: Sequelize.STRING(20) },
        generalfax: { type: Sequelize.STRING(20) },
        generalphone: { type: Sequelize.STRING(20) },
        isprimary: { type: Sequelize.BOOLEAN },
        location: { type: Sequelize.STRING(50) },
        mobile: { type: Sequelize.STRING(20) },
        phone: { type: Sequelize.STRING(20) },
        phoneextension: { type: Sequelize.STRING(20) },
        postalcode: { type: Sequelize.STRING(10) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refaddresstypeid: { type: Sequelize.INTEGER },
        refchapterid: { type: Sequelize.INTEGER },
        refcityid: { type: Sequelize.INTEGER },
        refcountryid: { type: Sequelize.INTEGER },
        referenceclientaddressid: { type: Sequelize.INTEGER },
        referenceclientid: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        refzoneid: { type: Sequelize.INTEGER },
        tollfree: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        website: { type: Sequelize.STRING(500) },
        workposition: { type: Sequelize.STRING(75) },
        city: { type: Sequelize.STRING(200) },
        province: { type: Sequelize.STRING(200) },
        country: { type: Sequelize.STRING(200) },
        cityother: { type: Sequelize.STRING(200) },
        provinceother: { type: Sequelize.STRING(200) },
        countryother: { type: Sequelize.STRING(200) },
        isvalidated: { type: Sequelize.BOOLEAN },
        placeid: { type: Sequelize.STRING(200) },
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

clientaddress.associate = function (db) {
    db.models.clientaddress.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "address",
    });
    db.models.clientaddress.belongsTo(db.models.member, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "clientaddressmember",
    });
    db.models.clientaddress.belongsTo(db.models.referencefields, {
        foreignKey: "refcityid",
        constraints: false,
        unique: false,
        as: "clientaddresscity",
    });
    db.models.clientaddress.belongsTo(db.models.referencefields, {
        foreignKey: "refprovinceid",
        constraints: false,
        unique: false,
        as: "clientaddressprovince",
    });
    db.models.clientaddress.belongsTo(db.models.referencefields, {
        foreignKey: "refzoneid",
        constraints: false,
        unique: false,
        as: "clientaddresszone",
    });
    db.models.clientaddress.belongsTo(db.models.referencefields, {
        foreignKey: "refcountryid",
        constraints: false,
        unique: false,
        as: "clientaddresscountry",
    });
    db.models.clientaddress.belongsTo(db.models.referencefields, {
        foreignKey: "refaddresstypeid",
        constraints: false,
        unique: false,
        as: "clientaddresstype",
    });
    db.models.clientaddress.belongsTo(db.models.citydefault, {
        foreignKey: "refcityid",
        constraints: false,
        unique: false,
        as: "clientaddresscitydefault",
    });
    db.models.clientaddress.belongsTo(db.models.client, {
        foreignKey: "referenceclientid",
        constraints: false,
        unique: false,
        as: "clientemployer",
    });
};

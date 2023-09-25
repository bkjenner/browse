const referencefields = db.define(
    "referencefields",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        candelete: { type: Sequelize.BOOLEAN },
        description: { type: Sequelize.STRING(500) },
        keycode: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        sequence: { type: Sequelize.INTEGER },
        shortcode: { type: Sequelize.STRING(50) },
        type: { type: Sequelize.STRING(75) },
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

referencefields.associate = function (db) {
    db.models.referencefields.hasMany(db.models.clientaddress, {
        foreignKey: "refcityid",
        constraints: false,
        unique: false,
        as: "cityclientaddress",
    });
    db.models.referencefields.hasMany(db.models.clientaddress, {
        foreignKey: "refprovinceid",
        constraints: false,
        unique: false,
        as: "provinceclientaddress",
    });
    db.models.referencefields.hasMany(db.models.clientaddress, {
        foreignKey: "refzoneid",
        constraints: false,
        unique: false,
        as: "zoneclientaddress",
    });
    db.models.referencefields.hasMany(db.models.clientaddress, {
        foreignKey: "refcountryid",
        constraints: false,
        unique: false,
        as: "countryclientaddress",
    });
    db.models.referencefields.hasMany(db.models.clientaddress, {
        foreignKey: "refaddresstypeid",
        constraints: false,
        unique: false,
        as: "addresstypeclientaddress",
    });
    db.models.referencefields.hasMany(db.models.affiliatemembership, {
        foreignKey: "refcountryid",
        constraints: false,
        unique: false,
        as: "countryaffiliatemembership",
    });
};

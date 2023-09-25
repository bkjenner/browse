const citydefault = db.define(
    "citydefault",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        areacode: { type: Sequelize.STRING(8) },
        cityname: { type: Sequelize.STRING(75) },
        refchapterid: { type: Sequelize.INTEGER },
        refcountryid: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        refzoneid: { type: Sequelize.INTEGER },
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

citydefault.associate = function (db) {
    db.models.citydefault.belongsTo(db.models.referencefields, {
        foreignKey: "refprovinceid",
        constraints: false,
        unique: false,
        as: "provinces",
    });
    db.models.citydefault.belongsTo(db.models.referencefields, {
        foreignKey: "refcountryid",
        constraints: false,
        unique: false,
        as: "countries",
    });
};

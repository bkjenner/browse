const applicationllpoffice = db.define(
    "applicationllpoffice",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        originalclientid: { type: Sequelize.INTEGER(4) },
        updated: { type: Sequelize.INTEGER(4) },
        originalclientaddressid: { type: Sequelize.INTEGER(4) },
        applicationaddressid: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
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

applicationllpoffice.associate = function (db) {
    db.models.applicationllpoffice.belongsTo(db.models.clientaddress, {
        foreignKey: "originalclientaddressid",
        constraints: false,
        unique: false,
        as: "clientaddress",
    });
    db.models.applicationllpoffice.belongsTo(db.models.application, {
        foreignKey: "applicationid",
        constraints: false,
        unique: false,
        as: "application",
    });
    db.models.applicationllpoffice.belongsTo(db.models.applicationaddress, {
        foreignKey: "applicationaddressid",
        constraints: false,
        unique: false,
        as: "applicationaddress",
    });
    db.models.applicationllpoffice.belongsTo(db.models.client, {
        foreignKey: "originalclientid",
        constraints: false,
        unique: false,
        as: "client",
    });
};

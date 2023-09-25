const contact = db.define(
    "contact",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: Sequelize.STRING(500) },
        firstname: { type: Sequelize.STRING(30) },
        lastname: { type: Sequelize.STRING(100) },
        syschangehistoryid: { type: Sequelize.INTEGER(10) },
        recordstatus: {
            type: Sequelize.STRING(1),
            defaultValue: "A",
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hasTrigger: true,
    },
);

contact.associate = function (db) {
    contact.hasOne(contactuser, {
        foreignKey: "contactid",
        constraints: false,
        unique: false,
        as: "user",
    });
    contact.belongsToMany(orgstructure, {
        through: orgstructureresource,
        unique: false,
        foreignKey: "contactid",
        constraints: false,
    });
};

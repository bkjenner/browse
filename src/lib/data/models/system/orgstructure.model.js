const orgstructure = db.define(
    "orgstructure",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        parentid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(200) },
        contactidheadedby: { type: Sequelize.INTEGER },
        recordcount: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        updatedate: { type: Sequelize.DATE },
        recordstatus: {
            type: Sequelize.STRING(1),
            defaultValue: "A",
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

orgstructure.associate = function (db) {
    orgstructure.belongsTo(orgstructure, {
        foreignKey: "parentid",
        as: "parent",
    });
    orgstructure.belongsTo(contact, {
        foreignKey: "contactidheadedby",
        constraints: false,
        unique: false,
        as: "headedby",
    });
    orgstructure.belongsToMany(contact, {
        through: orgstructureresource,
        unique: false,
        foreignKey: "orgstructureid",
        constraints: false,
    });
    orgstructure.hasMany(orgstructurecommand, {
        foreignKey: "orgstructureid",
        constraints: false,
        unique: false,
        as: "navigation",
    });
    orgstructure.hasMany(orgstructurecommand, {
        foreignKey: "orgstructureid",
        constraints: false,
        unique: false,
        as: "command",
    });
};

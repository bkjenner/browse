const orgstructureresource = db.define(
    "orgstructureresource",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orgstructureid: { type: Sequelize.INTEGER },
        contactid: { type: Sequelize.INTEGER },
        raciid: { type: Sequelize.INTEGER },
        recordcount: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.STRING(1) },
        recordstatus: {
            type: Sequelize.STRING,
            defaultValue: "A",
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

orgstructureresource.associate = function (db) {
    db.models.orgstructureresource.belongsTo(db.models.client, {
        foreignKey: "contactid",
        constraints: false,
        unique: false,
    });
    db.models.orgstructureresource.belongsTo(db.models.orgstructure, {
        foreignKey: "orgstructureid",
        constraints: false,
        unique: false,
        as: "orgstructure",
    });
};

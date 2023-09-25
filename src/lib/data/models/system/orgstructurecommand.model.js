const orgstructurecommand = db.define(
    "orgstructurecommand",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orgstructureid: { type: Sequelize.INTEGER },
        command: { type: Sequelize.STRING(200) },
        commandtypeid: { type: Sequelize.INTEGER },
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

orgstructurecommand.associate = function (db) {
    orgstructurecommand.belongsTo(commandtype, {
        foreignKey: "commandtypeid",
        constraints: false,
        unique: false,
        as: "commandtype",
    });
    orgstructurecommand.belongsTo(orgstructure, {
        foreignKey: "orgstructureid",
        constraints: false,
        unique: false,
        as: "orgstructure",
    });
};

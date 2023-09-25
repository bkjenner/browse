const modulecomponentlogic = db.define(
    "modulecomponentlogic",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        modulecomponentid: { type: Sequelize.INTEGER },
        moduleid: { type: Sequelize.INTEGER },
        logicid: { type: Sequelize.INTEGER },
        command: { type: Sequelize.STRING },
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
        hasTrigger: true,
    },
);

modulecomponentlogic.associate = function (db) {
    modulecomponentlogic.belongsTo(logic, {
        foreignKey: "logicid",
        constraints: false,
        unique: false,
    });
    modulecomponentlogic.belongsTo(modulecomponent, {
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
};

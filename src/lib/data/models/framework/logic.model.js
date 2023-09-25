const logic = db.define(
    "logic",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: Sequelize.STRING },
        actiontype: { type: Sequelize.STRING },
        code: { type: Sequelize.TEXT },
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

logic.associate = function (db) {
    logic.belongsToMany(_module, {
        through: { model: modulelogic, unique: false, constraints: false },
        foreignKey: "logicid",
        constraints: false,
        unique: false,
    });
    logic.belongsToMany(component, {
        through: { model: componentlogic, unique: false, constraints: false },
        foreignKey: "componentid",
        otherKey: "logicid",
        constraints: false,
        unique: false,
    });
    logic.belongsToMany(modulecomponent, {
        through: {
            model: modulecomponentlogic,
            unique: false,
            constraints: false,
        },
        foreignKey: "logicid",
        constraints: false,
        unique: false,
    });
    logic.hasMany(componentlogic, {
        foreignKey: "logicid",
        constraints: false,
        unique: false,
    });
    logic.hasMany(modulecomponentlogic, {
        foreignKey: "logicid",
        constraints: false,
        unique: false,
    });
    logic.hasMany(modulelogic, {
        foreignKey: "logicid",
        constraints: false,
        unique: false,
    });
};

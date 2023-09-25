const component = db.define(
    "component",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rendername: { type: Sequelize.STRING },
        referencename: { type: Sequelize.STRING },
        reference: { type: Sequelize.STRING },
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

component.associate = function (db) {
    component.belongsToMany(_module, {
        through: { model: modulecomponent, unique: false, constraints: false },
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    component.belongsToMany(initialstate, {
        through: { model: componentstate, unique: false, constraints: false },
        foreignKey: "componentid",
        otherKey: "stateid",
        constraints: false,
        unique: false,
    });
    component.belongsToMany(logic, {
        through: { model: componentlogic, unique: false, constraints: false },
        foreignKey: "componentid",
        otherKey: "logicid",
        constraints: false,
        unique: false,
    });
    component.belongsToMany(reducer, {
        through: { model: componentreducer, unique: false, constraints: false },
        foreignKey: "componentid",
        otherKey: "reducerid",
        constraints: false,
        unique: false,
    });
    component.hasMany(componentlogic, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    component.hasMany(componentprop, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    component.hasMany(componentreducer, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    component.hasMany(componentstate, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    component.hasMany(datasourcefield, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    component.hasMany(modulecomponent, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
};

const initialstate = db.define(
    "initialstate",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        rendername: { type: Sequelize.STRING },
        value: { type: Sequelize.TEXT },
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

initialstate.associate = function (db) {
    initialstate.belongsToMany(_module, {
        through: { model: modulestate, unique: false, constraints: false },
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
    initialstate.belongsToMany(component, {
        through: { model: componentstate, unique: false, constraints: false },
        foreignKey: "componentid",
        otherKey: "stateid",
        constraints: false,
        unique: false,
    });
    initialstate.belongsToMany(modulecomponent, {
        through: {
            model: modulecomponentstate,
            unique: false,
            constraints: false,
        },
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
    initialstate.hasMany(componentstate, {
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
    initialstate.hasMany(modulecomponentstate, {
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
    initialstate.hasMany(modulelogic, {
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
};

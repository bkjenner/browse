const reducer = db.define(
    "reducer",
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

reducer.associate = function (db) {
    reducer.belongsToMany(_module, {
        through: { model: modulereducer, unique: false, constraints: false },
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
    reducer.belongsToMany(component, {
        through: { model: componentreducer, unique: false, constraints: false },
        foreignKey: "componentid",
        otherKey: "reducerid",
        constraints: false,
        unique: false,
    });
    reducer.belongsToMany(modulecomponent, {
        through: {
            model: modulecomponentreducer,
            unique: false,
            constraints: false,
        },
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
    reducer.hasMany(componentreducer, {
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
    reducer.hasMany(modulecomponentreducer, {
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
    reducer.hasMany(modulereducer, {
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
};

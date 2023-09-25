const _module = db.define(
    "module",
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
        base: { type: Sequelize.STRING },
        caption: { type: Sequelize.STRING },
        singularname: { type: Sequelize.STRING },
        pluralname: { type: Sequelize.STRING },
        rendername: { type: Sequelize.STRING },
        referencename: { type: Sequelize.STRING },
        navigationmenu: { type: Sequelize.STRING },
        activenavigationitem: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING },
        istemporal: { type: Sequelize.BOOLEAN },
        ishierarchical: { type: Sequelize.BOOLEAN },
        isversioned: { type: Sequelize.BOOLEAN },
        direct: { type: Sequelize.BOOLEAN },
        dicttableid: { type: Sequelize.INTEGER },
        datasourceid: { type: Sequelize.INTEGER },
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

_module.associate = function (db) {
    _module.belongsTo(datasource, {
        foreignKey: "datasourceid",
        constraints: false,
        unique: false,
    });
    _module.belongsTo(dicttable, {
        foreignKey: "dicttableid",
        constraints: false,
        unique: false,
    });
    _module.belongsToMany(app, {
        through: { model: appmodule, unique: false, constraints: false },
        foreignKey: "moduleid",
        otherKey: "appid",
        constraints: false,
        unique: false,
    });
    _module.belongsToMany(component, {
        through: { model: modulecomponent, unique: false, constraints: false },
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.belongsToMany(initialstate, {
        through: { model: modulestate, unique: false, constraints: false },
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.belongsToMany(logic, {
        through: { model: modulelogic, unique: false, constraints: false },
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.belongsToMany(reducer, {
        through: { model: modulereducer, unique: false, constraints: false },
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.belongsToMany(rule, {
        through: { model: modulerule, unique: false, constraints: false },
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.hasMany(modulecomponent, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.hasMany(modulelogic, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.hasMany(moduleprop, {
        foreignKey: "moduleid",
        unique: false,
        constraints: false,
    });
    _module.hasMany(modulereducer, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.hasMany(modulerule, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    _module.hasMany(modulestate, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
};

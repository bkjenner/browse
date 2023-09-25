const modulecomponent = db.define(
    "modulecomponent",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        moduleid: { type: Sequelize.INTEGER },
        dicttableid: { type: Sequelize.INTEGER },
        dictcolumnid: { type: Sequelize.INTEGER },
        componentid: { type: Sequelize.INTEGER },
        parentid: { type: Sequelize.INTEGER },
        datatypeid: { type: Sequelize.INTEGER },
        fieldname: { type: Sequelize.STRING },
        displayname: { type: Sequelize.STRING },
        area: { type: Sequelize.STRING },
        directembedchildren: { type: Sequelize.BOOLEAN },
        ignorerender: { type: Sequelize.BOOLEAN },
        command: { type: Sequelize.STRING },
        row: { type: Sequelize.INTEGER },
        column: { type: Sequelize.INTEGER },
        spanlg: { type: Sequelize.INTEGER },
        spanmd: { type: Sequelize.INTEGER },
        spansm: { type: Sequelize.INTEGER },
        spanxs: { type: Sequelize.INTEGER },
        offsetlg: { type: Sequelize.INTEGER },
        offsetmd: { type: Sequelize.INTEGER },
        offsetsm: { type: Sequelize.INTEGER },
        offsetxs: { type: Sequelize.INTEGER },
        sequence: { type: Sequelize.INTEGER },
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

modulecomponent.associate = function (db) {
    modulecomponent.belongsTo(_module, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    modulecomponent.belongsTo(component, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    modulecomponent.belongsTo(datatype, {
        foreignKey: "datatypeid",
        unique: false,
        constraints: false,
    });
    modulecomponent.belongsTo(dictcolumn, {
        foreignKey: "dictcolumnid",
        unique: false,
        constraints: false,
    });
    modulecomponent.belongsTo(dicttable, {
        foreignKey: "dicttableid",
        unique: false,
        constraints: false,
    });
    modulecomponent.belongsTo(modulecomponent, {
        foreignKey: "parentid",
        as: "parent",
        constraints: false,
        unique: false,
    });
    modulecomponent.belongsToMany(componentprop, {
        through: {
            model: modulecomponentprop,
            unique: false,
            constraints: false,
        },
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
    modulecomponent.belongsToMany(initialstate, {
        through: {
            model: modulecomponentstate,
            unique: false,
            constraints: false,
        },
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
    modulecomponent.belongsToMany(logic, {
        through: {
            model: modulecomponentlogic,
            unique: false,
            constraints: false,
        },
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
    modulecomponent.belongsToMany(reducer, {
        through: {
            model: modulecomponentreducer,
            unique: false,
            constraints: false,
        },
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
    modulecomponent.hasMany(modulecomponentlogic, {
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
    modulecomponent.hasMany(modulecomponentprop, {
        foreignKey: "modulecomponentid",
        unique: false,
        constraints: false,
    });
    modulecomponent.hasMany(modulecomponentreducer, {
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
    modulecomponent.hasMany(modulecomponentstate, {
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
};

const componentprop = db.define(
    "componentprop",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        componentid: { type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rendername: { type: Sequelize.STRING },
        defaultvalue: { type: Sequelize.STRING },
        datacolumnfield: { type: Sequelize.STRING },
        isrenderproperty: { type: Sequelize.BOOLEAN },
        datatypeid: { type: Sequelize.INTEGER },
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

componentprop.associate = function (db) {
    componentprop.belongsTo(component, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    componentprop.belongsTo(datatype, {
        foreignKey: "datatypeid",
        unique: false,
        constraints: false,
    });
    componentprop.belongsToMany(modulecomponent, {
        through: {
            model: modulecomponentprop,
            unique: false,
            constraints: false,
        },
        foreignKey: "componentpropid",
        constraints: false,
        unique: false,
    });
    componentprop.hasMany(modulecomponentprop, {
        foreignKey: "componentpropid",
        unique: false,
        constraints: false,
    });
};

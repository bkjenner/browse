const modulecomponentprop = db.define(
    "modulecomponentprop",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        modulecomponentid: { type: Sequelize.INTEGER },
        componentpropid: { type: Sequelize.INTEGER },
        moduleid: { type: Sequelize.INTEGER },
        value: { type: Sequelize.TEXT },
        isrenderproperty: { type: Sequelize.BOOLEAN },
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

modulecomponentprop.associate = function (db) {
    modulecomponentprop.belongsTo(componentprop, {
        foreignKey: "componentpropid",
        unique: false,
        constraints: false,
    });
    modulecomponentprop.belongsTo(modulecomponent, {
        foreignKey: "modulecomponentid",
        unique: false,
        constraints: false,
    });
};

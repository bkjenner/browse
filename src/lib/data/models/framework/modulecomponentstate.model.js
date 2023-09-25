const modulecomponentstate = db.define(
    "modulecomponentstate",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        modulecomponentid: { type: Sequelize.INTEGER },
        moduleid: { type: Sequelize.INTEGER },
        stateid: { type: Sequelize.INTEGER },
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

modulecomponentstate.associate = function (db) {
    modulecomponentstate.belongsTo(initialstate, {
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
    modulecomponentstate.belongsTo(modulecomponent, {
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
};

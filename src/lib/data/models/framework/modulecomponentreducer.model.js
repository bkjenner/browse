const modulecomponentreducer = db.define(
    "modulecomponentreducer",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        modulecomponentid: { type: Sequelize.INTEGER },
        moduleid: { type: Sequelize.INTEGER },
        reducerid: { type: Sequelize.INTEGER },
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

modulecomponentreducer.associate = function (db) {
    modulecomponentreducer.belongsTo(modulecomponent, {
        foreignKey: "modulecomponentid",
        constraints: false,
        unique: false,
    });
    modulecomponentreducer.belongsTo(reducer, {
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
};

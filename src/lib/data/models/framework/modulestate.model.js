const modulestate = db.define(
    "modulestate",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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

modulestate.associate = function (db) {
    modulestate.belongsTo(_module, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    modulestate.belongsTo(initialstate, {
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
};

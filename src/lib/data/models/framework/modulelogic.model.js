const modulelogic = db.define(
    "modulelogic",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        moduleid: { type: Sequelize.INTEGER },
        logicid: { type: Sequelize.INTEGER },
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
modulelogic.belongsTo(_module, {
    foreignKey: "moduleid",
    constraints: false,
    unique: false,
});
modulelogic.belongsTo(logic, {
    foreignKey: "logicid",
    constraints: false,
    unique: false,
});

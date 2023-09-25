const componentlogic = db.define(
    "componentlogic",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        componentid: { type: Sequelize.INTEGER },
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

componentlogic.associate = function (db) {
    componentlogic.belongsTo(component, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    componentlogic.belongsTo(logic, {
        foreignKey: "logicid",
        constraints: false,
        unique: false,
    });
};

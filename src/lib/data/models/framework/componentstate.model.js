const componentstate = db.define(
    "componentstate",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        componentid: { type: Sequelize.INTEGER },
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

componentstate.associate = function (db) {
    componentstate.belongsTo(component, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    componentstate.belongsTo(initialstate, {
        foreignKey: "stateid",
        constraints: false,
        unique: false,
    });
};

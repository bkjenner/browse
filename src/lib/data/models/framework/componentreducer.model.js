const componentreducer = db.define(
    "componentreducer",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        componentid: { type: Sequelize.INTEGER },
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

componentreducer.associate = function (db) {
    componentreducer.belongsTo(component, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    componentreducer.belongsTo(reducer, {
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
};

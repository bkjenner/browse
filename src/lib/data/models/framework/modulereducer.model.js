const modulereducer = db.define(
    "modulereducer",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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

modulereducer.associate = function (db) {
    modulereducer.belongsTo(_module, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    modulereducer.belongsTo(reducer, {
        foreignKey: "reducerid",
        constraints: false,
        unique: false,
    });
};

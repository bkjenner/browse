const modulerule = db.define(
    "modulerule",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        moduleid: { type: Sequelize.INTEGER },
        ruleid: { type: Sequelize.INTEGER },
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

modulerule.associate = function (db) {
    modulerule.belongsTo(_module, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
    });
    modulerule.belongsTo(rule, {
        foreignKey: "ruleid",
        constraints: false,
        unique: false,
    });
};

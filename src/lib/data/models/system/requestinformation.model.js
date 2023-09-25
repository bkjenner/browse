const requestinformation = db.define(
    "requestinformation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(500) },
        componentid: { type: Sequelize.INTEGER },
        component: { type: Sequelize.STRING(200) },
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

requestinformation.associate = function (db) {
    db.models.requestinformation.belongsTo(db.models.component, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
        as: "components",
    });
};

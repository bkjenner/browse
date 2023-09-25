const app = db.define(
    "app",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sysbaseid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        layout: { type: Sequelize.STRING },
        basename: { type: Sequelize.STRING },
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

app.associate = function (db) {
    app.belongsTo(sysbase, {
        foreignKey: "sysbaseid",
        unique: false,
        constraints: false,
    });
    app.belongsToMany(_module, {
        through: { model: appmodule, unique: false, constraints: false },
        foreignKey: "appid",
        otherKey: "moduleid",
        constraints: false,
        unique: false,
    });
};

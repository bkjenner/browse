const moduleprop = db.define(
    "moduleprop",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        moduleid: { type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rendername: { type: Sequelize.STRING },
        direct: { type: Sequelize.BOOLEAN },
        defaultvalue: { type: Sequelize.STRING },
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

moduleprop.associate = function (db) {
    moduleprop.belongsTo(_module, {
        foreignKey: "moduleid",
        unique: false,
        constraints: false,
    });
};

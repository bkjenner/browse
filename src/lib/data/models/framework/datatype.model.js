const datatype = db.define(
    "datatype",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
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

datatype.associate = function (db) {
    datatype.hasMany(componentprop, {
        foreignKey: "datatypeid",
        unique: false,
        constraints: false,
    });
    datatype.hasMany(modulecomponent, {
        foreignKey: "datatypeid",
        unique: false,
        constraints: false,
    });
};

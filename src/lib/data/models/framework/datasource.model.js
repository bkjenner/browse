const datasource = db.define(
    "datasource",
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

datasource.associate = function (db) {
    datasource.hasMany(_module, {
        foreignKey: "datasourceid",
        constraints: false,
        unique: false,
    });
    datasource.hasMany(datasourcetable, {
        foreignKey: "datasourceid",
        constraints: false,
        unique: false,
    });
};

const datasourcetable = db.define(
    "datasourcetable",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        datasourceid: { type: Sequelize.INTEGER },
        parentid: { type: Sequelize.INTEGER },
        dicttableid: { type: Sequelize.INTEGER },
        alias: { type: Sequelize.STRING },
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

datasourcetable.associate = function (db) {
    datasourcetable.belongsTo(datasource, {
        foreignKey: "datasourceid",
        constraints: false,
        unique: false,
    });
    datasourcetable.belongsTo(datasourcetable, {
        foreignKey: "parentid",
        as: "parent",
        constraints: false,
        unique: false,
    });
    datasourcetable.belongsTo(dicttable, {
        foreignKey: "dicttableid",
        constraints: false,
        unique: false,
    });
    datasourcetable.hasMany(datasourcefield, {
        foreignKey: "datasourcetableid",
        constraints: false,
        unique: false,
    });
};

const datasourcefield = db.define(
    "datasourcefield",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        datasourcetableid: { type: Sequelize.INTEGER },
        dictcolumnid: { type: Sequelize.INTEGER },
        componentid: { type: Sequelize.INTEGER },
        alias: { type: Sequelize.STRING },
        datatypeid: { type: Sequelize.INTEGER },
        conditions: { type: Sequelize.TEXT },
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

datasourcefield.associate = function (db) {
    datasourcefield.belongsTo(component, {
        foreignKey: "componentid",
        constraints: false,
        unique: false,
    });
    datasourcefield.belongsTo(datasourcetable, {
        foreignKey: "datasourcetableid",
        constraints: false,
        unique: false,
    });
    datasourcefield.belongsTo(datatype, {
        foreignKey: "datatypeid",
        constraints: false,
        unique: false,
    });
    datasourcefield.belongsTo(dictcolumn, {
        foreignKey: "dictcolumnid",
        constraints: false,
        unique: false,
    });
};

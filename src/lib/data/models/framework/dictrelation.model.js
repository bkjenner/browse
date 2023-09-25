const dictrelation = db.define(
    "dictrelation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dicttableidfrom: { type: Sequelize.INTEGER },
        dictcolumnidfrom: { type: Sequelize.INTEGER },
        fromlocalkey: { type: Sequelize.STRING(100) },
        relationship: { type: Sequelize.STRING(25) },
        relationshiplabel: { type: Sequelize.STRING(100) },
        dictcolumnidthrough: { type: Sequelize.INTEGER },
        tolocalkey: { type: Sequelize.STRING(100) },
        dicttableidto: { type: Sequelize.INTEGER },
        dictcolumnidto: { type: Sequelize.INTEGER },
        aliasfrom: { type: Sequelize.STRING(100) },
        aliasto: { type: Sequelize.STRING(100) },
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

dictrelation.associate = function (db) {
    dictrelation.belongsTo(dictcolumn, {
        foreignKey: "dictcolumnidfrom",
        as: "drColFrom",
        constraints: false,
        unique: false,
    });
    dictrelation.belongsTo(dictcolumn, {
        foreignKey: "dictcolumnidto",
        as: "drColTo",
        constraints: false,
        unique: false,
    });
    dictrelation.belongsTo(dicttable, {
        foreignKey: "dicttableidfrom",
        as: "from",
        constraints: false,
        unique: false,
    });
    dictrelation.belongsTo(dicttable, {
        foreignKey: "dicttableidthrough",
        as: "through",
        constraints: false,
        unique: false,
    });
    dictrelation.belongsTo(dicttable, {
        foreignKey: "dicttableidto",
        as: "to",
        constraints: false,
        unique: false,
    });
};

const dictcolumn = db.define(
    "dictcolumn",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        systemname: { type: Sequelize.STRING(30) },
        combinedname: { type: Sequelize.STRING(200) },
        sysdictionarytableid: { type: Sequelize.INTEGER },
        tablename: { type: Sequelize.STRING(100) },
        name: { type: Sequelize.STRING(100) },
        description: { type: Sequelize.STRING(500) },
        tablenormalizedname: { type: Sequelize.STRING(200) },
        normalizedname: { type: Sequelize.STRING(100) },
        longname: { type: Sequelize.STRING(500) },
        label: { type: Sequelize.STRING(100) },
        source: { type: Sequelize.STRING(500) },
        datatype: { type: Sequelize.STRING(20) },
        datalength: { type: Sequelize.INTEGER },
        decimals: { type: Sequelize.INTEGER },
        oldpicture: { type: Sequelize.STRING(30) },
        isnullable: { type: Sequelize.STRING(10) },
        validationrule: { type: Sequelize.STRING(500) },
        defaultvalue: { type: Sequelize.STRING(500) },
        columnsequence: { type: Sequelize.INTEGER },
        purpose: { type: Sequelize.STRING(20) },
        sysdictionarytableidforeign: { type: Sequelize.INTEGER },
        foreigntable: { type: Sequelize.STRING(100) },
        foreignkeysuffix: { type: Sequelize.STRING(100) },
        additionalforeignkeycolumns: { type: Sequelize.STRING(500) },
        referencetable: { type: Sequelize.STRING(200) },
        isused: { type: Sequelize.STRING(20) },
        ischangehistoryused: { type: Sequelize.STRING(10) },
        isindexed: { type: Sequelize.STRING(10) },
        sysdictionarycolumnidnew: { type: Sequelize.INTEGER },
        newdictionarycolumn: { type: Sequelize.STRING(200) },
        conversioncomments: { type: Sequelize.STRING(100) },
        conversionsql: { type: Sequelize.STRING(500) },
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

dictcolumn.associate = function (db) {
    dictcolumn.belongsTo(dicttable, {
        foreignKey: "sysdictionarytableid",
        unique: false,
        constraints: false,
    });
    dictcolumn.belongsTo(dicttable, {
        foreignKey: "sysdictionarytableidforeign",
        as: "dicttableforeign",
        unique: false,
        constraints: false,
    });
    dictcolumn.hasMany(datasourcefield, {
        foreignKey: "dictcolumnid",
        constraints: false,
        unique: false,
    });
    dictcolumn.hasMany(dictrelation, {
        foreignKey: "dictcolumnidfrom",
        as: "colFrom",
        constraints: false,
        unique: false,
    });
    dictcolumn.hasMany(dictrelation, {
        foreignKey: "dictcolumnidto",
        as: "colTo",
        constraints: false,
        unique: false,
    });
    dictcolumn.hasMany(modulecomponent, {
        foreignKey: "dictcolumnid",
        unique: false,
        constraints: false,
    });
};

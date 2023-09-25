const dicttable = db.define(
    "dicttable",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        systemname: { type: Sequelize.STRING(30) },
        name: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(500) },
        normalizedname: { type: Sequelize.STRING(200) },
        singularname: { type: Sequelize.STRING(200) },
        pluralname: { type: Sequelize.STRING(200) },
        modulename: { type: Sequelize.STRING(200) },
        tabletype: { type: Sequelize.STRING(30) },
        istabletemporal: { type: Sequelize.STRING(10) },
        primarykey: { type: Sequelize.STRING(1000) },
        translation: { type: Sequelize.STRING(500) },
        regcodetranslation: { type: Sequelize.STRING(10) },
        whereclause: { type: Sequelize.STRING(500) },
        additionalindexkeys: { type: Sequelize.STRING(500) },
        category: { type: Sequelize.STRING(500) },
        sysdictionarytableidnew: { type: Sequelize.STRING(10) },
        changehistoryscope: { type: Sequelize.STRING(30) },
        changehistorylevel: { type: Sequelize.STRING(10) },
        systemmodule: { type: Sequelize.STRING(30) },
        source: { type: Sequelize.STRING(100) },
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

dicttable.associate = function (db) {
    dicttable.hasMany(_module, {
        foreignKey: "dicttableid",
        constraints: false,
        unique: false,
    });
    dicttable.hasMany(datasourcetable, {
        foreignKey: "dicttableid",
        constraints: false,
        unique: false,
    });
    dicttable.hasMany(dictcolumn, {
        foreignKey: "sysdictionarytableid",
        unique: false,
        constraints: false,
    });
    dicttable.hasMany(dictcolumn, {
        foreignKey: "sysdictionarytableidforeign",
        as: "foreignColumns",
        unique: false,
        constraints: false,
    });
    dicttable.hasMany(dictrelation, {
        foreignKey: "dicttableidfrom",
        as: "relFrom",
        constraints: false,
        unique: false,
    });
    dicttable.hasMany(dictrelation, {
        foreignKey: "dicttableidthrough",
        as: "relThrough",
        constraints: false,
        unique: false,
    });
    dicttable.hasMany(dictrelation, {
        foreignKey: "dicttableidto",
        as: "relTo",
        constraints: false,
        unique: false,
    });
    dicttable.hasMany(modulecomponent, {
        foreignKey: "dicttableid",
        unique: false,
        constraints: false,
    });
};

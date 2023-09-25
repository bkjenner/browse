const rule = db.define(
    "rule",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: Sequelize.STRING },
        imports: { type: Sequelize.TEXT },
        code: { type: Sequelize.TEXT },
        tests: { type: Sequelize.TEXT },
        comments: { type: Sequelize.TEXT },
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

rule.associate = function (db) {
    rule.belongsToMany(_module, {
        through: { model: modulerule, unique: false, constraints: false },
        foreignKey: "ruleid",
        constraints: false,
        unique: false,
    });
    rule.hasMany(modulerule, {
        foreignKey: "ruleid",
        constraints: false,
        unique: false,
    });
};

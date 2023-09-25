const questiongroup = db.define(
    "questiongroup",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(200) },
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

questiongroup.associate = function (db) {
    db.models.questiongroup.hasMany(db.models.questiongroupitem, {
        foreignKey: "questiongroupid",
        constraints: false,
        unique: false,
    });
};

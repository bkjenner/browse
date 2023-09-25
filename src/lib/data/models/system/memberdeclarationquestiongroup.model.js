const memberdeclarationquestiongroup = db.define(
    "memberdeclarationquestiongroup",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: { type: Sequelize.STRING(200) },
        name: { type: Sequelize.STRING(200) },
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

memberdeclarationquestiongroup.associate = function (db) {
    db.models.memberdeclarationquestiongroup.hasMany(db.models.memberdeclarationquestion, {
        foreignKey: "questiongroupid",
        constraints: false,
        unique: false,
        as: "questiongroupitems",
    });
};

const questiongroupitem = db.define(
    "questiongroupitem",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        questiongroupid: { type: Sequelize.INTEGER },
        questiontext: { type: Sequelize.STRING(300) },
        answertype: { type: Sequelize.STRING(200) },
        reasontext: { type: Sequelize.STRING(200) },
        sequence: { type: Sequelize.INTEGER },
        parentid: { type: Sequelize.INTEGER },
        prefix: { type: Sequelize.STRING(55) },
        linktext: { type: Sequelize.STRING(200) },
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

questiongroupitem.associate = function (db) {
    db.models.questiongroupitem.belongsTo(db.models.questiongroup, {
        foreignKey: "questiongroupid",
        constraints: false,
        unique: false,
        as: "questiongroupitems",
    });
};

const memberdeclarationquestion = db.define(
    "memberdeclarationquestion",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        additionalinformation: { type: Sequelize.STRING(500) },
        displayorder: { type: Sequelize.INTEGER },
        documentiddownload: { type: Sequelize.INTEGER },
        isadditional: { type: Sequelize.BOOLEAN },
        isalerton: { type: Sequelize.BOOLEAN },
        isexplainon: { type: Sequelize.BOOLEAN },
        isnewmember: { type: Sequelize.BOOLEAN },
        isrenewal: { type: Sequelize.BOOLEAN },
        questiontext: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        answertype: { type: Sequelize.STRING(200) },
        linktext: { type: Sequelize.STRING(200) },
        parentid: { type: Sequelize.INTEGER },
        prefix: { type: Sequelize.STRING(200) },
        questiongroupid: { type: Sequelize.INTEGER },
        reasontext: { type: Sequelize.STRING(200) },
        sequence: { type: Sequelize.INTEGER },
        shortname: { type: Sequelize.STRING(200) },
        filename: { type: Sequelize.STRING(1000) },
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

memberdeclarationquestion.associate = function (db) {
    db.models.memberdeclarationquestion.belongsTo(db.models.memberdeclarationquestiongroup, {
        foreignKey: "questiongroupid",
        constraints: false,
        unique: false,
        as: "questiongroup",
    });
};

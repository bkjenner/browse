const memberapplicationcharacterandreputationanswerdocument = db.define(
    "memberapplicationcharacterandreputationanswerdocument",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        memberapplicationid: { type: Sequelize.INTEGER },
        documentname: { type: Sequelize.STRING(200) },
        documentpath: { type: Sequelize.STRING(200) },
        memberapplicationquestionid: { type: Sequelize.INTEGER },
        documenttype: { type: Sequelize.STRING(200) },
        recordstatus: {
            type: Sequelize.STRING,
            defaultValue: "A",
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hasTrigger: true,
    },
);

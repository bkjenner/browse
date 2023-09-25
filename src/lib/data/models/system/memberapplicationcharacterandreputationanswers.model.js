const memberapplicationcharacterandreputationanswers = db.define(
    "memberapplicationcharacterandreputationanswers",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        explanationforyes: { type: Sequelize.STRING(500) },
        memberapplicationid: { type: Sequelize.INTEGER },
        memberdeclarationquestionsid: { type: Sequelize.INTEGER },
        refyesnoresponseid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
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

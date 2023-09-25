const characterandreputationanswer = db.define(
    "characterandreputationanswer",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        characterandreputationid: { type: Sequelize.INTEGER },
        documentiduploaded: { type: Sequelize.INTEGER },
        explanationforyes: { type: Sequelize.STRING(500) },
        memberdeclarationquestionsid: { type: Sequelize.INTEGER },
        refyesnoresponseid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        documentname: { type: Sequelize.STRING(200) },
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

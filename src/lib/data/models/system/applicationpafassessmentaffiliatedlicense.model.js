const applicationpafassessmentaffiliatedlicense = db.define(
    "applicationpafassessmentaffiliatedlicense",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        documentidverification: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        refareaofpracticeid: { type: Sequelize.INTEGER },
        otherdetails: { type: Sequelize.STRING(1000) },
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

const applicationpafassessmenteducation = db.define(
    "applicationpafassessmenteducation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hascfe: { type: Sequelize.BOOLEAN },
        applicationid: { type: Sequelize.INTEGER },
        refassessmentcpaeducationid: { type: Sequelize.INTEGER },
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

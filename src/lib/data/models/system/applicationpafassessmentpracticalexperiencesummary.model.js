const applicationpafassessmentpracticalexperiencesummary = db.define(
    "applicationpafassessmentpracticalexperiencesummary",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        documentidcurriculumvitae: { type: Sequelize.INTEGER },
        hasassurancechargeablehours: { type: Sequelize.BOOLEAN },
        hasauditchargeablehours: { type: Sequelize.BOOLEAN },
        hasfulltimeexperience: { type: Sequelize.BOOLEAN },
        hasoverallchargeablehours: { type: Sequelize.BOOLEAN },
        ispafpartnerorproprietor: { type: Sequelize.BOOLEAN },
        applicationid: { type: Sequelize.INTEGER },
        refpartnerorproprietorid: { type: Sequelize.INTEGER },
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

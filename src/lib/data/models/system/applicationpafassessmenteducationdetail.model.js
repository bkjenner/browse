const applicationpafassessmenteducationdetail = db.define(
    "applicationpafassessmenteducationdetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        degreecompletedyear: { type: Sequelize.INTEGER },
        otherinstitution: { type: Sequelize.STRING(500) },
        otherfieldofstudy: { type: Sequelize.STRING(500) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refeducationtypeid: { type: Sequelize.INTEGER },
        reffieldcodeid: { type: Sequelize.INTEGER },
        refdegreelevelid: { type: Sequelize.INTEGER },
        universityclientid: { type: Sequelize.INTEGER },
        memberuniversityid: { type: Sequelize.INTEGER },
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

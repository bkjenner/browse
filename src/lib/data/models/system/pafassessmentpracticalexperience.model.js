const pafassessmentpracticalexperience = db.define(
    "pafassessmentpracticalexperience",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientidpaf: { type: Sequelize.INTEGER },
        practicalexperienceenddate: { type: Sequelize.DATE },
        pafassessmentpracticalexperiencesummaryid: { type: Sequelize.INTEGER },
        positiontitle: { type: Sequelize.STRING(500) },
        reffulltimeorparttimeid: { type: Sequelize.INTEGER },
        practicalexperiencestartdate: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
        professionalaccountingfirm: { type: Sequelize.STRING(500) },
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

const applicationpafassessmentcpd = db.define(
    "applicationpafassessmentcpd",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        officeapplicationid: { type: Sequelize.INTEGER },
        refareaofpracticeid: { type: Sequelize.INTEGER },
        cpdactivityid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        courseprovider: { type: Sequelize.STRING(500) },
        cpdactivity: { type: Sequelize.STRING(500) },
        cpdenddate: { type: Sequelize.DATE },
        cpdstartdate: { type: Sequelize.DATE },
        cpdtopic: { type: Sequelize.STRING(500) },
        hours: { type: Sequelize.INTEGER },
        refcpdcompetencyassessedid: { type: Sequelize.INTEGER },
        description: { type: Sequelize.STRING(300) },
        coursename: { type: Sequelize.STRING(300) },
        nonverifiablehours: { type: Sequelize.DECIMAL(5, 2) },
        clientidprovider: { type: Sequelize.INTEGER },
        verifiablehours: { type: Sequelize.DECIMAL(5, 2) },
        othercpdcompetencyassessed: { type: Sequelize.STRING(200) },
        activitytypeother: { type: Sequelize.STRING(200) },
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

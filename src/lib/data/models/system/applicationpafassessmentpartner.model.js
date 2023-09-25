const applicationpafassessmentpartner = db.define(
    "applicationpafassessmentpartner",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        firstname: { type: Sequelize.STRING(500) },
        membernumber: { type: Sequelize.STRING(500) },
        middlename: { type: Sequelize.STRING(500) },
        surname: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        officeapplicationid: { type: Sequelize.INTEGER },
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

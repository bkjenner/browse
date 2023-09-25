const applicationstaff = db.define(
    "applicationstaff",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        designation: { type: Sequelize.STRING(500) },
        employeratcorporateyearstart: { type: Sequelize.STRING(500) },
        firstname: { type: Sequelize.STRING(500) },
        lastname: { type: Sequelize.STRING(500) },
        middlename: { type: Sequelize.STRING(500) },
        refemployeetypeid: { type: Sequelize.INTEGER },
        reffulltimeparttimeid: { type: Sequelize.INTEGER },
        refkeyroleid: { type: Sequelize.INTEGER },
        refpartnertypeid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        hasdeclaredonmainoffice: { type: Sequelize.BOOLEAN },
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

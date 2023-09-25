const applicationllppartner = db.define(
    "applicationllppartner",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        firstname: { type: Sequelize.STRING(500) },
        lastname: { type: Sequelize.STRING(500) },
        middlename: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER(4) },
        officepartnerid: { type: Sequelize.INTEGER(4) },
        designation: { type: Sequelize.STRING(75) },
        city: { type: Sequelize.STRING(100) },
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

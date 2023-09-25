const applicationemployeraop = db.define(
    "applicationemployeraop",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER(4) },
        recordstatus: { type: Sequelize.CHAR(1) },
        updatecount: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
        otherdetails: { type: Sequelize.STRING(2000) },
        refareasofpracticeid: { type: Sequelize.INTEGER(4) },
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

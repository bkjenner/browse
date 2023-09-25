const employeraop = db.define(
    "employeraop",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        officeid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        refareasofpracticeid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
        otherdetails: { type: Sequelize.STRING(2000) },
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

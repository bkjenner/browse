const llpdeclaration = db.define(
    "llpdeclaration",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        officeid: { type: Sequelize.INTEGER },
        declarationyear: { type: Sequelize.INTEGER },
        declarationdate: { type: Sequelize.DATE },
        refstatusid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        numberofpartners: { type: Sequelize.INTEGER },
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

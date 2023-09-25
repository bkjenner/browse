const characterandreputation = db.define(
    "characterandreputation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientidmember: { type: Sequelize.INTEGER },
        declarationdate: { type: Sequelize.DATE },
        declarationyear: { type: Sequelize.INTEGER },
        followupdate: { type: Sequelize.DATE },
        hasresolved: { type: Sequelize.BOOLEAN },
        notes: { type: Sequelize.STRING(500) },
        refdeclarationstatusid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
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

const clienttrustfund = db.define(
    "clienttrustfund",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        reftrustfunddeclarationstatusid: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        reftrustfunddeclarationstatusid: { type: Sequelize.INTEGER },
        declarationdate: { type: Sequelize.DATE },
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

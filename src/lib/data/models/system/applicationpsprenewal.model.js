const applicationpsprenewal = db.define(
    "applicationpsprenewal",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationaddressidbusiness: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        employername: { type: Sequelize.STRING(500) },
        refpreferredmailingaddresstypeid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        statusrefid: { type: Sequelize.INTEGER },
        declarationdatetime: { type: Sequelize.DATE },
        ismanagingtrustfund: { type: Sequelize.BOOLEAN },
        clientidpsp: { type: Sequelize.INTEGER },
        clientiddesignatedmember: { type: Sequelize.INTEGER },
        renewalyear: { type: Sequelize.INTEGER },
        copyyear: { type: Sequelize.INTEGER },
        psprenewalstatusid: { type: Sequelize.INTEGER(4) },
        trustfundsformfilename: { type: Sequelize.STRING(500) },
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

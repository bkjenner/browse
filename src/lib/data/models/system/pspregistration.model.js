const pspregistration = db.define(
    "pspregistration",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationaddressidbusiness: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        clientiddesignatedmember: { type: Sequelize.INTEGER },
        clientidpsp: { type: Sequelize.INTEGER },
        designatedmembername: { type: Sequelize.STRING(500) },
        documentidclientfileplan: { type: Sequelize.INTEGER },
        documentidundertaking: { type: Sequelize.INTEGER },
        employername: { type: Sequelize.STRING(500) },
        expectedpracticecommencementdate: { type: Sequelize.DATE },
        hasacknowledgedareaofpractice: { type: Sequelize.BOOLEAN },
        isclientfileplanattached: { type: Sequelize.BOOLEAN },
        isundertakingattached: { type: Sequelize.BOOLEAN },
        updatecount: { type: Sequelize.INTEGER },
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

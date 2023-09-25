const pcregistration = db.define(
    "pcregistration",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationaddressidbusiness: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        clientiddesignatedmember: { type: Sequelize.INTEGER },
        documentidapplication: { type: Sequelize.STRING(500) },
        documentidarticle: { type: Sequelize.INTEGER },
        documentidstatementofparticulars: { type: Sequelize.INTEGER },
        firmname: { type: Sequelize.STRING(500) },
        ispaymentreceived: { type: Sequelize.BOOLEAN },
        otherapplicationreason: { type: Sequelize.STRING(500) },
        pcname: { type: Sequelize.STRING(500) },
        refpcreasonforapplicationid: { type: Sequelize.INTEGER },
        refsubmissionmethodid: { type: Sequelize.INTEGER },
        reftypeofdocumentid: { type: Sequelize.INTEGER },
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

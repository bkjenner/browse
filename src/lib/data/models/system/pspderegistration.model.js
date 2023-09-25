const pspderegistration = db.define(
    "pspderegistration",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        cessationdate: { type: Sequelize.DATE },
        clientiddesignatedmember: { type: Sequelize.INTEGER },
        clientidpsp: { type: Sequelize.INTEGER },
        declarationdatetime: { type: Sequelize.DATE },
        documentidclientrecords: { type: Sequelize.INTEGER },
        pspderegistratonotherreason: { type: Sequelize.STRING("MAX") },
        refpspderegistrationreasonid: { type: Sequelize.INTEGER },
        refpspderegistrationtransfereeoptionid: { type: Sequelize.INTEGER },
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

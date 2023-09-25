const mailoptiondetail = db.define(
    "mailoptiondetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        refaddresstypeid: { type: Sequelize.INTEGER },
        refemailaddresstypeid: { type: Sequelize.INTEGER },
        refmailingmethodid: { type: Sequelize.INTEGER },
        refmailingoptiontypeid: { type: Sequelize.INTEGER },
        refsupressreasonid: { type: Sequelize.INTEGER },
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

const applicationofficeothername = db.define(
    "applicationofficeothername",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        othernameenddate: { type: Sequelize.DATE },
        isactive: { type: Sequelize.BOOLEAN },
        officeid: { type: Sequelize.INTEGER },
        othername: { type: Sequelize.STRING(100) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refothernametypeid: { type: Sequelize.INTEGER },
        othernamestartdate: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        originalrecordid: { type: Sequelize.INTEGER },
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

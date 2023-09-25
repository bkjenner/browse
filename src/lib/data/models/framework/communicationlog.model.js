const communicationlog = db.define(
    "communicationlog",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        communicationtypeid: { type: Sequelize.INTEGER, allowNull: false },
        content: { type: Sequelize.STRING },
        issueddate: { type: Sequelize.DATE },
        contactid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        updatedate: { type: Sequelize.DATE },
        recordstatus: {
            type: Sequelize.STRING(1),
            defaultValue: "A",
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        hasTrigger: true,
    },
);

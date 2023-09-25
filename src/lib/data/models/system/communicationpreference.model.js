const communicationpreference = db.define(
    "communicationpreference",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientidcreatedby: { type: Sequelize.INTEGER },
        clientidupdateby: { type: Sequelize.INTEGER },
        createddate: { type: Sequelize.DATE },
        description: { type: Sequelize.STRING(500) },
        displayorder: { type: Sequelize.INTEGER },
        ismandatory: { type: Sequelize.BOOLEAN },
        name: { type: Sequelize.STRING(500) },
        refcommunicationpreferencestatusid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        updateddate: { type: Sequelize.DATE },
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

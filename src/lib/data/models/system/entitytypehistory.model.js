const entitytypehistory = db.define(
    "entitytypehistory",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        changeddate: { type: Sequelize.DATE },
        clientid: { type: Sequelize.INTEGER },
        clientidchangedby: { type: Sequelize.INTEGER },
        refclienttypeid: { type: Sequelize.INTEGER },
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

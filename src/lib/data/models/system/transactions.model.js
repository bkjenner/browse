const transactions = db.define(
    "transactions",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        allowtriggerupdate: { type: Sequelize.BOOLEAN },
        batchid: { type: Sequelize.INTEGER(18) },
        billingyear: { type: Sequelize.INTEGER },
        description: { type: Sequelize.STRING(150) },
        duedate: { type: Sequelize.DATE },
        invoicenumber: { type: Sequelize.STRING(30) },
        recordstatus: { type: Sequelize.CHAR(1) },
        recordtype: { type: Sequelize.STRING(3) },
        referencenumber: { type: Sequelize.STRING(15) },
        transactiondate: { type: Sequelize.DATE },
        refpostingstatusid: { type: Sequelize.INTEGER },
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

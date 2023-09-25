const invoice = db.define(
    "invoice",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        billingaccountid: { type: Sequelize.INTEGER },
        transactionid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        postingidcurrent: { type: Sequelize.INTEGER },
        adjustmentamount: { type: Sequelize.DECIMAL },
        invoiceamount: { type: Sequelize.DECIMAL },
        invoicebalance: { type: Sequelize.DECIMAL },
        invoicetype: { type: Sequelize.STRING },
        paidamount: { type: Sequelize.DECIMAL },
        penaltyamount: { type: Sequelize.DECIMAL },
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

invoice.associate = function (db) {
    db.models.invoice.belongsTo(db.models.transactions, {
        foreignKey: "transactionid",
        constraints: false,
        unique: false,
        as: "invoicetransaction",
    });
};

const billingaccount = db.define(
    "billingaccount",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER(10) },
        currentbalance: { type: Sequelize.DECIMAL },
        dbcodeid: { type: Sequelize.INTEGER(18) },
        dbid: { type: Sequelize.STRING(500) },
        glaccountid: { type: Sequelize.INTEGER(10) },
        gstexempt: { type: Sequelize.BOOLEAN },
        name: { type: Sequelize.STRING(200) },
        recordstatus: { type: Sequelize.CHAR(1) },
        temp_pass_cd: { type: Sequelize.STRING(15) },
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

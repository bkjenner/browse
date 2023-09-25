const awardandachievement = db.define(
    "awardandachievement",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientidmember: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(500) },
        notes: { type: Sequelize.STRING(8000) },
        otheraward: { type: Sequelize.STRING(8000) },
        transactiondate: { type: Sequelize.DATE },
        updatecount: { type: Sequelize.INTEGER },
        yearawarded: { type: Sequelize.INTEGER },
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

awardandachievement.associate = function (db) {
    db.models.awardandachievement.belongsTo(db.models.client, {
        foreignKey: "clientidmember",
        constraints: false,
        unique: false,
        as: "awardclient",
    });
};

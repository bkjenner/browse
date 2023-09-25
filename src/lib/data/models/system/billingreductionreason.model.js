const billingreductionreason = db.define(
    "billingreductionreason",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        billingreductioncodeid: { type: Sequelize.INTEGER },
        description: { type: Sequelize.STRING(100) },
        recordstatus: { type: Sequelize.CHAR(1) },
        updatecount: { type: Sequelize.INTEGER },
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

billingreductionreason.associate = function (db) {
    db.models.billingreductionreason.belongsTo(db.models.memberduestatushistory, {
        foreignKey: "id",
        constraints: false,
        unique: false,
        as: "duestatus",
    });
    db.models.billingreductionreason.belongsTo(db.models.billingreductioncode, {
        foreignKey: "billingreductioncodeid",
        constraints: false,
        unique: false,
        as: "billingreductioncode",
    });
};

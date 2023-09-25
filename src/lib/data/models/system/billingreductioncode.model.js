const billingreductioncode = db.define(
    "billingreductioncode",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        billingreductioncode: { type: Sequelize.STRING(10) },
        description: { type: Sequelize.STRING(150) },
        istemporary: { type: Sequelize.BOOLEAN(1) },
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

billingreductioncode.associate = function (db) {
    db.models.billingreductioncode.hasMany(db.models.memberduestatushistory, {
        foreignKey: "billingreductioncodeid",
        constraints: false,
        unique: false,
        as: "billingreductioncodememberdue",
    });
    db.models.billingreductioncode.hasMany(db.models.billingreductionreason, {
        foreignKey: "billingreductioncodeid",
        constraints: false,
        unique: false,
        as: "billingreductionreason",
    });
};

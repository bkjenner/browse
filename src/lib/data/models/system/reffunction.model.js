const reffunction = db.define(
    "reffunction",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: { type: Sequelize.STRING(100) },
        functioncode: { type: Sequelize.STRING(5) },
        recordstatus: { type: Sequelize.CHAR(1) },
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

reffunction.associate = function (db) {
    db.models.reffunction.hasOne(db.models.officefunction, {
        foreignKey: "reffunctionid",
        constraints: false,
        unique: false,
        as: "reffunction",
    });
};

const officefunction = db.define(
    "officefunction",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        officerelatedfunctionid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        reffunctionid: { type: Sequelize.INTEGER },
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

officefunction.associate = function (db) {
    db.models.officefunction.belongsTo(db.models.reffunction, {
        foreignKey: "reffunctionid",
        constraints: false,
        unique: false,
        as: "reffunction",
    });
    db.models.officefunction.belongsTo(db.models.officerelatedfunction, {
        foreignKey: "officerelatedfunctionid",
        constraints: false,
        unique: false,
        as: "officefunction",
    });
};

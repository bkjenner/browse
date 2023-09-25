const officerelatedfunction = db.define(
    "officerelatedfunction",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        relatedfunctionenddate: { type: Sequelize.DATE },
        officeid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        refrelatedfunctiontypeid: { type: Sequelize.INTEGER },
        relatedfunctionname: { type: Sequelize.STRING(100) },
        relatedfunctionstartdate: { type: Sequelize.DATE },
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

officerelatedfunction.associate = function (db) {
    db.models.officerelatedfunction.hasMany(db.models.officefunction, {
        foreignKey: "officerelatedfunctionid",
        constraints: false,
        unique: false,
        as: "officefunctions",
    });
};

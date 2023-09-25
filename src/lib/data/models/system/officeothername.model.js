const officeothername = db.define(
    "officeothername",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        othernameenddate: { type: Sequelize.DATE },
        isactive: { type: Sequelize.BOOLEAN },
        officeid: { type: Sequelize.INTEGER },
        othername: { type: Sequelize.STRING(100) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refothernametypeid: { type: Sequelize.INTEGER },
        othernamestartdate: { type: Sequelize.DATE },
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

officeothername.associate = function (db) {
    db.models.officeothername.belongsTo(db.models.referencefields, {
        foreignKey: "refothernametypeid",
        constraints: false,
        unique: false,
        as: "officenametype",
    });
};

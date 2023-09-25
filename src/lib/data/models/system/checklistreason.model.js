const checklistreason = db.define(
    "checklistreason",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        explanation: { type: Sequelize.STRING(500) },
        applicationid: { type: Sequelize.INTEGER },
        checklistoptiongroupid: { type: Sequelize.INTEGER },
        checklistitemid: { type: Sequelize.INTEGER(4) },
        processstateid: { type: Sequelize.INTEGER(4) },
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

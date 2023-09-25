const checklistanswers = db.define(
    "checklistanswers",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        publicnotes: { type: Sequelize.STRING(4000) },
        applicationid: { type: Sequelize.INTEGER },
        checklistoptiongroupid: { type: Sequelize.INTEGER },
        checklistitemid: { type: Sequelize.INTEGER(4) },
        processstateid: { type: Sequelize.INTEGER(4) },
        internalnotes: { type: Sequelize.STRING(4000) },
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

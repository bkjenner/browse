const checklistnotes = db.define(
    "checklistnotes",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        publicnotes: { type: Sequelize.STRING(500) },
        applicationid: { type: Sequelize.INTEGER },
        checklistoptiongroupid: { type: Sequelize.INTEGER },
        checklistitemid: { type: Sequelize.INTEGER(4) },
        processstateid: { type: Sequelize.INTEGER(4) },
        internalnotes: { type: Sequelize.STRING(500) },
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

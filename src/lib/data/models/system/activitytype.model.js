const activitytype = db.define(
    "activitytype",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        activitytypelinkid: { type: Sequelize.INTEGER },
        comments: { type: Sequelize.TEXT },
        departmentid: { type: Sequelize.INTEGER },
        milestone: { type: Sequelize.BOOLEAN },
        name: { type: Sequelize.STRING(100) },
        notetemplate: { type: Sequelize.STRING(255) },
        refcostunitid: { type: Sequelize.INTEGER },
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

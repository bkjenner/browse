const alert = db.define(
    "alert",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        alertdate: { type: Sequelize.DATE },
        refalertdisplayid: { type: Sequelize.INTEGER },
        refalertlinkedsourceid: { type: Sequelize.INTEGER },
        refalertpriorityid: { type: Sequelize.INTEGER },
        refalertstatusid: { type: Sequelize.INTEGER },
        refdepartmentid: { type: Sequelize.INTEGER },
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

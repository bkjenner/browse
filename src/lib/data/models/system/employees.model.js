const employees = db.define(
    "employees",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        browserecord: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        email: { type: Sequelize.STRING(500) },
        issendemailontaskassignment: { type: Sequelize.BOOLEAN },
        issendemailontaskcompleted: { type: Sequelize.BOOLEAN },
        password: { type: Sequelize.STRING(255) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refdepartmentid: { type: Sequelize.INTEGER },
        refparentid: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        refteamid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        username: { type: Sequelize.STRING(50) },
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

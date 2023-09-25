const team = db.define(
    "team",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        issendemailontaskassignment: { type: Sequelize.BOOLEAN },
        issendemailontaskcompleted: { type: Sequelize.BOOLEAN },
        notificationemail: { type: Sequelize.STRING(500) },
        refdepartmentid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(500) },
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

team.associate = function (db) {
    db.models.team.belongsTo(db.models.employeeteam, {
        foreignKey: "id",
        constraints: false,
        unique: false,
        as: "teamemployeeteam",
    });
};

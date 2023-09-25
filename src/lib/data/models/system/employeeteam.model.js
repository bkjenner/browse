const employeeteam = db.define(
    "employeeteam",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        teamid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
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

employeeteam.associate = function (db) {
    db.models.employeeteam.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "employeeteamclient",
    });
    db.models.employeeteam.belongsTo(db.models.team, {
        foreignKey: "teamid",
        constraints: false,
        unique: false,
        as: "employeeteamteam",
    });
};

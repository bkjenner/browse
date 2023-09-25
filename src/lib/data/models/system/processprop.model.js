const processprop = db.define(
    "processprop",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        processid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(100) },
        value: { type: Sequelize.STRING(4000) },
        recordstatus: { type: Sequelize.CHAR(1) },
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

processprop.associate = function (db) {
    db.models.processprop.belongsTo(db.models.process, {
        foreignKey: "processid",
        constraints: false,
        unique: false,
        as: "process",
    });
};

const checklistbody = db.define(
    "checklistbody",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        checklistid: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        module: { type: Sequelize.STRING(200) },
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

checklistbody.associate = function (db) {
    db.models.checklistbody.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "checklist",
    });
    db.models.checklistbody.belongsTo(db.models.checklist, {
        foreignKey: "checklistid",
        constraints: false,
        unique: false,
        as: "body",
    });
};

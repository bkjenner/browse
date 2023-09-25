const checklist = db.define(
    "checklist",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(200) },
        updatecount: { type: Sequelize.INTEGER },
        updatedate: { type: Sequelize.DATE },
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

checklist.associate = function (db) {
    db.models.checklist.hasMany(db.models.checklistitem, {
        foreignKey: "checklistid",
        constraints: false,
        unique: false,
    });
};

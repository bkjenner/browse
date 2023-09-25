const checklistitem = db.define(
    "checklistitem",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        checklistid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(2000) },
        caption: { type: Sequelize.STRING(200) },
        checklistoptiongroup: { type: Sequelize.STRING(200) },
        sequence: { type: Sequelize.INTEGER },
        additionalinfo: { type: Sequelize.BOOLEAN },
        generatenotes: { type: Sequelize.BOOLEAN },
        actionvalue: { type: Sequelize.STRING(200) },
        reqinfoname: { type: Sequelize.STRING(200) },
        displaystep: { type: Sequelize.INTEGER(3) },
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

checklistitem.associate = function (db) {
    db.models.checklistitem.belongsTo(db.models.checklist, {
        foreignKey: "checklistid",
        constraints: false,
        unique: false,
        as: "checklist",
    });
};

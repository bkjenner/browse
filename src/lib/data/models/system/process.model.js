const process = db.define(
    "process",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        caption: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(200) },
        name: { type: Sequelize.STRING(100) },
        refdepartmentid: { type: Sequelize.INTEGER },
        refentitytypeid: { type: Sequelize.INTEGER },
        teamid: { type: Sequelize.INTEGER },
        startrule: { type: Sequelize.STRING(200) },
        endrule: { type: Sequelize.STRING(200) },
        parentid: { type: Sequelize.INTEGER },
        sequence: { type: Sequelize.INTEGER },
        module: { type: Sequelize.STRING(200) },
        refprocesstypeid: { type: Sequelize.INTEGER },
        refprocessstatusid: { type: Sequelize.INTEGER },
        progressonstart: { type: Sequelize.INTEGER },
        administrative: { type: Sequelize.BOOLEAN },
        refparentprocessstatusid: { type: Sequelize.INTEGER },
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

process.associate = function (db) {
    db.models.process.belongsTo(db.models.referencefields, {
        foreignKey: "refprocesstypeid",
        constraints: false,
        unique: false,
        as: "processtype",
    });
    db.models.process.belongsTo(db.models.referencefields, {
        foreignKey: "refprocessstatusid",
        constraints: false,
        unique: false,
        as: "processstatus",
    });
    db.models.process.hasMany(db.models.processstate, {
        foreignKey: "processid",
        constraints: false,
        unique: false,
        as: "processprocessstate",
    });
    db.models.process.hasOne(db.models.team, {
        foreignKey: "id",
        constraints: false,
        unique: false,
        as: "processteam",
    });
    db.models.process.belongsTo(db.models.referencefields, {
        foreignKey: "refparentprocessstatusid",
        constraints: false,
        unique: false,
        as: "parentprocessstatus",
    });
    db.models.process.belongsTo(db.models.process, {
        foreignkey: "parentid",
        targetKey: "id",
        constraints: false,
        unique: false,
        as: "parent",
    });
};

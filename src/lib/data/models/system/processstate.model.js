const processstate = db.define(
    "processstate",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        assigneddate: { type: Sequelize.DATE },
        clientidassignedto: { type: Sequelize.INTEGER },
        clientidcompletedby: { type: Sequelize.INTEGER },
        clientidcreatedby: { type: Sequelize.INTEGER },
        completeddate: { type: Sequelize.DATE },
        data: { type: Sequelize.TEXT },
        initiateddate: { type: Sequelize.DATE },
        module: { type: Sequelize.STRING(200) },
        parentid: { type: Sequelize.INTEGER },
        processid: { type: Sequelize.INTEGER },
        refprocessstatusid: { type: Sequelize.INTEGER },
        cacheid: { type: Sequelize.STRING(200) },
        progress: { type: Sequelize.INTEGER },
        currentstep: { type: Sequelize.INTEGER },
        administrative: { type: Sequelize.BOOLEAN },
        statusdate: { type: Sequelize.DATE },
        clientidonbehalfof: { type: Sequelize.INTEGER },
        version: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
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

processstate.associate = function (db) {
    db.models.processstate.hasMany(db.models.processstate, {
        foreignKey: "parentid",
        constraints: false,
        unique: false,
        as: "children",
    });
    db.models.processstate.hasOne(db.models.membercpe, {
        foreignKey: "refprocessstateid",
        constraints: false,
        unique: false,
        as: "membercpe",
    });
    db.models.processstate.belongsTo(db.models.client, {
        foreignKey: "clientidassignedto",
        constraints: false,
        unique: false,
        as: "assignedto",
    });
    db.models.processstate.belongsTo(db.models.client, {
        foreignKey: "clientidcompletedby",
        constraints: false,
        unique: false,
        as: "completedby",
    });
    db.models.processstate.belongsTo(db.models.process, {
        foreignKey: "processid",
        constraints: false,
        unique: false,
        as: "process",
    });
    db.models.processstate.belongsTo(db.models.referencefields, {
        foreignKey: "refprocessstatusid",
        constraints: false,
        unique: false,
        as: "processstatus",
    });
    db.models.processstate.belongsTo(db.models.client, {
        foreignKey: "clientidcreatedby",
        constraints: false,
        unique: false,
        as: "createdby",
    });
    db.models.processstate.belongsTo(db.models.processstate, {
        foreignKey: "parentid",
        constraints: false,
        unique: false,
        as: "processstatechild",
    });
    db.models.processstate.belongsTo(db.models.client, {
        foreignKey: "clientidonbehalfof",
        constraints: false,
        unique: false,
        as: "clientonbehalfof",
    });
    db.models.processstate.belongsTo(db.models.application, {
        foreignKey: "applicationid",
        constraints: false,
        unique: false,
        as: "application",
    });
    db.models.processstate.belongsTo(db.models.module, {
        foreignKey: "moduleid",
        constraints: false,
        unique: false,
        as: "moduletype",
    });
};

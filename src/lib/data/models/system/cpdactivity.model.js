const cpdactivity = db.define(
    "cpdactivity",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        activitytypeid: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        refcpdcompetencyassessedid: { type: Sequelize.INTEGER },
        completed: { type: Sequelize.DATE },
        description: { type: Sequelize.STRING(300) },
        coursename: { type: Sequelize.STRING(150) },
        nonverifiablehours: { type: Sequelize.DECIMAL(5, 2) },
        clientidprovider: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        updatecount: { type: Sequelize.INTEGER },
        verifiablehours: { type: Sequelize.DECIMAL(5, 2) },
        othercpdcompetencyassessed: { type: Sequelize.STRING(200) },
        provider: { type: Sequelize.STRING(100) },
        activitytypeother: { type: Sequelize.STRING(200) },
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

cpdactivity.associate = function (db) {
    db.models.cpdactivity.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "cpdactivityclient",
    });
    db.models.cpdactivity.belongsTo(db.models.cpdactivitytype, {
        foreignKey: "activitytypeid",
        constraints: false,
        unique: false,
        as: "cpdactivitytype",
    });
    db.models.cpdactivity.belongsTo(db.models.client, {
        foreignKey: "clientidprovider",
        constraints: false,
        unique: false,
        as: "cpdactivityclientprovider",
    });
    db.models.cpdactivity.belongsTo(db.models.referencefields, {
        foreignKey: "clientidprovider",
        constraints: false,
        unique: false,
        as: "cpdprovider",
    });
    db.models.cpdactivity.belongsTo(db.models.referencefields, {
        foreignKey: "refcpdcompetencyassessedid",
        constraints: false,
        unique: false,
        as: "cpdcompetencyaddressed",
    });
};

const cpdactivitytype = db.define(
    "cpdactivitytype",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: { type: Sequelize.STRING(100) },
        recordstatus: { type: Sequelize.CHAR(1) },
        updatecount: { type: Sequelize.INTEGER },
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

cpdactivitytype.associate = function (db) {
    db.models.cpdactivitytype.hasMany(db.models.cpdactivity, {
        foreignKey: "activitytypeid",
        constraints: false,
        unique: false,
        as: "typecpdactivity",
    });
};

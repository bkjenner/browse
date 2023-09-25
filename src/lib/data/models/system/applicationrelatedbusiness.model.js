const applicationrelatedbusiness = db.define(
    "applicationrelatedbusiness",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        businessname: { type: Sequelize.STRING(100) },
        originalid: { type: Sequelize.INTEGER },
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

applicationrelatedbusiness.associate = function (db) {
    db.models.applicationrelatedbusiness.hasMany(db.models.applicationbusiness, {
        foreignKey: "applicationrelatedbusinessid",
        constraints: false,
        unique: false,
        as: "applicationbusiness",
    });
};

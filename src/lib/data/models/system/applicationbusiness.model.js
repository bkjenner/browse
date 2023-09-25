const applicationbusiness = db.define(
    "applicationbusiness",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationrelatedbusinessid: { type: Sequelize.INTEGER },
        reffunctionid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        originalid: { type: Sequelize.INTEGER },
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

applicationbusiness.associate = function (db) {
    db.models.applicationbusiness.belongsTo(db.models.applicationrelatedbusiness, {
        foreignKey: "applicationrelatedbusinessid",
        constraints: false,
        unique: false,
        as: "applicationbusiness",
    });
};

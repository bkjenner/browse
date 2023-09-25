const memberapplicationpostsecondary = db.define(
    "memberapplicationpostsecondary",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        degreecompletedyear: { type: Sequelize.INTEGER },
        degreestartedyear: { type: Sequelize.INTEGER },
        memberapplicationid: { type: Sequelize.INTEGER },
        otherinstitution: { type: Sequelize.STRING(500) },
        refcountryid: { type: Sequelize.INTEGER },
        refdegreelevelid: { type: Sequelize.INTEGER },
        refeducationtypeid: { type: Sequelize.INTEGER },
        reffieldofstudyid: { type: Sequelize.INTEGER },
        refnodgreereasonid: { type: Sequelize.INTEGER },
        universityclientid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        otherfieldofstudy: { type: Sequelize.STRING(200) },
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

memberapplicationpostsecondary.associate = function (db) {
    db.models.memberapplicationpostsecondary.belongsTo(db.models.referencefields, {
        foreignKey: "refdegreelevelid",
        constraints: false,
        unique: false,
        as: "degreelevel",
    });
    db.models.memberapplicationpostsecondary.belongsTo(db.models.referencefields, {
        foreignKey: "reffieldofstudyid",
        constraints: false,
        unique: false,
        as: "fieldofstudy",
    });
    db.models.memberapplicationpostsecondary.belongsTo(db.models.referencefields, {
        foreignKey: "refeducationtypeid",
        constraints: false,
        unique: false,
        as: "educationtype",
    });
    db.models.memberapplicationpostsecondary.belongsTo(db.models.client, {
        foreignKey: "universityclientid",
        constraints: false,
        unique: false,
        as: "universityclient",
    });
};

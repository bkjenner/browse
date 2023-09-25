const memberuniversity = db.define(
    "memberuniversity",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        degreecompletedyear: { type: Sequelize.INTEGER },
        degreedate: { type: Sequelize.DATE },
        memberid: { type: Sequelize.INTEGER },
        otherinstitution: { type: Sequelize.STRING(500) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refeducationtypeid: { type: Sequelize.INTEGER },
        reffieldcodeid: { type: Sequelize.INTEGER },
        reflevelcodeid: { type: Sequelize.INTEGER },
        refdegreelevelid: { type: Sequelize.INTEGER },
        reftranscriptrcid: { type: Sequelize.INTEGER },
        relationshipid: { type: Sequelize.INTEGER },
        universityclientid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        otherfieldofstudy: { type: Sequelize.STRING(500) },
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

memberuniversity.associate = function (db) {
    db.models.memberuniversity.belongsTo(db.models.client, {
        foreignKey: "universityclientid",
        constraints: false,
        unique: false,
        as: "memberuniversityclient",
    });
    db.models.memberuniversity.belongsTo(db.models.referencefields, {
        foreignKey: "reflevelcodeid",
        constraints: false,
        unique: false,
        as: "memberuniversitylevel",
    });
    db.models.memberuniversity.belongsTo(db.models.referencefields, {
        foreignKey: "refeducationtypeid",
        constraints: false,
        unique: false,
        as: "memberuniversityeducationtype",
    });
    db.models.memberuniversity.belongsTo(db.models.referencefields, {
        foreignKey: "reffieldcodeid",
        constraints: false,
        unique: false,
        as: "memberuniversityfield",
    });
    db.models.memberuniversity.belongsTo(db.models.referencefields, {
        foreignKey: "refdegreelevelid",
        constraints: false,
        unique: false,
        as: "memberuniversitydegreelevel",
    });
};

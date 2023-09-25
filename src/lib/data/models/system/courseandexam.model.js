const courseandexam = db.define(
    "courseandexam",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        attemptnumber: { type: Sequelize.INTEGER },
        clientidmember: { type: Sequelize.INTEGER },
        courseorexamname: { type: Sequelize.STRING(500) },
        finisheddate: { type: Sequelize.DATE },
        refcoursesandexamsorderedbyid: { type: Sequelize.INTEGER },
        refcoursesandexamsproviderid: { type: Sequelize.INTEGER },
        refcoursesandexamsstatusid: { type: Sequelize.INTEGER },
        refcoursesandexamstypeid: { type: Sequelize.INTEGER },
        requiredcompletiondate: { type: Sequelize.DATE },
        requiredcourseorexamname: { type: Sequelize.STRING(500) },
        results: { type: Sequelize.STRING(500) },
        updatecount: { type: Sequelize.INTEGER },
        refrequiredcourseandexamid: { type: Sequelize.INTEGER },
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

courseandexam.associate = function (db) {
    db.models.courseandexam.belongsTo(db.models.client, {
        foreignKey: "clientidmember",
        constraints: false,
        unique: false,
        as: "courseclients",
    });
    db.models.courseandexam.belongsTo(db.models.referencefields, {
        foreignKey: "refcoursesandexamstypeid",
        constraints: false,
        unique: false,
        as: "courseandexamtype",
    });
    db.models.courseandexam.belongsTo(db.models.referencefields, {
        foreignKey: "refcoursesandexamsstatusid",
        constraints: false,
        unique: false,
        as: "courseandexamstatus",
    });
    db.models.courseandexam.belongsTo(db.models.referencefields, {
        foreignKey: "refcoursesandexamsorderedbyid",
        constraints: false,
        unique: false,
        as: "courseandexamorderedby",
    });
    db.models.courseandexam.belongsTo(db.models.referencefields, {
        foreignKey: "refcoursesandexamsproviderid",
        constraints: false,
        unique: false,
        as: "courseandexamprovider",
    });
    db.models.courseandexam.belongsTo(db.models.referencefields, {
        foreignKey: "refrequiredcourseandexamid",
        constraints: false,
        unique: false,
        as: "requiredcourseandexamid",
    });
};

const checklistoptiongroup = db.define(
    "checklistoptiongroup",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        updatedate: { type: Sequelize.DATE },
        group: { type: Sequelize.STRING(200) },
        value: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(200) },
        sequence: { type: Sequelize.INTEGER },
        publicnote: { type: Sequelize.STRING(2000) },
        internalnote: { type: Sequelize.STRING(2000) },
        updatecount: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        isincompliant: { type: Sequelize.BOOLEAN(1) },
        recordcount: { type: Sequelize.INTEGER(4) },
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

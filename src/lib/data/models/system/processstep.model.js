const processstep = db.define(
    "processstep",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        caption: { type: Sequelize.STRING(200) },
        description: { type: Sequelize.STRING(200) },
        name: { type: Sequelize.STRING(100) },
        processid: { type: Sequelize.INTEGER },
        sequence: { type: Sequelize.INTEGER },
        module: { type: Sequelize.STRING(200) },
        startrule: { type: Sequelize.STRING(200) },
        endrule: { type: Sequelize.STRING(200) },
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

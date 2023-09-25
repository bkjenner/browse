const applicationnote = db.define(
    "applicationnote",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        clientidassignedto: { type: Sequelize.INTEGER(4) },
        clientidassignedby: { type: Sequelize.INTEGER(4) },
        sourcetype: { type: Sequelize.STRING(50) },
        sourceid: { type: Sequelize.INTEGER },
        notedate: { type: Sequelize.DATE },
        note: { type: Sequelize.TEXT },
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

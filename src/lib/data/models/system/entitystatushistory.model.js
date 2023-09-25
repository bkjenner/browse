const entitystatushistory = db.define(
    "entitystatushistory",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        refclientstatusid: { type: Sequelize.INTEGER },
        refclientsubstatusid: { type: Sequelize.INTEGER },
        refsubstatusreasonid: { type: Sequelize.INTEGER },
        substatusreasoneffectivedate: { type: Sequelize.DATE },
        changedate: { type: Sequelize.DATE },
        changetype: { type: Sequelize.INTEGER },
        clientidchangedby: { type: Sequelize.INTEGER },
        designation: { type: Sequelize.STRING(150) },
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

entitystatushistory.associate = function (db) {
    db.models.entitystatushistory.belongsTo(db.models.referencefields, {
        foreignKey: "refclientsubstatusid",
        constraints: false,
        unique: false,
        as: "substatus",
    });
};

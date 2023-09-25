const pcdirector = db.define(
    "pcdirector",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientid: { type: Sequelize.INTEGER },
        createdate: { type: Sequelize.DATE },
        pcid: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
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

pcdirector.associate = function (db) {
    db.models.pcdirector.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "pcdirectorclient",
    });
};

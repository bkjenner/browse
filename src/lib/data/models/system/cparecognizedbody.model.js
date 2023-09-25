const cparecognizedbody = db.define(
    "cparecognizedbody",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientidcparecognizedbody: { type: Sequelize.INTEGER },
        refcountryid: { type: Sequelize.INTEGER },
        refcparecognizedbodytypeid: { type: Sequelize.INTEGER },
        refdesignationid: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        refconditionalsubstatusreasonid: { type: Sequelize.INTEGER },
        contractenddate: { type: Sequelize.DATE },
        contractstartdate: { type: Sequelize.DATE },
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

cparecognizedbody.associate = function (db) {
    db.models.cparecognizedbody.hasOne(db.models.client, {
        foreignKey: "id",
        constraints: false,
        unique: false,
        as: "cparecognizedbodyclient",
    });
};

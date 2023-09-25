const contactuser = db.define(
    "contactuser",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        syschangehistoryid: { type: Sequelize.INTEGER(10) },
        login: { type: Sequelize.STRING(100) },
        password: { type: Sequelize.STRING(250) },
        contactid: { type: Sequelize.INTEGER },
        privatekey: { type: Sequelize.STRING(3000) },
        publickey: { type: Sequelize.STRING(3000) },
        providerid: { type: Sequelize.STRING(200) },
        activated: { type: Sequelize.BOOLEAN },
        activationcode: { type: Sequelize.STRING(255) },
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

contactuser.associate = function (db) {
    contactuser.hasOne(contact, {
        foreignKey: "id",
        constraints: false,
        unique: false,
    });
    db.models.contactuser.hasOne(db.models.contact, {
        foreignKey: "id",
        constraints: false,
        unique: false,
    });
};

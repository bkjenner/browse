const pcshareholder = db.define(
    "pcshareholder",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address1: { type: Sequelize.STRING(75) },
        address2: { type: Sequelize.STRING(75) },
        city: { type: Sequelize.STRING(75) },
        classofshares: { type: Sequelize.STRING(100) },
        clientid: { type: Sequelize.INTEGER },
        clientname: { type: Sequelize.STRING(75) },
        createdate: { type: Sequelize.DATE },
        email: { type: Sequelize.STRING(500) },
        isentity: { type: Sequelize.BOOLEAN },
        isvotingtype: { type: Sequelize.BOOLEAN },
        mobilenumber: { type: Sequelize.STRING(500) },
        numberofshares: { type: Sequelize.STRING(500) },
        pcid: { type: Sequelize.INTEGER },
        phonenumber: { type: Sequelize.STRING(500) },
        postalcode: { type: Sequelize.STRING(30) },
        province: { type: Sequelize.STRING(75) },
        recordstatus: { type: Sequelize.CHAR(1) },
        refrelationshiptypeid: { type: Sequelize.INTEGER },
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

pcshareholder.associate = function (db) {
    db.models.pcshareholder.belongsTo(db.models.referencefields, {
        foreignKey: "refrelationshiptypeid",
        constraints: false,
        unique: false,
        as: "shareholderrelationship",
    });
    db.models.pcshareholder.belongsTo(db.models.client, {
        foreignKey: "clientid",
        constraints: false,
        unique: false,
        as: "pcshareholderclient",
    });
};

const applicationaddress = db.define(
    "applicationaddress",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address1: { type: Sequelize.STRING(500) },
        address2: { type: Sequelize.STRING(500) },
        cityid: { type: Sequelize.INTEGER },
        email: { type: Sequelize.STRING(500) },
        mobilephone: { type: Sequelize.STRING(500) },
        phone: { type: Sequelize.STRING(500) },
        phoneextension: { type: Sequelize.STRING(500) },
        postalcode: { type: Sequelize.STRING(500) },
        refcountryid: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        refaddresstypeid: { type: Sequelize.INTEGER },
        city: { type: Sequelize.STRING(150) },
        refcityid: { type: Sequelize.INTEGER },
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

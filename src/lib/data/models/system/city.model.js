const city = db.define(
    "city",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        countryid: { type: Sequelize.INTEGER },
        provincestateid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        rowstatus: { type: Sequelize.STRING },
        syschangehistoryid: { type: Sequelize.FLOAT },
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

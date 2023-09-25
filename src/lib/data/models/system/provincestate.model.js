const provincestate = db.define(
    "provincestate",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rowstatus: { type: Sequelize.STRING },
        countryid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        shortcode: { type: Sequelize.STRING },
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

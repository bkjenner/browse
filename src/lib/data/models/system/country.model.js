const country = db.define(
    "country",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: Sequelize.STRING },
        shortcode: { type: Sequelize.STRING },
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

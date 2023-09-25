const navigation = db.define(
    "navigation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        parentid: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        url: { type: Sequelize.STRING },
        isrouted: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        caption: { type: Sequelize.STRING },
        command: { type: Sequelize.STRING },
        sequence: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        updatedate: { type: Sequelize.DATE },
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
navigation.belongsTo(navigation, {
    foreignKey: "parentid",
    as: "parent",
    constraints: false,
    unique: false,
});

const contact1 = db.define(
    "contact1",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: { type: Sequelize.STRING(100) },
        parentid: { type: Sequelize.INTEGER(9) },
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

contact1.associate = function (db) {
    contact1.belongsTo(contact1, {
        foreignKey: "parentid",
        as: "parent",
    });
};

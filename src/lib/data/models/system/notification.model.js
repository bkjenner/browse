const notification = db.define(
    "notification",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        notificationtypeid: { type: Sequelize.INTEGER(10) },
        content: { type: Sequelize.STRING(255) },
        action: { type: Sequelize.STRING(255) },
        module: { type: Sequelize.STRING(255) },
        identifier: { type: Sequelize.INTEGER(10) },
        subject: { type: Sequelize.STRING(255) },
        message: { type: Sequelize.STRING("MAX") },
        contactid: { type: Sequelize.INTEGER(10) },
        refteamid: { type: Sequelize.INTEGER(10) },
        read: { type: Sequelize.BOOLEAN },
        candelete: { type: Sequelize.BOOLEAN },
        datecreated: { type: Sequelize.DATE },
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

notification.associate = function (db) {
    db.models.notification.belongsTo(db.models.client, {
        foreignKey: "contactid",
        constraints: false,
        unique: false,
        as: "notificationclient",
    });
};

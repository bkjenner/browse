const applicationpafderegistration = db.define(
    "applicationpafderegistration",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationid: { type: Sequelize.INTEGER },
        cessationdate: { type: Sequelize.DATE },
        clientaddressidderegister: { type: Sequelize.INTEGER },
        clientaddressidfilerelocateinalberta: { type: Sequelize.INTEGER },
        clientidpaf: { type: Sequelize.INTEGER },
        documentidclientrecords: { type: Sequelize.INTEGER },
        refclientfilerelocateoptionid: { type: Sequelize.INTEGER },
        refderegistrationsubreasonid: { type: Sequelize.INTEGER },
        refreasonforderegistrationid: { type: Sequelize.INTEGER },
        reftransfereeoptionid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        declarationdatetime: { type: Sequelize.DATE },
        clientfilerelocatefullfirmname: { type: Sequelize.STRING(500) },
        clientfilerelocatefullbusinessaddress: { type: Sequelize.STRING(500) },
        clientrecordsfilename: { type: Sequelize.STRING(500) },
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

const setup = db.define(
    "setup",
    {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        fiscalstartyear: { type: Sequelize.DATE },
        fiscalendyear: { type: Sequelize.DATE },
        coursecutoffdate: { type: Sequelize.DATE },
        coursestartdate: { type: Sequelize.DATE },
        courseenddate: { type: Sequelize.DATE },
        corporateyearstart: { type: Sequelize.DATE },
        corporateyearend: { type: Sequelize.DATE },
        memberduesreassesscutoffdate: { type: Sequelize.DATE },
        memberrenewalleaddays: { type: Sequelize.INTEGER },
    },
    { timestamps: false, freezeTableName: true },
);

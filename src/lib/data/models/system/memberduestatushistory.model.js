const memberduestatushistory = db.define(
    "memberduestatushistory",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        billingreductioncodeid: { type: Sequelize.INTEGER },
        billingreductionreasonid: { type: Sequelize.INTEGER },
        billingreductionreasonother: { type: Sequelize.STRING(100) },
        billingyear: { type: Sequelize.INTEGER },
        comments: { type: Sequelize.TEXT },
        declarationaddress: { type: Sequelize.STRING(300) },
        declarationchangedate: { type: Sequelize.DATE },
        declarationdate: { type: Sequelize.DATE },
        effectivechangedate: { type: Sequelize.DATE },
        geolocationcountry: { type: Sequelize.STRING(75) },
        ip: { type: Sequelize.STRING(25) },
        isonpaymentplan: { type: Sequelize.BOOLEAN(1) },
        memberid: { type: Sequelize.INTEGER },
        numberofpc: { type: Sequelize.INTEGER },
        recordstatus: { type: Sequelize.CHAR(1) },
        refcicabillingcodeid: { type: Sequelize.INTEGER },
        reficaabillingcodeid: { type: Sequelize.INTEGER },
        refmemberbillingtypeid: { type: Sequelize.INTEGER },
        taxexemptionstatusid: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        refprovinceid: { type: Sequelize.INTEGER },
        hasusdesignation: { type: Sequelize.BOOLEAN(1) },
        istaxexempt: { type: Sequelize.BOOLEAN(1) },
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

memberduestatushistory.associate = function (db) {
    db.models.memberduestatushistory.belongsTo(db.models.member, {
        foreignKey: "memberid",
        constraints: false,
        unique: false,
        as: "member",
    });
    db.models.memberduestatushistory.belongsTo(db.models.billingreductioncode, {
        foreignKey: "billingreductioncodeid",
        constraints: false,
        unique: false,
        as: "memberduebillingreductioncode",
    });
    db.models.memberduestatushistory.belongsTo(db.models.billingreductionreason, {
        foreignKey: "billingreductionreasonid",
        constraints: false,
        unique: false,
        as: "billingreductionreason",
    });
    db.models.memberduestatushistory.belongsTo(db.models.referencefields, {
        foreignKey: "refmemberbillingtypeid",
        constraints: false,
        unique: false,
        as: "billingtype",
    });
    db.models.memberduestatushistory.belongsTo(db.models.referencefields, {
        foreignKey: "refmemberapplicationpathid",
        constraints: false,
        unique: false,
        as: "applicationpath",
    });
};

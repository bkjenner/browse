const applicationpafregistration = db.define(
    "applicationpafregistration",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        applicationaddressidbusiness: { type: Sequelize.INTEGER },
        applicationid: { type: Sequelize.INTEGER },
        candidatefulltimecount: { type: Sequelize.INTEGER },
        candidateparttimecount: { type: Sequelize.INTEGER },
        clientid: { type: Sequelize.INTEGER },
        completeddate: { type: Sequelize.DATE },
        cpafulltimecount: { type: Sequelize.INTEGER },
        cpaparttimecount: { type: Sequelize.INTEGER },
        createddate: { type: Sequelize.DATE },
        designatedmembername: { type: Sequelize.STRING(500) },
        documentidcertificate: { type: Sequelize.INTEGER },
        documentidllpapplication: { type: Sequelize.INTEGER },
        expectedcommencementdate: { type: Sequelize.DATE },
        hasassociationwithregisteredpaf: { type: Sequelize.BOOLEAN },
        hasnameacknowledgement: { type: Sequelize.BOOLEAN },
        hasreportswithinternationalname: { type: Sequelize.BOOLEAN },
        internationalname: { type: Sequelize.STRING(500) },
        ispaymentreceived: { type: Sequelize.BOOLEAN },
        ispliinplace: { type: Sequelize.BOOLEAN },
        lawyerfulltime: { type: Sequelize.INTEGER },
        lawyerparttime: { type: Sequelize.INTEGER },
        letterheadfilename: { type: Sequelize.STRING(500) },
        llpapplicationfilename: { type: Sequelize.STRING(500) },
        otherdescriptivestyle: { type: Sequelize.STRING(500) },
        pafassociationname: { type: Sequelize.STRING(500) },
        pafname: { type: Sequelize.STRING(500) },
        pliinsurername: { type: Sequelize.STRING(500) },
        proposedpafname: { type: Sequelize.STRING(500) },
        mainofficelocation: { type: Sequelize.STRING(500) },
        plipolicynumber: { type: Sequelize.STRING(500) },
        refdescriptivestyleid: { type: Sequelize.INTEGER },
        refoperatingstatusid: { type: Sequelize.INTEGER },
        refoperatingstyleid: { type: Sequelize.INTEGER },
        refoperatingtypeid: { type: Sequelize.INTEGER },
        refreasonforapplicationid: { type: Sequelize.INTEGER },
        technicianfulltime: { type: Sequelize.INTEGER },
        technicianparttime: { type: Sequelize.INTEGER },
        updatecount: { type: Sequelize.INTEGER },
        applicationpliid: { type: Sequelize.INTEGER(4) },
        officeclientid: { type: Sequelize.INTEGER(4) },
        mainofficeclientid: { type: Sequelize.INTEGER(4) },
        refllpstatusid: { type: Sequelize.INTEGER },
        ispprpregistration: { type: Sequelize.BOOLEAN },
        isstaffdeclaredonmainoffice: { type: Sequelize.BOOLEAN },
        isareasofpracticedeclaredonmainoffice: { type: Sequelize.BOOLEAN },
        isclienteleprofiledeclaredonmainoffice: { type: Sequelize.BOOLEAN },
        isengagementresponsibilitydeclaredonmainoffice: {
            type: Sequelize.BOOLEAN,
        },
        declarationdatetime: { type: Sequelize.DATE },
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

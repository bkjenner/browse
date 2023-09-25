var connectionStrings = require("./connectionstrings");

function Settings() {
    this.system = function () {
        this.aesBufferKey = "000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F";
        this.aesIv = "000102030405060708090A0B0C0D0E0F";
        this.authEnabled = false;
        this.baseAppPath = global.baseDir + connectionStrings.baseAppPath;
        this.commandCollection = "command";
        this.commandJoinCollection = "commandjoin";
        this.commandTypeDatasource = 3;
        this.commandTypeModule = 1;
        this.commandTypeModule = 2;
        this.commandTypeRules = 4;
        this.commandTypeSiteAction = 11;
        this.contactCollection = "client";
        this.cookieDomain = connectionStrings.cookieDomain;
        this.cookieKey = "doughycookiesareyummy!";
        this.dataLevelSecurityEnabled = true;

        this.defaultNmapepClientStatusID = 15;
        this.defaultNmadmiapClientStatusID = 16;
        this.defaultNmamraClientStatusID = 16;
        this.defaultNmaotherClientStatusID = 16;
        this.defaultNmadmiapClientTypeID = 23;
        this.defaultNmamraClientTypeID = 23;
        this.defaultNmareinstateClientTypeID = 23;
        this.defaultRefClientTypeID = 25;
        this.defaultNmadmiapClientSubstatusID = 971;
        this.defaultNmamraClientSubstatusID = 971;
        this.defaultNmaotherClientSubstatusID = 971;
        this.defaultNmadmiapBillingTypeID = 11020;
        this.defaultNmamraBillingTypeID = 11030;
        this.defaultNmaotherBillingTypeID = 11030;
        this.defaultNmaotherClientTypeID = 100080;

        this.defaultPortalFolders = ["General", "Finances", "Applications", "Certificates"];
        this.defaultPortalFoldersFirm = ["Applications", "Correspondence", "General", "PLI", "PPRP", "Service Requests", "Trust Fund Declaration"];
        this.defaultPortalFoldersFirmPC = ["Applications", "Correspondence", "Service Requests", "General"];

        this.documentsPath = connectionStrings.documentsPath;
        this.documentsTemplatePath = global.baseDir + connectionStrings.documentsTemplatePath;
        this.googleApiKey = connectionStrings.googleApiKey;
        this.logicalDeleteEnabled = true;
        this.mainDatastore = "mssql";
        this.mainDatastoreConnectionstring = connectionStrings.sqlConnection;
        this.mainDatastoreLogging = true;
        this.mainPrimaryIdentifier = "id";
        this.massMailerUrl = connectionStrings.massMailerUrl;

        this.orgstructureAdministrators = 2;
        this.orgstructurePublic = 3;
        this.orgstructureMember = 5;
        this.orgstructureFirm = 6;
        this.orgstructureStaff = 7;
        this.orgstructureRegisteredUsers = 8;

        this.pEnvironment = connectionStrings.pEnvironment;
        this.parentContactField = "parentcontactid";
        this.publicUserAccount = 1000000;
        this.registeredUserOrgStructure = 8;
        this.reportServiceUrl = connectionStrings.reportServiceUrl;
        this.rsaPrivateKey = connectionStrings.rsaPrivateKey;
        this.rsaPublicKey = connectionStrings.rsaPublicKey;
        this.securityGroupCollection = "securitygroup";
        this.securityGroupCommandCollection = "securitygroupcommand";
        this.securityGroupContactCollection = "securitygroupcontact";
        this.serverAppPath = global.baseDir + "/app";
        this.servicePath = global.baseDir;
        this.servicePort = connectionStrings.servicePort;
        this.sslServicePort = connectionStrings.sslServicePort;
        this.systemUserAccount = 3;
        this.templatePath = global.baseDir + "/app";
        this.tokenAlgorithm = "RSA";
        this.tokenExpiryMins = 86400;
        this.tokenKey = "dogsarebetterthancats!";
        this.uiPath = global.baseDir + "/lib/ui";
        this.userAccountCollection = "client";
        this.userIDField = "id";
        this.webpackPath = global.baseDir;

        return this;
    };

    this.rulesEngine = function () {
        this.accessControlRule = "rulesengineValidateRuleAccess";
        this.datasourcePath = global.baseDir + "/lib/data/datasources/";
        this.isCached = false;
        this.isStatic = false;
        this.restrictedAccess = false;
        this.ruleTestPath = global.baseDir + "/test/rules/";
        this.rulesPath = global.baseDir + "/lib/rules/";
        this.whitelist = ["orgstructureRefreshCacheForUsers"];

        return this;
    };

    this.cache = function () {
        this.cacheMode = "redis";
        this.cachePersistPath = global.baseDir + "/cache/rules/";
        this.isLocalCachePersisted = true;
        this.serverHostname = connectionStrings.redisConnection;
        this.serverPassword = connectionStrings.redisPassword;
        this.serverPort = connectionStrings.redisPort;

        return this;
    };

    this.communication = function () {
        this.awsAccessKeyId = "AKIAIDY2DDQWXZMY5OGA";
        this.awsFailureEmailFrom = "ShamirTestEmail@gmail.com";
        this.awsFailureEmailTo = "ShamirTestEmail@gmail.com";
        this.awsPlatformApplicationArn = "arn:aws:sns:us-west-2:917906231717:app/APNS_SANDBOX/Framwork";
        this.awsRegion = "us-west-2";
        this.awsSMSAccessKeyId = "AKIAIDY2DDQWXZMY5OGA";
        this.awsSMSRegion = "us-east-1";
        this.awsSMSSecretAccessKey = "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";
        this.awsSecretAccessKey = "RpsE5U5RLUq8tcr+Kx6En35tBKScd+o10AqB05qE";
        this.communicationTypeIdEmail = 2;
        this.communicationTypeIdMobile = 4;
        this.communicationTypeIdSMS = 1;
        this.communicationTypeIdWebDesktop = 3;
        this.fromEmail = "ShamirTestEmail@gmail.com";

        return this;
    };

    this.errorLogging = function () {
        this.consoleMessage = true;
        this.logPath = global.baseDir + "/log/";
        this.logToFile = true;

        return this;
    };

    this.import = function () {
        this.importPath = global.baseDir + "/imports";
        this.ignoreTables = [
            "app",
            "appmodule",
            "commandtype",
            "communicationlog",
            "communicationtype",
            "component",
            "componentlogic",
            "componentprop",
            "componentreducer",
            "componentstate",
            "contact",
            "contactuser",
            "datasource",
            "datasourcefield",
            "datatype",
            "dictcolumn",
            "dicttable",
            "dictrelation",
            "initialstate",
            "logic",
            "module",
            "modulecomponent",
            "modulecomponentlogic",
            "modulecomponentprop",
            "modulecomponentreducer",
            "modulecomponentstate",
            "modulelogic",
            "moduleprop",
            "modulereducer",
            "modulerule",
            "modulestate",
            "notification",
            "notificationtype",
            "orgstructure",
            "orgstructurecommand",
            "orgstructureresource",
            "raci",
            "reducer",
            "rule",
            "scheduler",
            "schedulertype",
            "sysbase",
        ];

        return this;
    };

    this.sysbuilder = function () {
        this.modelPath = global.baseDir + "/src/lib/data/models/";
        this.systemModelPath = global.baseDir + "/src/lib/data/models/";
        this.systemMigrationPath = global.baseDir + "/imports/";
        this.defaultRefTables = [
            "commandtype",
            "communicationtype",
            "notificationtype",
            "datatype",
            "raci",
            "initialstate",
            "logic",
            "reducer",
            "rule",
            "component",
            "componentlogic",
            "componentprop",
            "componentreducer",
            "componentstate",
        ];

        this.systemDefTables = [
            "commandtype",
            "communicationtype",
            "notificationtype",
            "datasource",
            "datsourcetable",
            "datasourcefield",
            "datatype",
            "raci",
            "initialstate",
            "logic",
            "reducer",
            "rule",
            "component",
            "componentlogic",
            "componentprop",
            "componentreducer",
            "componentstate",
            "module",
            "modulecomponent",
            "modulecomponentlogic",
            "modulecomponentprop",
            "modulecomponentreducer",
            "modulecomponentstate",
            "modulelogic",
            "moduleprop",
            "modulereducer",
            "modulerule",
            "modulestate",
            "navigation",
            "checklist",
            "checklistitem",
            "checklistoptiongroup",
            "dicttable",
            "dictcolumn",
            "dictrelation",
            "orgstructure",
            "orgstructurecommand",
            "orgstructureresource",
            "process",
            "processstate",
            "questiongroup",
            "questiongroupitem",
            "requestinformation",
            "scheduler",
            "schedulertype",
            "siteaction",
        ];

        this.defaultSystemTables = [];
        this.defaultModuleAssignments = {
            state: null,
            reducers: [
                "moduleDidMount",
                "moduleNew",
                "moduleSave",
                "moduleSaveSuccessful",
                "moduleSaveFailed",
                "moduleDelete",
                "moduleDeleteSuccessful",
                "moduleDeleteFailed",
                "moduleDetailsFetch",
                "moduleDetailsFetchSuccessful",
                "moduleDetailsFetchFailed",
                "moduleSaveNext",
                "moduleSaveNextSuccessful",
                "moduleSaveNextFailed",
                "moduleSaveNext",
                "moduleDelete",
                "moduleRefresh",
                "moduleSearch",
                "moduleSearchSuccessful",
                "moduleSearchFailed",
                "moduleSearchAdvanced",
            ],
            logic: ["moduleDidMount", "moduleSave", "moduleSaveNext", "moduleDelete", "moduleRefresh", "moduleSearch", "moduleSearchAdvanced"],
            props: null,
        };

        this.commandtypeDatasource = 3;
        this.commandtypeModule = 1;
        this.commandtypeNavigation = 2;

        this.componentBase = 1;
        this.componentButton = 2;
        this.componentHeader = 2;
        this.componentBsButton = 3;
        this.componentInput = 5;
        this.componentNavMenu = 6;
        this.componentSelection = 7;
        this.componentSelectionTree = 8;
        this.componentSelectionTree = 9;
        this.componentDataGrid = 10;
        this.componentMultipick = 11;
        this.componentModal = 12;
        this.componentTabs = 13;
        this.componentCompset = 14;
        this.componentGrid = 15;
        this.componentRow = 16;
        this.componentCol = 17;
        this.componentTab = 18;
        this.componentAgGridReact = 19;
        this.componentAgGridColumn = 20;
        this.componentTreeview = 21;
        this.componentMenu = 22;
        this.componentMenuSubMenu = 23;
        this.componentMenuItem = 24;
        this.componentMenuDivider = 25;
        this.componentMenuItemGroup = 26;
        this.componentButtonToolbar = 27;
        this.componentButtonGroup = 28;
        this.componentGlyphicon = 29;
        this.componentPanel = 30;
        this.componentCodeMirror = 31;
        this.componentHotKeys = 32;
        this.componentAdvancedSearch = 33;
        this.componentJumboTron = 34;
        this.componentPageHeader = 35;
        this.componentPanelGroup = 36;
        this.componentFieldPanel = 37;
        this.componentReCaptcha = 38;

        this.datatypeidDate = 1;
        this.datatypeidNumber = 2;
        this.datatypeidString = 3;
        this.datatypeidBoolean = 4;

        return this;
    };

    this.addressOther = function () {
        this.otherCityId = 100001;
        this.otherCountryId = 2000000141;
        this.otherProvinceId = 2000000142;

        return this;
    };

    this.cpaRecognizedBodyTypes = function () {
        this.mra = 15960;
        this.rma = 15970;
        this.ifac = 100105;
        this.provincial = 100138;

        return this;
    };

    this.charAndRep = function () {
        this.awaitingSubmission = 17760;
        this.submitted = 2000000143;

        return this;
    };

    this.processes = function () {
        this.addressTypeDirectBusiness = 2;
        this.addressTypeHome = 1;

        this.appstatusDraft = 15370;
        this.appstatusReadyForReview = 15380;
        this.appstatusAwaitingDocuments = 15390;
        this.appstatusInReview = 15400;
        this.appstatusIncomplete = 15410;
        this.appstatusReadyForManagerReview = 15420;
        this.appstatusReadyForApproval = 15430;
        this.appstatusDeferred = 15440;
        this.appstatusApproved = 15450;
        this.appstatusEndorsed = 15460;
        this.appstatusPendingPayment = 15470;
        this.appstatusReadyForAdditionalReview = 15480;
        this.appstatusDenied = 15490;
        this.appstatusReadyForEndorsement = 161006;
        this.appstatusWaitingForCorporateRegistryDocuments = 161007;
        this.appstatusInProgress = 161008;
        this.appstatusAdditionalInformation = 161009;
        this.appstatusWithdrawn = 161010;
        this.appstatusRescinded = 161011;
        this.appstatusCompleted = 161012;
        this.appstatusFinalized = 1000000184;
        this.appstatusNotarizedDocumentsSubmitted = 1000000190;
        this.appstatusReadyForPeerReview = 1000000191;
        this.appstatusReceived = 1000000225;

        this.pafregistrationtype = 17310;
        this.pcregistration = 17340;
        this.pafrenewaltype = 17350;

        this.pliStatusAwaitingConfirmation = 623;

        this.processstatusReadyForAdditionalReview = 100040;
        this.processstatusReadyForApproval = 100041;
        this.processstatusReadyForEndorsement = 1000000185;
        this.processstatusReadyForPeerReview = 1000000192;
        this.processstatusReceived = 1000000226;
        this.processstatusSubmitted = 1000000227;
        this.processstatusInProgress = 2000000084;
        this.processstatusReadyForReview = 2000000085;
        this.processstatusInReview = 2000000086;
        this.processstatusAdditionalInformation = 2000000087;
        this.processstatusAwaitingDocuments = 2000000089;
        this.processstatusReadyForManagerReview = 2000000090;
        this.processstatusApproved = 2000000092;
        this.processstatusDenied = 2000000093;
        this.processstatusDeferred = 2000000094;
        this.processstatusCompleted = 2000000112;
        this.processstatusWithdrawn = 2000000116;
        this.processstatusRescinded = 2000000117;
        this.processstatusDraft = 2000000123;
        this.processstatusEndorsed = 2000000124;
        this.processstatusPendingPayment = 2000000125;

        this.relationshipEmployment = 4;
        this.relationshipInstitute = 5;
        this.relationshipUniversity = 6;

        return this;
    };

    this.billingtype = function () {
        this.nonprimeAffiliate = 11000;
        this.nonprimeFull = 11010;
        this.primeAffiliate = 11020;
        this.primeFull = 11030;

        return this;
    };

    this.entitytype = function () {
        this.profCorp = 20;
        this.office = 22;
        this.member = 23;
        this.contact = 25;
        this.nre = 528;
        this.nonRegEmployer = 528;
        this.profServProvider = 529;
        this.pubAcctFirm = 530;
        this.pracReviewEligFirm = 1920;
        this.candidate = 100080;
        this.preApprovedProgram = 101001;

        return this;
    };

    this.memberstatus = function () {
        this.active = 15;
        this.inactive = 16;

        return this;
    };

    this.membersubstatus = function () {
        this.cancelled = 57;
        this.conditionalgoodstanding = 58;
        this.deceased = 59;
        this.goodStanding = 60;
        this.resigned = 63;
        this.pendingApproval = 971;
        this.applicationwithdrawn = 10026;

        return this;
    };

    this.membersubstatusreason = function () {
        this.recpdrequirement = 10143;

        return this;
    };

    this.memberapplicationpath = function () {
        this.pepGraduate = 18620;
        this.mraApplicant = 18650;
        this.dmiap = 18660;
        this.reinstate = 18670;

        return this;
    };

    this.applicationtype = function () {
        this.pafregistrationtype = 17310;
        this.pspregistrationtype = 17320;
        this.pcregistrationtype = 17340;
        this.pafrenewaltype = 17350;
        this.psprenewaltype = 17350;
        this.pafderegistrationtype = 17380;
        this.pafnewapplicanttype = 17390;
        this.pspderegistrationtype = 17400;
        this.paq = 18960;
        this.nma = 18970;
        this.pafchangeofemploymentresponsibilitiestype = 1000000177;
        this.pafaffiliatenewapplicanttype = 1000000193;
        this.pafaffiliatechangeofemploymentresponsibilitiestype = 1000000197;
        this.pafregistrationnewlocationtype = 1000000199;
        this.nmadmiap = 1000000207;
        this.nmamra = 1000000208;
        this.nmarma = 1000000209;
        this.nmareadmission = 1000000210;
        this.nmapep = 1000000210;
        this.reqreadmission = 2000000146;
        this.cparpd = 2000000148;
        this.cparpdupload = 2000000149;

        return this;
    };

    this.processtype = function () {
        this.paq = 1;
        this.nmapep = 2;
        this.nmadmiap = 53;
        this.nmamra = 111;
        this.nmareqreinstatement = 179;
        this.nmareinstate = 100000002;
        this.cpdaudit = 100000134;
        this.annualdeclaration = 100000164;
        this.cparpd = 100000175;
        this.cparpdupload = 100000181;
        this.pspregistration = 110000001;
        this.pcregistration = 110000024;
        this.pspderegistration = 110000065;
        this.pafanewapplicant = 110000073;
        this.pafcoer = 110000112;
        this.psprenewal = 110000152;
        this.pafregistration = 110000173;
        this.pafregistrationreview = 110000175;
        this.pafderegistration = 110000190;
        this.pafannualrenewal = 110000214;
        this.pafregistrationnewlocation = 110000276;
        this.pafaffiliateassessment = 110046001;
        this.pafaffiliatecoer = 110046041;

        return this;
    };

    this.conditionrestriction = function () {
        this.notificationDays = 15;
        this.conditionStatusActive = 6130;
        this.restrictionStatusActive = 12080;

        return this;
    };

    this.reportingStatus = function () {
        this.awaitingSubmission = 719;
        this.submitted = 720;
        this.notApplicable = 736;

        return this;
    };

    this.teams = function () {
        this.memberregistrations = 100000000;
        this.corporateregistrations = 100000001;
        this.practicalexperience = 100000003;
        this.mrmanagers = 100000008;
        this.mrregistrars = 100000009;
        this.compliance = 100000010;

        return this;
    };

    this.membershipType = function () {
        this.cpaUS = 15980;
        this.other = 15980;
        this.cpaCanada = 16000;

        return this;
    };

    this.pcstatus = function () {
        this.active = 640;
        this.inactive = 641;
        this.pending = 642;

        return this;
    };

    this.employerstatus = function () {
        this.active = 531;
        this.inactive = 532;

        return this;
    };

    this.employersubstatus = function () {
        this.closedOffice = 534;
        this.conditionalGoodStanding = 535;
        this.goodStanding = 539;
        this.pendingApproval = 1036;
        this.cancelled = 1506;

        return this;
    };

    this.pcsubstatus = function () {
        this.goodStanding = 647;

        return this;
    };

    this.paymentmethod = function () {
        this.cash = 491;
        this.visa = 492;
        this.cheque = 494;
        this.mastercard = 12550;
        this.americanexpress = 12560;
        this.other = 12570;

        return this;
    };

    this.renewalStatus = function () {
        this.inProgress = 160001;
        this.submitted = 160002;
        this.completed = 160003;

        return this;
    };

    this.postingStatus = function () {
        this.posted = 482;
        this.pending = 483;

        return this;
    };

    this.provinces = function () {
        this.notApplicable = 2000001364;

        return this;
    };
}

module.exports = new Settings();

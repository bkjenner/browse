/**
 * The Admin class supports the administrative functionality that constructs dynamic applications.
 *
 * @class Admin
 * @constructor
 */
function Admin() {}

//---------Export-------------//

module.exports = new Admin();

//----------Requires--------//

var Promise = require("bluebird");
var Db = require("../../data/models");
var settings = require("../settings");
var _ = require("lodash");
var util = require("../utility");

//----------Methods---------//

//----------Routes--------------//
Admin.prototype.initialize = function (app) {
    var objInternal = this;

    app.post("/module/admin/modules", (req, res) => {
        Db.models[name]
            .findAll({ where: { recordstatus: "A" } })
            .then((result) => {
                res.send(result);
                res.end();
            })
            .catch((err) => {
                res.send(err);
                res.end();
            });
    });

    app.post("/module/admin/modulecomponents", (req, res) => {
        console.log("req.body: ", req.body);
        if (req.body && req.body.moduleid) {
            Db.models.modulecomponent
                .findAll({
                    attributes: ["id", "parentid", ["fieldname", "name"]],
                    where: {
                        moduleid: parseInt(req.body.moduleid),
                        recordstatus: "A",
                    },
                })
                .then((result) => {
                    return util.treeify(JSON.parse(JSON.stringify(result)), "id", "parentid");
                })
                .then((tree) => {
                    res.send(tree);
                    res.end();
                })
                .catch((err) => {
                    res.send(err);
                    res.end();
                });
        } else {
            res.send({});
            res.end();
        }
    });

    app.post("/module/admin/sub/:name", (req, res) => {
        if (req.body && req.body.modulecomponentid && req.params.name && req.params.name != "") {
            Db.models[req.params.name]
                .findAll({
                    where: {
                        ...req.body,
                        recordstatus: "A",
                    },
                    include: [
                        {
                            model: Db.models.initialstate,
                            attributes: ["name", "rendername", "value"],
                        },
                    ],
                })
                .then((result) => {
                    res.send(result);
                    res.end();
                })
                .catch((err) => {
                    res.send(err);
                    res.end();
                });
        } else {
            res.send({});
            res.end();
        }
    });
};

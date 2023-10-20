Rules.prototype.activityBrowse = async ({
    p_pagesize = 2000,
    p_order = "rowidperformedby",
    p_acttypeid = null,
    p_actprojectid = null,
    p_metadata = null,
    ...input
}) => {
    const schema = joi.object().keys({
        p_metadata: joi.boolean(),
        p_pagesize: joi.number().error((errors) => {
            errors.forEach((err) => {
                let caption = "Page Size";

                switch (err.code) {
                    case "number.base":
                        err.message = `${caption} must be a number`;
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),
        p_order: joi.string(),
        p_acttypeid: joi.number().error((errors) => {
            errors.forEach((err) => {
                let caption = "Activity Type";

                switch (err.code) {
                    case "number.base":
                        err.message = `${caption} must be a number`;
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),
        p_actprojectid: joi.number(),
    });

    try {
        const validation = await util.validateRequest(schema, input.req);
    } catch (error) {
        return input.res.status(400).send(error.message);
    }

    let metadata = {};

    if (p_metadata) {
        metadata = await sql`SELECT columnname, heading FROM fnactactivitybrowse(p_metadata => ${p_metadata})`;
    }

    const activities = await sql`
    SELECT
        uid,
        id,
        priority,
        STATUS,
        activitytype,
        activityproject,
        performedby,
        performedfor,
        completiondate,
        totalactual
    FROM
        fnactactivitybrowse(p_pagesize => ${p_pagesize}, p_order => ${p_order}, p_acttypeid => ${p_acttypeid}, p_actprojectid => ${p_actprojectid})`;

    return { metadata, activities };
};

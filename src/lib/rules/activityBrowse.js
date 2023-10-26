Rules.prototype.activityBrowse = async ({
    p_pagesize = 2000,
    p_order = "rowidperformedby",
    p_acttypeid = null,
    p_actprojectid = null,
    p_metadata = null,
    ...input
}) => {
    try {
        const validation = await util.validateRequest(schemas["activityBrowse"], input.req);
    } catch (error) {
        input.res.status(400);
        return error;
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

Rules.prototype.getActivitiesByProject = async ({ p_metadata = true, p_actprojectid, ...input }) => {
    try {
        const validation = await util.validateRequest(schemas["getActivitiesByProject"], input.req);
    } catch (error) {
        input.res.status(400);
        return error;
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
        fnactactivitybrowse(p_pagesize => 2000, p_actprojectid => ${p_actprojectid})`;

    return activities;
};

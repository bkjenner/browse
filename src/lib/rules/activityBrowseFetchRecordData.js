Rules.prototype.activityBrowseFetchRecordData = async ({
    ...input 
}) => {
    try {
        const validation = await util.validateRequest(schemas['activityBrowseFetchRecordData'], input.req);
    } catch (error) {
        input.res.status(400);
        return error;
    }

    const activity = await sql`
    SELECT
        id, 
        actpriorityid,
        actstatusid,
        acttypeid,
        actprojectid,
        rowidperformedby,
        rowidperformedfor,
        comments,
        completiondate,
        startdate,
        description,
        totalactual
    FROM
        actactivity
    WHERE
    id=${input.id}`;

    return activity;
};

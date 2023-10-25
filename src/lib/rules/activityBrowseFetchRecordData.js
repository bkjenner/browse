Rules.prototype.activityBrowseFetchRecordData = async ({ p_metadata = true, p_acttypeid, ...input }) => {
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

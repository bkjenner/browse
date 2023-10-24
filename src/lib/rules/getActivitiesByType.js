Rules.prototype.getActivitiesByType = async ({ p_metadata = true, p_acttypeid, ...input }) => {
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
        fnactactivitybrowse(p_pagesize => 2000, p_acttypeid => ${p_acttypeid})`;

    return activities;
};

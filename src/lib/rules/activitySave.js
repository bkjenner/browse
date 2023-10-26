Rules.prototype.activitySave = async (input) => {
    if(input) {
        let completeDate = null;
        let startDate = null;
        if(input.completiondate) {
            completeDate = moment(input.completiondate).utc().format('YYYY-MM-DD');
        }
        if(input.startDate) {
            startDate = moment(input.startdate).utc().format('YYYY-MM-DD');
        }
        const activityStatement = await sql`
        UPDATE actactivity
        SET
            actpriorityid = ${input.actpriorityid},
            actstatusid = ${input.actstatusid},
            acttypeid = ${input.acttypeid},
            actprojectid = ${input.actprojectid},
            rowidperformedby = ${input.rowidperformedby},
            rowidperformedfor = ${input.rowidperformedfor},
            comments = ${input.comments},
            description = ${input.description},
            completiondate = ${completeDate},
            startdate = ${startDate},
            totalactual = ${input.totalactual}
        WHERE
            id = ${input.id}
        `;

        return activityStatement;
    } else {
        return;
    }
};

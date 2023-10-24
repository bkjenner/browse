Rules.prototype.getActivityProjects = async () => {
    const projects = await sql`SELECT id, description from actproject where rowstatus = 'a' and description is not null`;

    return projects;
};

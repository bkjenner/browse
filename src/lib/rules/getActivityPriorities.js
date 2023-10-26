Rules.prototype.getActivityPriorities = async () => {
    const priority = await sql`SELECT id value, description label from actpriority where rowstatus = 'a'`;
    return priority;
};

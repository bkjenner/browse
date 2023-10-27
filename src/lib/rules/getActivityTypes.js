Rules.prototype.getActivityTypes = async () => {
    const types = await sql`SELECT id, description from acttype where rowstatus = 'a'`;
    return types;
};

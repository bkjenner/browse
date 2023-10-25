Rules.prototype.getActivityStatus = async () => {
    const status = await sql`SELECT id value, description label from actstatus where rowstatus = 'a'`;
    return status;
};

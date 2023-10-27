Rules.prototype.getCRMContacts = async ({ p_metadata = true, p_acttypeid, ...input }) => {
    const contacts = await sql`
    SELECT
        id value,
        name label
    FROM
        crmcontact
    `;

    return contacts;
};

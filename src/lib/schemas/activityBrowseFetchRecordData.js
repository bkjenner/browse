Schemas.prototype.activityBrowseFetchRecordData = joi.object().keys({
    id: joi.number().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "id must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
});

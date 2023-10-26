Schemas.prototype.activityBrowse = joi.object().keys({
    p_metadata: joi.boolean().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "boolean.base":
                    err.message = "p_metadata must be a boolean";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    p_pagesize: joi.number().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "p_metadata must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    p_order: joi.string().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "any.required":
                    err.message = "p_order is required";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    p_acttypeid: joi.number().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "p_acttypeid must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    p_actprojectid: joi.number(),
});

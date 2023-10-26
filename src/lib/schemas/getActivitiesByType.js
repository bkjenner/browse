Schemas.prototype.getActivitiesByType = joi.object().keys({
    p_acttypeid: joi
        .number()
        .required()
        .error((errors) => {
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
});

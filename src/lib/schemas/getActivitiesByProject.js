Schemas.prototype.getActivitiesByProject = joi.object().keys({
    p_actprojectid: joi
        .number()
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "any.required":
                        err.message = "p_actprojectid is required";
                        break;
                    case "number.base":
                        err.message = "p_actprojectid must be a number";
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),
});

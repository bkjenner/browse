Schemas.prototype.activitySave = joi.object().keys({
    id: joi.number().required().error((errors) => {
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
    actpriorityid: joi.number().allow(null).error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "actpriorityid must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    actstatusid: joi.number().required().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "actstatusid must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    acttypeid: joi.number().required().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "acttypeid is required";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    actprojectid: joi.number().required().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "actprojectid must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    rowidperformedby: joi.number().required().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "rowidperformedby must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    rowidperformedfor: joi.number().required().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "rowidperformedfor must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
    comments: joi.string().allow(null, ''),
    description: joi.string().allow(null, ''),
    completiondate: joi.date().required(),
    startdate: joi.date().allow(null),
    totalactual: joi.number().error((errors) => {
        errors.forEach((err) => {
            switch (err.code) {
                case "number.base":
                    err.message = "totalactual must be a number";
                    break;
                default:
                    break;
            }
        });

        return errors;
    }),
});

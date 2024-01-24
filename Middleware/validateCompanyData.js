/* const { body, validationResult } = require('express-validator');

const validateCompanyData = (req, res, next) => {
    req.checkBody('name').notEmpty().isString();
    req.checkBody('industry').notEmpty().isString();
    req.checkBody('employees').notEmpty().isNumeric();
    req.checkBody('finance.revenue').notEmpty().isNumeric();
    req.checkBody('finance.currentAssets').notEmpty().isNumeric();
    req.checkBody('finance.liabilities').isNumeric();
    req.checkBody('finance.netIncome').isNumeric();
    req.checkBody('mission').isString();
    req.checkBody('vision').isString();
    req.checkBody('goals').isArray();
    req.checkBody('productionCapacity').notEmpty().isNumeric();
    req.checkBody('marketPresence').isArray();
    req.checkBody('team.leadership.name').isString();
    req.checkBody('team.leadership.position').isString();
    req.checkBody('team.employeeDetails.name').isString();
    req.checkBody('team.employeeDetails.position').isString();
    req.checkBody('infrastructure.it').isString();
    req.checkBody('infrastructure.softwareUsed').isArray();
    req.checkBody('strategicPartnerships').isString();
    req.checkBody('riskManagement').isString();
    req.checkBody('employeeTraining').isString();
    req.checkBody('marketingEffectiveness').isString();
    req.checkBody('customerFeedback').isString();
    req.checkBody('sustainabilityCSR').isString();
    req.checkBody('postPandemicAdaptation').isString();

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        next();
    });
};

module.exports = validateCompanyData; */

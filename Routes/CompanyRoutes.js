const express = require('express');
const router = express.Router();
const CompanyModel = require('../Models/CompanyModel');
const UserModel = require('../Models/UserModel')
const VerifyToken = require('../Middleware/VerifyToken')


router.get('/company', VerifyToken, async (req, res) => {
    try {
        const userCompanies = await CompanyModel.find({ user: req.user._id });
        res.json(userCompanies);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/company/create', VerifyToken, async (req, res) => {
    try {
        const { companyName, industry, location, specificCompanyInfo, additionalInfo, user, consultResult} = req.body;
        const newCompany = new CompanyModel({
            companyName,
            industry,
            location,
            specificCompanyInfo,
            additionalInfo,
            consultResult,
            user,
        });
        const savedCompany = await newCompany.save();
        await UserModel.findByIdAndUpdate(req.user._id, { $push: { companies: savedCompany._id } });
        const populatedCompany = await CompanyModel
            .findById(savedCompany._id)
            .populate('user', 'name email');
        res.status(201).json(populatedCompany);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.put('/company/update/:id', VerifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { fieldName, fieldValue } = req.body;
        const updatedCompany = await CompanyModel.findByIdAndUpdate(
            id,
            { [fieldName]: fieldValue },
            { new: true }
        );
        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(updatedCompany);
        console.log(fieldName, fieldValue)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});




router.put('/company/:id', VerifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { additionalInfo } = req.body;
        const updatedCompany = await CompanyModel.findOneAndUpdate(
            { _id: id },
            { additionalInfo },
            { new: true }
        );
        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found' });
        }
        
        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.put('/company/update-consult-result/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;
        const { consultResult } = req.body;

        const updatedCompany = await CompanyModel.findByIdAndUpdate(
            companyId,
            { consultResult },
            { new: true }
        );
        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found' });
        }
        
        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


router.delete('/company/delete/:companyId', async (req, res) => {
    try {
        await CompanyModel.findOneAndDelete({ _id: req.params.companyId, user: req.user.id });
        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

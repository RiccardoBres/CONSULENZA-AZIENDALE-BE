const mongoose = require("mongoose");

const CompanyModel = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    specificCompanyInfo: {
        // Performance Finanziaria
        annualRevenue: {
            type: Number,
            required: true,
        },
        profitMargin: {
            type: Number,
            required: true,
        },
        expensesBreakdown: {
            type: String,
            required: true,
        },
        // Risorse Umane
        numberOfEmployees: {
            type: Number,
            required: true,
        },
        employeeExperience: {
            type: String,
            required: true,
        },
        averageEmployeeTenure: {
            type: Number,
        },
        employeeSatisfaction: {
            type: Number,
        },
        // Produzione ed Efficienza
        productionOutput: {
            type: Number,
            required: true,
        },
        efficiencyMetrics: {
            type: Number,
        },
        // Cliente e Mercato
        customerRetentionRate: {
            type: Number,
        },
        customerSatisfaction: {
            type: Number,
        },
        technologyAdoptionRate: {
            type: Number,
        },
        // Sostenibilità e CSR
        innovationProjects: {
            type: Number,
        },
        complianceStatus: {
            type: String,
        },
        riskAssessment: {
            type: String,
        },
        conversionRates: {
            type: Number,
        },
        customerAcquisitionCost: {
            type: Number,
        },
        carbonFootprint: {
            type: Number,
        },
        sustainabilityInitiatives: {
            type: String,
        },
        // Obiettivi e Sfide
        keyChallenges: {
            type: [String],
        },
        strategicGoals: {
            type: [String],
        },
    },
    additionalInfo: {
        type: Object,
        default: {},
    },
    consultResult: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

module.exports = mongoose.model("CompanyModels", CompanyModel, "CompanyModel");

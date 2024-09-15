import express from "express";
import { Company } from "../models/companiesModel.js";
const router = express.Router();

// ! API endpoint to ADD a company
router.post("/", async (req, res) => {
  try {
    console.log("Received request to create a company:", req.body);

    const {
      name,
      logoSrc,
      description,
      websiteUrl,
      category,
      country,
      year,
      status,
    } = req.body;
    if (
      !name ||
      !logoSrc ||
      !description ||
      !websiteUrl ||
      !category ||
      !country ||
      !year ||
      !status
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: name, logoSrc, description, websiteUrl, category, country, year, status",
      });
    }

    const newCompany = {
      name,
      logoSrc,
      description,
      websiteUrl,
      category,
      country,
      year,
      status,
    };

    const company = new Company(newCompany);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// ! API endpoint to get "ALL" companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find({});
    return res.status(200).json({
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// !API TO GET A "PARTICULAR" COMPANY

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //! "findById(id)" is used
    const company = await Company.findById(id);
    res.status(200).json(company);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ! API Endpoint to UPDATE Companies
router.put("/:id", async (req, res) => {
  try {
    console.log("Received request to update company:", req.body);

    const { name, year, country, status, category, websiteUrl, logoSrc } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !year ||
      !country ||
      !status ||
      !category ||
      !websiteUrl ||
      !logoSrc
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: name, year, country, status, category, websiteUrl, logoSrc",
      });
    }

    // Find the company by ID and update with the provided fields
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        year,
        country,
        status,
        category,
        websiteUrl,
        logoSrc,
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).send({
        message: "Company not found",
      });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// ! API Endpoint to DELETE companies

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Company.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;

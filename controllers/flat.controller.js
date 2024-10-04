const { validateFlat } = require("../validations/flatValidation");
const { Flat } = require("../models");

exports.createFlat = async (req, res) => {
    const { error } = validateFlat(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const flat = await Flat.create(req.body);
        res.status(201).send(flat); // 201 status kodi yangi resurs yaratishda ishlatiladi
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getFlat = async (req, res) => {
    try {
        const flats = await Flat.findAll();
        res.status(200).send(flats);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getFlatById = async (req, res) => {
    try {
        const flat = await Flat.findByPk(req.params.id);
        if (!flat) return res.status(404).send("Flat not found");
        res.status(200).send(flat);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateFlat = async (req, res) => {
    const { error } = validateFlat(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const flat = await Flat.findByPk(req.params.id);
        if (!flat) return res.status(404).send("Flat not found");
        await flat.update(req.body);
        res.status(200).send(flat);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteFlat = async (req, res) => {
    try {
        const flat = await Flat.findByPk(req.params.id);
        if (!flat) return res.status(404).send("Flat not found");
        await flat.destroy();
        res.status(200).send("Flat deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

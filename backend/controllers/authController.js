const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');

// Register a new patient
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ msg: 'all fields required' });
    }

    if(password.length < 6){
        return res.status(400).json({ msg: 'password too short' });
    }

    if(!email.includes('@')){
        return res.status(400).json({ msg: 'email not valid' });
    }

    try {
        const existing = await Patient.findOne({ email });
        if(existing){
            return res.status(409).json({ msg: 'user exists' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const newPatient = await Patient.create({
            name: name,
            email: email,
            password: hashedPwd
        });

        res.status(201).json({ msg: 'user registered', user: newPatient });
    } catch(err){
        console.log("reg err", err);
        res.status(500).json({ msg: 'reg failed' });
    }
};

// Login a patient
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({ msg: 'email & password needed' });
        return;
    }

    try {
        const found = await Patient.findOne({ email });
        if(!found){
            return res.status(404).json({ msg: 'user not found' });
        }

        const match = await bcrypt.compare(password, found.password);
        if(!match){
            return res.status(401).json({ msg: 'wrong password' });
        }

        const token = jwt.sign({ id: found._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).json({ msg: 'login ok', token: token });
    } catch(e){
        console.log('login error', e);
        res.status(500).json({ msg: 'login problem' });
    }
};
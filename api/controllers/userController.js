import { registerUser } from "../models/user.js";

const createUser = async (req, res, next) => {
    // Tarkistetaan salasanan pituus ja monimutkaisuus ilman regexiä.
    if (!req.body.password || req.body.password.length < 8) {
        return res.status(422).json({ message: "Password must be at least 8 characters" });
    }
    if (!/[A-Z]/.test(req.body.password)) {
        return res.status(422).json({ message: "Password must contain at least one uppercase letter" });
    }
    if (!/[a-z]/.test(req.body.password)) {
        return res.status(422).json({ message: "Password must contain at least one lowercase letter" });
    }
    if (!/[0-9]/.test(req.body.password)) {
        return res.status(422).json({ message: "Password must contain at least one number" });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(req.body.password)) {
        return res.status(422).json({ message: "Password must contain at least one special character" });
    }
    
    const password = req.body.password;

    try {
        const result = await registerUser(req.body.email, req.body.username, password);
        res.status(201).json({ message: "User created successfully", user: result.rows[0] });
    } catch (error) {
        next(error);
    }

}

export {
    createUser
}
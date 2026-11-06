import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '../db.js'

dotenv.config()

const requireAuth(req, res, next) {
  try {
    const token = req.cookies[cookieName];

    if (!token)       
      return res.status(401).json({ error: 'Kirjautuminen vaaditaan' });

    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'], issuer: 'MovCha'
    });

    const user = db.query('SELECT id, email FROM users WHERE id = $1', [payload.sub]) 

    if (!user) 
      return res.status(401).json({ error: 'Käyttäjää ei löydy' });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Istunto ei ole voimassa' });
  }
}

export default requireAuth;
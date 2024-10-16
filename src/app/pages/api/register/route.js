import mysql from 'mysql2/promise';
import * as yup from 'yup';
import DOMPurify from 'dompurify';

// Define the validation schema for both forms
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().positive().integer().required('Age is required'),
});

// MySQL connection setup
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, age, formType } = req.body;

    try {
      // Validate the incoming data
      await schema.validate({ name, email, age });

      // Sanitize the input data
      const sanitizedName = DOMPurify.sanitize(name);
      const sanitizedEmail = DOMPurify.sanitize(email);

      // Determine the table based on formType
      let table;
      if (formType === 'form1') {
        table = 'RegDeti'; 
      } else if (formType === 'form2') {
        table = 'FunAkce'; 
      } else {
        return res.status(400).json({ message: 'Invalid form type' });
      }

      // Check for duplicate registration
      const [rows] = await connection.query(
        `SELECT * FROM ${table} WHERE email = ?`,
        [sanitizedEmail]
      );

      if (rows.length > 0) {
        return res.status(400).json({ message: 'Tato osoba byla již přihlášena.' });
      }

      // Check max registrations
      const [count] = await connection.query(`SELECT COUNT(*) AS count FROM ${table}`);
      if (count[0].count >= 65) {
        return res.status(400).json({ message: 'Omlouváme se, ale byla dosažena maximální kapacita přihlášených.' });
      }

      // Insert new registration
      await connection.query(
        `INSERT INTO ${table} (name, email, age) VALUES (?, ?, ?)`,
        [sanitizedName, sanitizedEmail, age]
      );

      return res.status(200).json({ message: 'Registrace proběhla úspěšně.' });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Database error', error });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}

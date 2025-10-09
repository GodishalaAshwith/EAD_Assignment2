require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS configuration for production and development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL || 'https://ead-assignment2frontend.onrender.com'
    : ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.2vwfky1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Student Registration API is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  department: { 
    type: String, 
    enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'AIDS', 'CET'], 
    required: true 
  },
  section: { type: String, enum: ['A', 'B', 'C', '1', '2', '3'], required: true },
  skills: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// Save student
app.post('/students', async (req, res) => {
  try {
    let { name, roll, gender, department, section, skills } = req.body;

    // Basic validation
    if (!name || !roll || !gender || !department || !section) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, roll, gender, department, section' 
      });
    }

    // Trim strings to avoid whitespace issues
    name = name.trim();
    roll = roll.trim();
    department = department.trim();
    section = section.trim();

    // Optional: log received values for debugging
    console.log('Received:', { name, roll, gender, department, section, skills });

    // Check if student with same roll number already exists
    const existingStudent = await Student.findOne({ roll });
    if (existingStudent) {
      return res.status(400).json({ 
        error: 'Student with this roll number already exists' 
      });
    }

    const student = new Student({
      name,
      roll,
      gender,
      department,
      section,
      skills: Array.isArray(skills) ? skills : []
    });

    await student.save();

    res.status(201).json({ 
      message: 'Student registered successfully', 
      student: {
        id: student._id,
        name: student.name,
        roll: student.roll,
        gender: student.gender,
        department: student.department,
        section: student.section,
        skills: student.skills
      }
    });

  } catch (err) {
    console.error('Registration error:', err);

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: `Validation error: ${errors.join(', ')}` });
    }

    res.status(500).json({ error: 'Server error during registration' });
  }
});

// List students
app.get('/students', async (req, res) => {
  try {
    const list = await Student.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fetch failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Handle 404 - must be the last route
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS origin: ${corsOptions.origin}`);
});

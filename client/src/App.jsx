import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [form, setForm] = useState({
    name: '',
    roll: '',
    gender: '',
    department: '',
    section: '',
    skills: []
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // API URL - will be updated for production deployment
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  // Handle input changes for text fields, radio, and select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes for skills
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, value] 
        : prev.skills.filter(skill => skill !== value)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      console.log('Submitting to:', `${API}/students`);
      
      const response = await fetch(`${API}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMessage('✅ Student registered successfully!');
      
      // Reset form after successful submission
      setForm({
        name: '',
        roll: '',
        gender: '',
        department: '',
        section: '',
        skills: []
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage(`❌ Network Error: Cannot connect to server at ${API}. Please check if the server is running.`);
      } else {
        setMessage(`❌ Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration Form</h2>
      
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        {/* Roll Number Field */}
        <div className="form-group">
          <label htmlFor="roll">Roll Number *</label>
          <input
            type="text"
            id="roll"
            name="roll"
            value={form.roll}
            onChange={handleChange}
            required
            placeholder="Enter roll number"
          />
        </div>

        {/* Gender Field */}
        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === 'Male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === 'Female'}
                onChange={handleChange}
                required
              />
              Female
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={form.gender === 'Other'}
                onChange={handleChange}
                required
              />
              Other
            </label>
          </div>
        </div>

        {/* Department Field */}
        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <select
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="AIDS">AIDS</option>
            <option value="CET">CET</option>
          </select>
        </div>

        {/* Section Field */}
        <div className="form-group">
          <label htmlFor="section">Section *</label>
          <select
            id="section"
            name="section"
            value={form.section}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Section --</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        {/* Skills Field */}
        <div className="form-group">
          <label>Skills</label>
          <div className="checkbox-group">
            {['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'HTML/CSS', 'SQL'].map((skill) => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  value={skill}
                  checked={form.skills.includes(skill)}
                  onChange={handleSkillChange}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Student'}
        </button>
      </form>
    </div>
  );
};

export default App;
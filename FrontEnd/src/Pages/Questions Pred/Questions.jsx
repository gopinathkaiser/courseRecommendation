import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../Layout';

function Questions() {
  const [formData, setFormData] = useState({});
  const [predictedInterests, setPredictedInterests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const questions = [
    {
      "question": "What subjects do you enjoy studying the most?",
      "options": ["Mathematics", "Science (Physics, Chemistry, Biology)", "Social Studies (History, Geography, Civics)", "Languages (English, Hindi, etc.)", "Arts (Music, Dance, Fine Arts)"]
    },
    {
      "question": "Have you participated in any extracurricular activities related to a specific field?",
      "options": ["Sports", "Debate or Public Speaking", "Science Club", "Coding or Robotics Club", "Drama or Theater"]
    },
    {
      "question": "Do you have any hobbies or interests that you are passionate about?",
      "options": ["Reading", "Writing", "Cooking or Baking", "Photography", "Gardening"]
    },
    {
      "question": "Are there any particular career paths that interest you?",
      "options": ["Engineering", "Medicine", "Business", "Arts and Humanities", "Science and Research"]
    },
    {
      "question": "Have you done any research or projects in a specific area that you found particularly engaging?",
      "options": ["Technology", "Environment", "Health", "Social Issues", "History or Culture"]
    },
    {
      "question": "Are there any subjects or fields that you excel in academically?",
      "options": ["Mathematics", "Science", "Languages", "Social Studies", "Arts or Humanities"]
    },
    {
      "question": "Do you have any role models or influencers in a certain field?",
      "options": ["Scientist or Inventor", "Entrepreneur or Business Leader", "Artist or Musician", "Athlete or Sports Personality", "Political or Social Leader"]
    },
    {
      "question": "Are there any social or environmental issues that you are passionate about?",
      "options": ["Climate Change", "Equality and Diversity", "Animal Welfare", "Education", "Healthcare"]
    },
    {
      "question": "What kind of skills or knowledge do you hope to gain from your future studies?",
      "options": ["Problem-solving skills", "Leadership skills", "Communication skills", "Technical skills", "Creative skills"]
    },
    {
      "question": "Are there any specific industries or sectors that you are curious about or would like to work in?",
      "options": ["Technology", "Healthcare", "Education", "Fashion and Design", "Entertainment"]
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {};
      questions.forEach((q, index) => {
        const questionKey = `Question ${index + 1}`;
        formattedData[questionKey] = formData[questionKey] || "";
      });

      const response = await axios.post('http://localhost:5000/predict_interest', formattedData);
      setPredictedInterests(response.data.predicted_interests[0]);
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Layout>
      <div className="container mx-2 p-4">
        <h1 className="text-2xl font-bold mb-4">Interest Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {questions.map((q, index) => (
              <div key={index}>
                <label className="block text-lg font-medium">{q.question}</label>
                <select
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name={`Question ${index + 1}`}
                  onChange={(e) => setFormData({ ...formData, [`Question ${index + 1}`]: e.target.value })}
                >
                  <option value="">Select an option</option>
                  {q.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Predicted Interests</h2>
              <ul>
                {predictedInterests.map((interest, index) => (
                  <li key={index} className="text-lg">{interest}</li>
                ))}
              </ul>
              <button onClick={handleClosePopup} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Questions;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.blog || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.blog) {
      const fetchForm = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
          setFormData({
            id: response.data._id,
            title: response.data.title,
            image: response.data.image || 'https://via.placeholder.com/150',
            sections: response.data.sections,
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching form:', error);
          setError('Failed to load form data. Please try again.');
          setLoading(false);
        }
      };
      fetchForm();
    }
  }, [id, location.state]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value,
    };
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].questions[questionIndex] = {
      ...updatedSections[sectionIndex].questions[questionIndex],
      [field]: value,
    };
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/forms/${id}`, formData);
      alert('Form updated successfully');
      navigate('/admin/Blogs');
    } catch (error) {
      console.error('Error updating form:', error);
      setError('Failed to update form. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 sm:p-8 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 sm:p-8 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          {formData.sections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6 p-4 border rounded-md">
              <label className="block text-gray-700 font-medium mb-2">
                Section {sectionIndex + 1} Subheading
              </label>
              <input
                type="text"
                value={section.subheading || ''}
                onChange={(e) =>
                  handleSectionChange(sectionIndex, 'subheading', e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              {section.questions?.map((question, questionIndex) => (
                <div key={questionIndex} className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Question {questionIndex + 1}
                  </label>
                  <input
                    type="text"
                    value={question.questionText || ''}
                    onChange={(e) =>
                      handleQuestionChange(sectionIndex, questionIndex, 'questionText', e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/Blogs')}
              className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
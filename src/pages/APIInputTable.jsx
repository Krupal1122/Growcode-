import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import axios from 'axios';

const ImageUpload = ({ selectedImage, setSelectedImage, setImageUrl }) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setImageUrl(response.data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="imageUpload"
        className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 p-6 rounded-xl cursor-pointer hover:bg-blue-50 transition duration-300"
      >
        <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
        <span className="text-blue-700 font-medium">
          Click to upload an image
        </span>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {selectedImage && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full h-auto rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default function APIInputTable() {
  const [formData, setFormData] = useState({
    title: '',
    sections: [],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { subheading: '', questions: [{ questionText: '', answerText: '' }] },
      ],
    });
  };

  const updateSectionHeading = (index, value) => {
    const newSections = [...formData.sections];
    newSections[index].subheading = value;
    setFormData({ ...formData, sections: newSections });
  };

  const updateQuestion = (sectionIndex, questionIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].questions[questionIndex][field] = value;
    setFormData({ ...formData, sections: newSections });
  };

  const addQuestion = (sectionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].questions.push({ questionText: '', answerText: '' });
    setFormData({ ...formData, sections: newSections });
  };

  const removeSection = (index) => {
    const newSections = [...formData.sections];
    newSections.splice(index, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].questions.splice(questionIndex, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      alert('Please enter a form title');
      return;
    }
    if (!imageUrl) {
      alert('Please upload an image');
      return;
    }

    try {
      const payload = {
        title: formData.title,
        image: imageUrl,
        sections: formData.sections,
      };
      const response = await axios.post('http://localhost:5000/api/forms', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Form submitted successfully:', response.data);
      alert('Form data saved to MongoDB!');
      setFormData({ title: '', sections: [] });
      setSelectedImage(null);
      setImageUrl(null);
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      alert('Error saving form data');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Form Builder</h1>

      <ImageUpload
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setImageUrl={setImageUrl}
      />

      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Enter form heading"
        value={formData.title}
        onChange={handleTitleChange}
      />

      {formData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border rounded p-4 space-y-4 shadow">
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Enter section subheading (optional)"
              value={section.subheading}
              onChange={(e) => updateSectionHeading(sectionIndex, e.target.value)}
            />
            <button
              onClick={() => removeSection(sectionIndex)}
              className="text-red-500 ml-2"
            >
              🗑️
            </button>
          </div>

          <div className="space-y-4">
            {section.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="border p-2 rounded space-y-2 bg-gray-50">
                <input
                  type="text"
                  className="w-full border p-1 rounded mb-2"
                  placeholder="Enter question text"
                  value={question.questionText}
                  onChange={(e) =>
                    updateQuestion(sectionIndex, questionIndex, 'questionText', e.target.value)
                  }
                />
                <input
                  type="text"
                  className="w-full border p-1 rounded"
                  placeholder="Enter answer text (optional)"
                  value={question.answerText}
                  onChange={(e) =>
                    updateQuestion(sectionIndex, questionIndex, 'answerText', e.target.value)
                  }
                />
                <button
                  onClick={() => removeQuestion(sectionIndex, questionIndex)}
                  className="text-red-500 text-sm"
                >
                  Remove Question
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => addQuestion(sectionIndex)}
            className="mt-2 px-3 py-1 bg-gray-200 rounded"
          >
            + Add Question
          </button>
        </div>
      ))}

      <button
        onClick={addSection}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add New Head
      </button>

      <div className="mt-4 text-center">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
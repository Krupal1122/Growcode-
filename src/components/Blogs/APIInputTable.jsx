import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';
import axios from 'axios';
import RichTextEditor from 'react-simple-wysiwyg';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
        // Show error dialog for image upload failure
        Swal.fire({
          title: 'Error!',
          text: 'Failed to upload image. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'rounded-xl shadow-lg',
            confirmButton: 'px-4 py-2 rounded-full',
          },
        });
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
        <span className="text-blue-700 font-medium text-black">Click to upload an image</span>
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
          <p className="text-sm text-gray-600 mb-2 text-black">Preview:</p>
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
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: location.state?.blog?.title || '',
    sections: location.state?.blog?.sections || [],
  });
  const [selectedImage, setSelectedImage] = useState(location.state?.blog?.image || null);
  const [imageUrl, setImageUrl] = useState(location.state?.blog?.image || null);
  const [isEditing, setIsEditing] = useState(!!location.state?.blog);
  const formId = location.state?.blog?.id;

  useEffect(() => {
    if (location.state?.blog) {
      setFormData({
        title: location.state.blog.title,
        sections: location.state.blog.sections,
      });
      setSelectedImage(location.state.blog.image);
      setImageUrl(location.state.blog.image);
      setIsEditing(true);
    }
  }, [location.state]);

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { subheading: '', questions: [{ questionText: '' }] },
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
    newSections[sectionIndex].questions.push({ questionText: '' });
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
      Swal.fire({
        title: 'Missing Title!',
        text: 'Please enter a form title.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'px-4 py-2 rounded-full',
        },
      });
      return;
    }
    if (!imageUrl) {
      Swal.fire({
        title: 'Missing Image!',
        text: 'Please upload an image.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'px-4 py-2 rounded-full',
        },
      });
      return;
    }

    try {
      const payload = {
        title: formData.title,
        image: imageUrl,
        sections: formData.sections,
      };

      if (isEditing) {
        // Update existing form (PUT request)
        await axios.put(`http://localhost:5000/api/forms/${formId}`, payload, {
          headers: { 'Content-Type': 'application/json' },
        });
        Swal.fire({
          title: 'Success!',
          text: 'Form updated successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'rounded-xl shadow-lg',
            confirmButton: 'px-4 py-2 rounded-full',
          },
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        // Create new form (POST request)
        await axios.post('http://localhost:5000/api/forms', payload, {
          headers: { 'Content-Type': 'application/json' },
        });
        Swal.fire({
          title: 'Success!',
          text: 'Form data saved to MongoDB!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'rounded-xl shadow-lg',
            confirmButton: 'px-4 py-2 rounded-full',
          },
          timer: 2000,
          timerProgressBar: true,
        });
      }

      // Reset form and navigate back
      setFormData({ title: '', sections: [] });
      setSelectedImage(null);
      setImageUrl(null);
      setIsEditing(false);
      navigate('/admin/Blogs');
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
      Swal.fire({
        title: 'Error!',
        text: isEditing ? 'Error updating form data.' : 'Error saving form data.',
        icon: 'error',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'px-4 py-2 rounded-full',
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 text-black">
      <h1 className="text-3xl font-bold mb-4 text-black">
        {isEditing ? '✏️ Edit Form' : '📝 Form Builder'}
      </h1>

      <ImageUpload
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setImageUrl={setImageUrl}
      />

      <input
        type="text"
        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter form title"
        value={formData.title}
        onChange={handleTitleChange}
      />

      {formData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter section subheading (optional)"
              value={section.subheading}
              onChange={(e) => updateSectionHeading(sectionIndex, e.target.value)}
            />
            <button
              onClick={() => removeSection(sectionIndex)}
              className="ml-3 text-red-600 hover:text-red-800 text-lg"
            >
              🗑
            </button>
          </div>

          <div className="space-y-4">
            {section.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-2"
              >
                <RichTextEditor
                  value={question.questionText}
                  onChange={(e) =>
                    updateQuestion(sectionIndex, questionIndex, 'questionText', e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  style={{ minHeight: '150px' }}
                />
                <button
                  onClick={() => removeQuestion(sectionIndex, questionIndex)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove Question
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => addQuestion(sectionIndex)}
            className="text-sm px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          >
            + Add Question
          </button>
        </div>
      ))}

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={addSection}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add New Head
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300"
        >
          {isEditing ? '✅ Update' : '✅ Submit'}
        </button>
      </div>
    </div>
  );
}
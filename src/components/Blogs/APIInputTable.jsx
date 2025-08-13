import React, { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';
import axios from 'axios';
import RichTextEditor from 'react-simple-wysiwyg';
import Swal from 'sweetalert2';

const MAX_SECTIONS = 100;
const MAX_QUESTIONS_PER_SECTION = 20;
const MAX_IMAGE_SIZE_MB = 100; // Changed to 100MB
const MAX_QUESTION_LENGTH = 50000; // Max 50000 characters for question text

const ImageUpload = ({ selectedImage, setSelectedImage, setImageUrl, setIsUploading }) => {
  const [isUploadingState, setIsUploadingState] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image size
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large!',
          text: `Image size must be less than ${MAX_IMAGE_SIZE_MB}MB.`,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'rounded-xl shadow-lg',
            confirmButton: 'px-4 py-2 rounded-full',
          },
        });
        return;
      }

      setIsUploadingState(true);
      setIsUploading(true); // Update parent state
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
      } finally {
        setIsUploadingState(false);
        setIsUploading(false); // Reset parent state
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
        <span className="text-blue-700 font-medium text-black">
          {isUploadingState ? 'Uploading...' : 'Click to upload an image'}
        </span>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          disabled={isUploadingState}
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

// Memoized Section Component
const Section = memo(({ section, sectionIndex, updateSectionHeading, updateQuestion, addQuestion, removeSection, removeQuestion }) => {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
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
  );
});

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
  const [isUploading, setIsUploading] = useState(false); // Added for image upload state
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
    if (formData.sections.length >= MAX_SECTIONS) {
      Swal.fire({
        title: 'Limit Reached!',
        text: `You can only add up to ${MAX_SECTIONS} sections.`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'px-4 py-2 rounded-full',
        },
      });
      return;
    }
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
    if (field === 'questionText' && value.length > MAX_QUESTION_LENGTH) {
      Swal.fire({
        title: 'Text Too Long!',
        text: `Question text cannot exceed ${MAX_QUESTION_LENGTH} characters.`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'px-4 py-2 rounded-full',
        },
      });
      return;
    }
    const newSections = [...formData.sections];
    newSections[sectionIndex].questions[questionIndex][field] = value;
    setFormData({ ...formData, sections: newSections });
  };

  const addQuestion = (sectionIndex) => {
    if (formData.sections[sectionIndex].questions.length >= MAX_QUESTIONS_PER_SECTION) {
      Swal.fire({
        title: 'Limit Reached!',
        text: `You can only add up to ${MAX_QUESTIONS_PER_SECTION} questions per section.`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'px-4 py-2 rounded-full',
        },
      });
      return;
    }
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
    // Combine validation errors into a single message
    let errors = [];

    // Validate title
    if (!formData.title.trim()) {
      errors.push('Please enter a non-empty form title.');
    }

    // Validate image
    if (!imageUrl) {
      errors.push('Please upload an image.');
    }

    // Validate sections
    if (formData.sections.length === 0) {
      errors.push('Please add at least one section.');
    }

    // Validate questions in each section
    for (let i = 0; i < formData.sections.length; i++) {
      const section = formData.sections[i];
      if (section.questions.length === 0) {
        errors.push(`Section ${i + 1} must have at least one question.`);
      }
      for (let j = 0; j < section.questions.length; j++) {
        const question = section.questions[j];
        if (!question.questionText.trim()) {
          errors.push(`Question ${j + 1} in Section ${i + 1} must have non-empty text.`);
        }
      }
    }

    // If there are validation errors, show them in a single alert
    if (errors.length > 0) {
      Swal.fire({
        title: 'Validation Error!',
        html: errors.join('<br>'),
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'px-4 py-2 rounded-full',
        },
      });
      return;
    }

    // Prevent submission if image is still uploading
    if (isUploading) {
      Swal.fire({
        title: 'Please Wait!',
        text: 'Image is still uploading. Please wait before submitting.',
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
        title: formData.title.trim(),
        image: imageUrl,
        sections: formData.sections,
      };

      if (isEditing) {
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

      // Reset form after successful submission
      setFormData({ title: '', sections: [] });
      setSelectedImage(null);
      setImageUrl(null);
      setIsEditing(false);
      navigate('/admin/Blogs');
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
      Swal.fire({
        title: 'Error!',
        text:
          error.response?.data?.message ||
          (isEditing ? 'Error updating form data.' : 'Error saving form data.'),
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
        setIsUploading={setIsUploading}
      />

      <input
        type="text"
        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter form title"
        value={formData.title}
        onChange={handleTitleChange}
      />

      {formData.sections.map((section, sectionIndex) => (
        <Section
          key={sectionIndex}
          section={section}
          sectionIndex={sectionIndex}
          updateSectionHeading={updateSectionHeading}
          updateQuestion={updateQuestion}
          addQuestion={addQuestion}
          removeSection={removeSection}
          removeQuestion={removeQuestion}
        />
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
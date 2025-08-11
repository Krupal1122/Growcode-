import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const FormDetail = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
        setForm(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching form:', error);
        setError('Failed to load form details');
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!form) return <div className="text-center p-4">Form not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        to="/"
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← Back to Forms
      </Link>
      <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
      <img
        src={form.image}
        alt={form.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <div className="space-y-6">
        {form.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border rounded-lg p-4 shadow">
            {section.subheading && (
              <h2 className="text-xl font-semibold mb-4">{section.subheading}</h2>
            )}
            <div className="space-y-4">
              {section.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-gray-800">
                    {question.questionText}
                  </p>
                  {question.answerText && (
                    <p className="text-gray-600">Answer: {question.answerText}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormDetail;
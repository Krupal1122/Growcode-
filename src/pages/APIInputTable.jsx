import React, { useState } from 'react';

export default function APIInputTable() {
  const [formData, setFormData] = useState({
    title: '',
    sections: []
  });

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { subheading: '', questions: [{ questionText: '', answerText: '' }] }
      ]
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

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Form Builder</h1>

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
                  className="w-full border p-1 rounded"
                  placeholder="Enter question text"
                  value={question.questionText}
                  onChange={(e) =>
                    updateQuestion(sectionIndex, questionIndex, 'questionText', e.target.value)
                  }
                />
         
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
    type="submit"
    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
  >
    Submit
  </button>
</div>

    </div>
  );
}

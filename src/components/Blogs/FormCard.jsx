import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormCard = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forms');
                // Format the forms to match the BlogDetail expected structure
                const formattedForms = response.data.map((form) => ({
                    id: form._id,
                    title: form.title,
                    description: form.sections[0]?.questions[0]?.questionText || 'No description available',
                    image: form.image || 'https://via.placeholder.com/150',
                    date: new Date(form.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    }),
                    sections: form.sections,
                }));
                setForms(formattedForms);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };
        fetchForms();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Submitted Forms</h1>
                <Link to="/admin/documents/add">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
                        + Add Data
                    </button>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created At</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {forms.length > 0 ? (
                            forms.map((form) => (
                                <tr key={form.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <img
                                            src={form.image}
                                            alt={form.title}
                                            className="w-16 h-16 object-cover rounded-md border"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 font-medium">{form.title}</td>
                                    <td className="px-6 py-4 text-gray-600">{form.date}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/blog/${form.id}`}
                                            state={{ blog: form }} // Pass the formatted form as blog
                                            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    No forms found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormCard;
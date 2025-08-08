import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormCard = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forms');
                setForms(response.data);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };
        fetchForms();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center justify-between bg-white p-6 rounded-lg -md mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Submitted Forms</h1>
                <Link to="/admin/documents/add">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
                        + Add Data
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {forms.map((form) => (
                    <Link
                        key={form._id}
                        to={`/admin/documents/form/${form._id}`}
                        className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col w-full h-[300px] no-underline"
                    >
                        <img
                            src={form.image}
                            alt={form.title}
                            className="w-full h-40 object-cover rounded-md mb-4 flex-shrink-0"
                        />
                        <h2 className="text-lg font-semibold mb-2 truncate">{form.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FormCard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupportLinkManagement = () => {
    const [countryCode, setCountryCode] = useState('');
    const [link, setLink] = useState('');
    const [links, setLinks] = useState([]);
    const [editingCode, setEditingCode] = useState(null);
    const [editingLink, setEditingLink] = useState('');

    // Fetch all links
    const fetchLinks = async () => {
        try {
            const res = await axios.get('https://grozziieget.zjweiting.com:8033/tht/supportLink');
            setLinks(res.data.result || []);
        } catch (error) {
            console.error('Error fetching links:', error);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    // Create new link
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!countryCode || !link) return alert('Please fill all fields');
        try {
            await axios.post('https://grozziieget.zjweiting.com:8033/tht/supportLink/create', { countryCode, link });
            setCountryCode('');
            setLink('');
            fetchLinks();
        } catch (error) {
            console.error('Error adding link:', error);
        }
    };

    // Delete link
    const handleDelete = async (code) => {
        try {
            await axios.delete(`https://grozziieget.zjweiting.com:8033/tht/supportLink/delete/${code}`);
            fetchLinks();
        } catch (error) {
            console.error('Error deleting link:', error);
        }
    };

    // Start editing
    const handleEdit = (code, currentLink) => {
        setEditingCode(code);
        setEditingLink(currentLink);
    };

    // Submit update
    const handleUpdate = async () => {
        try {
            await axios.put(`https://grozziieget.zjweiting.com:8033/tht/supportLink/update/${editingCode}`, { link: editingLink });
            setEditingCode(null);
            setEditingLink('');
            fetchLinks();
        } catch (error) {
            console.error('Error updating link:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="mb-10 text-3xl font-bold text-[#004368] my-5 mt-10">
                Support Link Management
            </h1>

            {/* Form */}
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label className="block mb-2 pl-2 text-start text-gray-600">
                        Country Code
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter country code (e.g. en-US)"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 pl-2 text-start text-gray-600">
                        Link
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        type="text"
                        placeholder="Enter support link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Support Link
                    </button>
                </div>
            </form>

            {/* List */}
            <h2 className="text-2xl font-bold text-[#004368] mb-4">
                Support Link List
            </h2>

            <div className="space-y-4">
                {links.map(({ countryCode, link }) => (
                    <div
                        key={countryCode}
                        className="flex items-center justify-between bg-white p-4 shadow rounded"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
                            <div className="font-semibold text-gray-700 w-full md:w-1/4">{countryCode}</div>

                            {editingCode === countryCode ? (
                                <input
                                    className="border px-3 py-1 rounded w-full md:w-1/2"
                                    value={editingLink}
                                    onChange={(e) => setEditingLink(e.target.value)}
                                />
                            ) : (
                                <div className="text-gray-600 break-all w-full md:w-1/2">{link}</div>
                            )}
                        </div>

                        <div className="flex gap-2 mt-2 md:mt-0">
                            {editingCode === countryCode ? (
                                <button
                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                    onClick={handleUpdate}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                                    onClick={() => handleEdit(countryCode, link)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDelete(countryCode)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupportLinkManagement;

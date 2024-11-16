import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowPaymentPage from './ShowPaymentPage';

const UserBaseBitmap = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [bitmapState, setBitmapState] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0); // Current page
    const [totalPages, setTotalPages] = useState(0); // Total pages from API
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from API based on current page
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/user/page?page=${page}&size=10`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                setUsers(data.content);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page]); // Re-run effect when page changes



    const openModal = (user) => {
        setSelectedUser(user);
        setBitmapState(user.addressType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleUpdate = async () => {
        if (selectedUser) {
            try {
                const response = await fetch(`https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/user/device/bitmap/flag/${selectedUser.userId}/${bitmapState}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    alert('User updated successfully');
                    // Update the user state locally if needed
                    setUsers(prevUsers =>
                        prevUsers.map(user =>
                            user.userId === selectedUser.userId
                                ? { ...user, addressType: bitmapState }
                                : user
                        )
                    );
                } else {
                    alert('Failed to update user');
                }
            } catch (error) {
                console.error("Error updating user:", error);
                alert('An error occurred');
            } finally {
                closeModal();
            }
        }
    };


    const handleShowBitmap = (userId) => {
        navigate(`showBitmap/${userId}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center">User Base Bitmap</h2>
            <div className="overflow-auto">
                <table className="w-full text-left border-collapse rounded-lg shadow-md overflow-hidden">
                    <thead>
                        <tr className="bg-slate-300 text-slate-500 text-sm uppercase">
                            <th className="p-3 border">Serial</th>
                            <th className="p-3 border w-24">User Name</th>
                            <th className="p-3 border">Country</th>
                            <th className="p-3 border">Device Type</th>
                            <th className="p-3 border">Device Model</th>
                            <th className="p-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center p-3">Loading...</td></tr>
                        ) : users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.userId} className="hover:bg-blue-200 text-black">
                                    <td className="p-3 border">{page * 10 + index + 1}</td>
                                    <td className="p-3 border">{user.userName}</td>
                                    <td className="p-3 border">{user.country}</td>
                                    <td className="p-3 border">{user.deviceType}</td>
                                    <td className="p-3 border">{user.deviceModel}</td>
                                    <td className="p-3 border space-x-2 text-center">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleShowBitmap(user.userId)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                                        >
                                            Show Bitmap
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="text-center p-3">No Data</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
                >
                    Previous
                </button>
                <span className="p-2">Page {page + 1} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages - 1}
                    className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
                >
                    Next
                </button>
            </div>

            {/* Modal for updating user */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
                        <h3 className="text-xl font-semibold mb-4">Update User {selectedUser.userId}</h3>
                        <label className="block mb-2">
                            Bitmap State:
                            <select
                                value={bitmapState}
                                onChange={(e) => setBitmapState(e.target.value === 'true')}
                                className="mt-1 w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </select>
                        </label>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ShowPaymentPage></ShowPaymentPage>
        </div>
    );
};

export default UserBaseBitmap;

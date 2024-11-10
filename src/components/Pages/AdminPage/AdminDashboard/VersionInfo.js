import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VersionInfo = () => {
    const [appVersion, setAppVersion] = useState('');
    const [releaseNotes, setReleaseNotes] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [appData, setAppData] = useState(null);

    useEffect(() => {
        // Fetch initial data
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:2000/tht/version');
                const response = await axios.get('https://grozziieget.zjweiting.com:8033/tht/version');
                console.log(response, "response");

                if (response.status === 200) {
                    const data = response.data[0];
                    setAppVersion(data.appVersion);
                    setReleaseNotes(data.releaseNotes);
                    setDownloadUrl(data.downloadUrl);
                    setAppData(data);
                } else {
                    toast.error('Failed to load data');
                }
            } catch (error) {
                toast.error('An error occurred while fetching data');
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleCancel = () => {
        setAppVersion('');
        setReleaseNotes('');
        setDownloadUrl('');
        toast.info('Inputs cleared');
    };

    const handleSave = async () => {
        // Validate inputs
        if (!appVersion) {
            toast.error('Please enter the app version');
            return;
        }
        if (!releaseNotes) {
            toast.error('Please enter release notes');
            return;
        }
        if (!downloadUrl || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(downloadUrl)) {
            toast.error('Please enter a valid URL for the download link');
            return;
        }

        setLoading(true);
        try {
            // const response = await axios.put('http://localhost:2000/tht/version/update/1', {
            const response = await axios.put('https://grozziieget.zjweiting.com:8033/tht/version/update/1', {
                appVersion,
                releaseNotes,
                downloadUrl,
            });

            if (response.status === 200) {
                toast.success('Data saved successfully!');
                setAppData({ id: 1, appVersion, releaseNotes, downloadUrl });
                handleCancel(); // Clear inputs after successful save
            } else {
                toast.error('Failed to save data');
            }
        } catch (error) {
            toast.error('An error occurred while saving data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-8 max-w-2xl w-full mx-auto bg-gray-50">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Application Information
                </h2>

                <section className="mb-8">
                    <label className="block font-medium text-gray-700 text-lg mb-2">App Version</label>
                    <input
                        type="text"
                        value={appVersion}
                        onChange={(e) => setAppVersion(e.target.value)}
                        className="p-3 border border-gray-300 rounded w-full"
                        placeholder="Enter app version"
                    />
                </section>

                <section className="mb-8">
                    <label className="block font-medium text-gray-700 text-lg mb-2">Release Notes</label>
                    <textarea
                        value={releaseNotes}
                        onChange={(e) => setReleaseNotes(e.target.value)}
                        className="p-3 border border-gray-300 rounded w-full"
                        placeholder="Enter release notes"
                        rows="4"
                    />
                </section>

                <section className="mb-8">
                    <label className="block font-medium text-gray-700 text-lg mb-2">Download URL</label>
                    <input
                        type="url"
                        value={downloadUrl}
                        onChange={(e) => setDownloadUrl(e.target.value)}
                        className="p-3 border border-gray-300 rounded w-full"
                        placeholder="Enter download URL"
                    />
                </section>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-3 font-medium bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-6 py-3 font-medium text-white rounded transition-colors ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>

                <ToastContainer />

                {appData && (
                    <section className="mt-12 bg-gray-100 p-6">
                        <h3 className="text-2xl font-medium text-gray-800 mb-4">Current Application Data</h3>
                        <div className="text-gray-700">
                            <p><strong>App Version:</strong> {appData.appVersion}</p>
                            <p><strong>Release Notes:</strong> {appData.releaseNotes}</p>
                            <p><strong>Download URL:</strong> <a href={appData.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{appData.downloadUrl}</a></p>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default VersionInfo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VersionInfo = () => {
    const [appVersion, setAppVersion] = useState('');
    const [androidId, setAndroidId] = useState('');
    const [releaseNotes, setReleaseNotes] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [appData, setAppData] = useState(null);
    const [versionMark, setVersionMark] = useState(null);
    const [iosAppVersion, setIosAppVersion] = useState('');
    const [iosId, setIosId] = useState('');
    const [iosReleaseNotes, setIosReleaseNotes] = useState('');
    const [iosDownloadUrl, setIosDownloadUrl] = useState('');
    const [iosAppData, setIosAppData] = useState(null);
    const [iosVersionMark, setIosVersionMark] = useState(null);
    const [iosLoading, setIosLoading] = useState(false);

    useEffect(() => {
        // Fetch initial data
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:2000/tht/version');
                const response = await axios.get('https://grozziieget.zjweiting.com:8033/tht/version');


                if (response.status === 200) {
                    const data = response.data[0];
                    setAppVersion(data?.appVersion);
                    setReleaseNotes(data?.releaseNotes);
                    setDownloadUrl(data?.downloadUrl);
                    setVersionMark(data?.versionMark)
                    setAndroidId(data?.id)
                    setAppData(data);
                    const data2 = response.data[1];
                    setIosAppVersion(data2?.appVersion);
                    setIosReleaseNotes(data2?.releaseNotes);
                    setIosDownloadUrl(data2?.downloadUrl);
                    setIosVersionMark(data2?.versionMark)
                    setIosId(data2?.id)
                    setIosAppData(data2);
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
        setVersionMark('');
        toast.info('Inputs cleared');
    };
    const handleIosCancel = () => {
        setIosAppVersion('');
        setIosReleaseNotes('');
        setIosDownloadUrl('');
        setIosVersionMark("");
        toast.info('Inputs cleared');
    };

    const handleSave = async () => {
        console.log("Android");

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
        console.log({
            appVersion,
            releaseNotes,
            downloadUrl,
            versionMark
        });
        setLoading(true);
        try {
            // const response = await axios.put(`http://localhost:2000/tht/version/update/${androidId}`, {
            const response = await axios.put(`https://grozziieget.zjweiting.com:8033/tht/version/update/${androidId}`, {
                appVersion,
                releaseNotes,
                downloadUrl,
                versionMark
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
    const handleIosSave = async () => {

        // Validate inputs
        if (!iosAppVersion) {
            toast.error('Please enter the ios app version');
            return;
        }
        if (!iosReleaseNotes) {
            toast.error('Please enter ios release notes');
            return;
        }
        if (!iosDownloadUrl || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(iosDownloadUrl)) {
            toast.error('Please enter a valid URL for the download link');
            return;
        }

        setIosLoading(true);
        try {
            // const response = await axios.put(`http://localhost:2000/tht/version/update/${iosId}`, {
            const response = await axios.put(`https://grozziieget.zjweiting.com:8033/tht/version/update/${iosId}`, {
                appVersion: iosAppVersion,
                releaseNotes: iosReleaseNotes,
                downloadUrl: iosDownloadUrl,
                versionMark: iosVersionMark

            });

            if (response.status === 200) {
                toast.success('Data saved successfully!');
                setIosAppData({ id: 2, appVersion: iosAppVersion, releaseNotes: iosReleaseNotes, downloadUrl: iosDownloadUrl, versionMark: iosVersionMark });
                handleIosCancel(); // Clear inputs after successful save
            } else {
                toast.error('Failed to save data');
            }
        } catch (error) {
            toast.error('An error occurred while saving data');
            console.error(error);
        } finally {
            setIosLoading(false);
        }
    };




    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="p-8 max-w-2xl w-full mx-auto bg-gray-50">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Android Application Information
                    </h2>

                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Android App Version</label>
                        <input
                            type="text"
                            value={appVersion}
                            onChange={(e) => setAppVersion(e.target.value)}
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter app version"
                        />
                    </section>

                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Android Release Notes</label>
                        <textarea
                            value={releaseNotes}
                            onChange={(e) => setReleaseNotes(e.target.value)}
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter release notes"
                            rows="4"
                        />
                    </section>

                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Android Download URL</label>
                        <input
                            type="url"
                            value={downloadUrl}
                            onChange={(e) => setDownloadUrl(e.target.value)}
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter download URL"
                        />
                    </section>
                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Android Version Mark</label>
                        <input
                            type="url"
                            value={versionMark}
                            onChange={(e) => setVersionMark(e.target.value)}
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
                            className={`px-6 py-3 font-medium text-white rounded transition-colors ${loading ? 'bg-gray-400' : 'bg-[#004368]  hover:bg-blue-700'}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                    <ToastContainer />

                    {appData && (
                        <section className="mt-12 bg-gray-100 p-6">
                            <h3 className="text-2xl font-medium text-gray-800 mb-4">Current Android Application Data</h3>
                            <div className="text-gray-700">
                                <p><strong>Android App Version:</strong> {appData.appVersion}</p>
                                <p><strong>Android Release Notes:</strong> {appData.releaseNotes}</p>
                                <p><strong>Android Download URL:</strong> <a href={appData.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{appData.downloadUrl}</a></p>
                            </div>
                        </section>
                    )}
                </div>

            </div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-32">
                <div className="p-8 max-w-2xl w-full mx-auto bg-gray-50">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Ios Application Information
                    </h2>

                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Ios App Version</label>
                        <input
                            type="text"
                            value={iosAppVersion}
                            onChange={(e) => setIosAppVersion(e.target.value)}
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter app version"
                        />
                    </section>

                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Ios Release Notes</label>
                        <textarea
                            value={iosReleaseNotes}
                            onChange={(e) => setIosReleaseNotes(e.target.value)}
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter release notes"
                            rows="4"
                        />
                    </section>

                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Ios Download URL</label>
                        <input
                            type="url"
                            value={iosDownloadUrl}
                            onChange={(e) => setIosDownloadUrl(e.target.value)}
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter download URL"
                        />
                    </section>
                    <section className="mb-8">
                        <label className="block font-medium text-gray-700 text-lg mb-2">Ios Version Mark</label>
                        <input
                            type="url"
                            value={iosVersionMark}
                            onChange={(e) => setIosVersionMark(e.target.value)}
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter download URL"
                        />
                    </section>

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handleIosCancel}
                            className="px-6 py-3 font-medium bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleIosSave}
                            className={`px-6 py-3 font-medium text-white rounded transition-colors ${loading ? 'bg-gray-400' : 'bg-[#004368]  hover:bg-blue-700'}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                    <ToastContainer />

                    {iosAppData && (
                        <section className="mt-12 bg-gray-100 p-6">
                            <h3 className="text-2xl font-medium text-gray-800 mb-4">Current Ios Application Data</h3>
                            <div className="text-gray-700">
                                <p><strong>Ios App Version:</strong> {iosAppData.appVersion}</p>
                                <p><strong>Ios Release Notes:</strong> {iosAppData.releaseNotes}</p>
                                <p><strong>Ios Download URL:</strong> <a href={iosAppData.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{iosAppData.downloadUrl}</a></p>
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
};

export default VersionInfo;

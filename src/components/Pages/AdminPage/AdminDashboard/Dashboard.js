import { Link } from 'react-router-dom';
import { HiRefresh } from 'react-icons/hi';
import BtnSpinner from '../../../Shared/Loading/BtnSpinner';
import DynamicBarChart from './DynamicBarChart';
import DynamicBarChart2 from './DynamicBarChart2';

const Dashboard = ({
    userInfo,
    handleCount,
    userLoading,
    allUsers,
    categoriesLoading,
    categories,
    mallLoading,
    mallProduct,
    eventLoading,
    eventProduct,
    todayLoginApiCountLoading,
    todayLoginApiCount,
    modelLoginApiCountLoading,
    loginApiCount,
    modelApiCountLoading,
    modelApiCount,
    deviceTypeCountLoading,
    deviceTypeTotalCount,
    deviceTypeTotalCountLoading,
    deviceTypeCount,
    usersLogo,
    IconsLogo,
    mallLogo,
    eventLogo,
    loginLogo,
    wifiLogo,
    wifiManyLogo,
    BluetoothLogo,
    BluetoothManyLogo,
    androidLogo,
    iosLogo,
}) => {


    return (
        <div>
            {/* Overview Section */}
            <section className="relative p-6 py-6 bg-white pt-12 text-gray-800 mb-16 rounded-lg shadow-lg">
                <button
                    onClick={handleCount}
                    className="absolute text-3xl top-4 right-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                    <HiRefresh />
                </button>

                <div data-aos="fade-down" data-aos-duration="2000" className="mb-5 mt-5">
                    <h2 className="text-3xl text-gray-500 font-bold mb-5">Short Overview</h2>
                    <p className="text-gray-700 text-base font-semibold mb-8">
                        THT-Space Electrical Company Ltd. is a leading manufacturer of printing and attendance check equipment. With a factory located in China, the company produces a range of products including dot printers, thermal printers, attendance check clocks, and binding machines.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                    {/* Card Item Template */}
                    {[
                        { link: '/admin/users', logo: usersLogo, label: 'Total Users', count: userLoading ? <BtnSpinner /> : allUsers?.length },
                        { link: '/admin/icon', logo: IconsLogo, label: 'Total Icons Category', count: categoriesLoading ? <BtnSpinner /> : categories?.length },
                        { link: '/admin/mallProduct', logo: mallLogo, label: 'Total Mall Product', count: mallLoading ? <BtnSpinner /> : mallProduct?.length },
                        { link: '/admin/eventProduct', logo: eventLogo, label: 'Total Event Product', count: eventLoading ? <BtnSpinner /> : eventProduct?.length },
                        { logo: loginLogo, label: 'Today Login Count', count: todayLoginApiCountLoading ? <BtnSpinner /> : todayLoginApiCount },
                        { logo: usersLogo, label: 'Total Login Count', count: modelLoginApiCountLoading ? <BtnSpinner /> : loginApiCount },
                        { logo: wifiLogo, label: 'Today Wifi Count', count: modelApiCountLoading ? <BtnSpinner /> : modelApiCount?.wifiCount },
                        { logo: wifiManyLogo, label: 'Total Wifi Count', count: modelApiCountLoading ? <BtnSpinner /> : modelApiCount?.wifiTotalCount },
                        { logo: BluetoothLogo, label: 'Today Bluetooth Count', count: modelApiCountLoading ? <BtnSpinner /> : modelApiCount?.bluetoothCount },
                        { logo: BluetoothManyLogo, label: 'Total Bluetooth Count', count: modelApiCountLoading ? <BtnSpinner /> : modelApiCount?.bluetoothTotalCount },
                        { logo: androidLogo, label: 'Total Android Users', count: deviceTypeTotalCountLoading ? <BtnSpinner /> : deviceTypeTotalCount?.Android },
                        { logo: iosLogo, label: 'Total IOS Users', count: deviceTypeTotalCountLoading ? <BtnSpinner /> : deviceTypeTotalCount?.IOS },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            to={item.link || '#'}
                            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                            data-aos-duration="2000"
                            className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white text-gray-800 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-gray-100">
                                <img className="w-16 h-16" src={item.logo} alt={`${item.label} logo`} />
                            </div>
                            <div className="flex flex-col justify-center align-middle">
                                <p className="text-3xl font-semibold leading-none">{item.count}</p>
                                <p className="capitalize">{item.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <DynamicBarChart
                deviceTypeCount={deviceTypeCount}
            />
            <DynamicBarChart2 />
        </div>

    )
};

export default Dashboard;

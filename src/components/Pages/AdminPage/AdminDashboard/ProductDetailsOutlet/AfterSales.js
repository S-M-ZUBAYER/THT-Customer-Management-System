import React, { useContext } from 'react';
import { AllProductContext } from '../../../../../context/ProductContext';
import { toast } from 'react-hot-toast';

const AfterSales = () => {
    const {Product}=useContext(AllProductContext);
    if(!Product){
        toast.error("Don't get the product information");
        return;
    }
    return (
        <div className="mx-20 text-start mt-10 mb-20">
            <div>
                <h2 className="text-center text-xl font-semibold my-8 text-amber-400">
                    After Sales
                </h2>
                <p>
                    {/* Maintenance service is an essential part of any organization that wants to keep its facilities running smoothly and efficiently. Whether it's a commercial building, a manufacturing plant, or a residential property, regular maintenance is key to preventing breakdowns and ensuring optimal performance.
                    Our maintenance service offers a comprehensive range of services to meet all your needs. Our skilled technicians are trained to perform preventive maintenance, routine inspections, and emergency repairs on all types of equipment and systems.
                    We use the latest technology and tools to ensure that our maintenance service is top-notch. Our team is equipped with state-of-the-art diagnostic equipment, which enables us to quickly identify and resolve any issues that may arise.
                    In addition to our regular maintenance services, we also offer customized maintenance plans tailored to meet your specific needs and budget. Whether you require weekly, monthly, or annual maintenance, we can work with you to develop a plan that fits your schedule and requirements.
                    We take pride in our work and strive to provide our customers with the highest quality maintenance service possible. With our expertise and commitment to excellence, you can rest assured that your facilities will be well-maintained and running at peak performance. Contact us today to schedule your maintenance service and experience the difference that our team can make for your organization. */}
                
            {Product?.afterSalesText
}
                </p>
            </div>

            {/* <div>
                <h2 className="text-center text-xl font-semibold my-8">
                    Return Service
                </h2>
                <p >
                    Returns are an inevitable part of any business, and managing them can be a challenge. Our return service is designed to make the process as easy and hassle-free as possible for both you and your customers.
                    We understand that returns can be frustrating for customers, whic      h is why we strive to provide a smooth and straightforward return process. Our team of experts is trained to handle returns efficiently and effectively, ensuring that your customers receive prompt and courteous service.
                    We offer a variety of return options, including in-store returns, mail-in returns, and online returns. Our flexible approach allows customers to choose the method that works best for them, making the return process as convenient as possible.
                    With our advanced tracking and reporting system, we can provide you with detailed insights into your returns. This allows you to identify trends and make data-driven decisions to improve your business operations.
                </p>
            </div> */}

        </div>
    );
};

export default AfterSales;
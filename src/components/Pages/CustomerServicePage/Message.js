import React from 'react';

const Message = () => {
    return (
        <div         >

            <div className=" my-2 flex gap-0 ">
                <div className="">
                    <img className="w-6 h-6 rounded-full" src="https://cdn.pixabay.com/photo/2016/06/03/15/35/customer-service-1433639__340.png"></img>
               
                </div>
                <div className="max-w-8/10 ">
                    <p className="bg-blue-700 px-2 py-1 rounded-tl-none rounded-md text-white">Hello</p>
                    {/* <img className="w-6 h-6 rounded-full" src="https://media.istockphoto.com/id/1244527145/photo/happy-smiling-woman-working-in-call-center.jpg?s=612x612&w=0&k=20&c=3q7ImqhEDOdYptyaZLYmjqtJgMBoY42lGDkzUi0NGBo="></img> */}

                </div>
            </div>
            <div className=" my-2 flex justify-end gap-0">
                <div className="max-w-8/10 ">
                    <p className="bg-blue-700 px-2 py-1 rounded-tr-none rounded-md text-white">Hello</p>
                    {/* <img className="w-6 h-6 rounded-full" src="https://media.istockphoto.com/id/1244527145/photo/happy-smiling-woman-working-in-call-center.jpg?s=612x612&w=0&k=20&c=3q7ImqhEDOdYptyaZLYmjqtJgMBoY42lGDkzUi0NGBo="></img> */}

                </div>
                <div className="">
                    <img className="w-6 h-6 rounded-full" src="https://cdn.pixabay.com/photo/2016/06/03/15/35/customer-service-1433639__340.png"></img>
                   
                </div>
            </div>

        </div>
    );
};

export default Message;
import React from 'react';

const Message = () => {
    return (
        <div         >

            <div className=" my-2 flex gap-0 w-full">
                <div className="w-6">
                    <img className="w-6 h-6 rounded-full" src="https://cdn.pixabay.com/photo/2016/06/03/15/35/customer-service-1433639__340.png"></img>
               
                </div>
                <div className="w-10/12 pt-3">
                    <p className=" bg-fuchsia-200 px-2 py-1 rounded-tl-none rounded-br-none rounded-md text-black">The noun conversation comes from the Old French word of the same spelling, meaning "manner of conducting oneself in the world</p>
                    {/* <img className="w-6 h-6 rounded-full" src="https://media.istockphoto.com/id/1244527145/photo/happy-smiling-woman-working-in-call-center.jpg?s=612x612&w=0&k=20&c=3q7ImqhEDOdYptyaZLYmjqtJgMBoY42lGDkzUi0NGBo="></img> */}

                </div>
            </div>
            <div className=" my-2 flex justify-end  w-full">
                <div className="w-10/12 pt-3">
                    <p className="bg-blue-200 px-2 py-1 rounded-tr-none rounded-bl-none rounded-md text-black">When you have a conversation with another person or a group of people, you listen closely and respond appropriately</p>
                    {/* <img className="w-6 h-6 rounded-full" src="https://media.istockphoto.com/id/1244527145/photo/happy-smiling-woman-working-in-call-center.jpg?s=612x612&w=0&k=20&c=3q7ImqhEDOdYptyaZLYmjqtJgMBoY42lGDkzUi0NGBo="></img> */}

                </div>
                <div className="w-6">
                    <img className="w-6 h-6 rounded-full" src="https://media.istockphoto.com/id/1244527145/photo/happy-smiling-woman-working-in-call-center.jpg?s=612x612&w=0&k=20&c=3q7ImqhEDOdYptyaZLYmjqtJgMBoY42lGDkzUi0NGBo="></img>
                   
                </div>
            </div>

        </div>
    );
};

export default Message;
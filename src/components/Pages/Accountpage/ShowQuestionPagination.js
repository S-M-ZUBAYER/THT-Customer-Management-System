
import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const ShowQuestionPagination = ({ handleToDeleteAllData, totalQuestions, QuestionPerPage }) => {
    const [currentPage, setCurrentPage] = useState(2);
    const totalPages = Math.ceil(totalQuestions.length / QuestionPerPage);
    const startIndex = (currentPage-1) * QuestionPerPage;
    const endIndex = startIndex + QuestionPerPage;
    const currentQuestions = totalQuestions.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        // Recalculate the totalPages and update the currentPage when totalQuestions changes
        const newTotalPages = Math.ceil(totalQuestions.length / QuestionPerPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
        }
    }, [totalQuestions, QuestionPerPage, currentPage]);

    return (
        <div>
            {/* <h2>Questions</h2>
            {currentQuestions.map((question, index) => (
                <div key={index}>{question}</div>
            ))} */}

            <div className="flex justify-between text-3xl bg-red-200 py-1 font-bold mt-32 px-4">
                <h2 className="">total Questions</h2>
                <MdDeleteOutline onClick={handleToDeleteAllData} className='text-2xl cursor-pointer'></MdDeleteOutline>
            </div>

            <div>
                <table className="w-full">
                    <thead>
                        <tr className="bg-orange-200">
                            <th>No.</th>
                            <th>Question</th>
                            <th>Time</th>
                            <th>Date</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                        {totalQuestions.length !== 0 ? currentQuestions.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td className="text-start">{item?.question}</td>
                                <td>{item?.time}</td>
                                <td>{item?.date}</td>
                                {/* <td>
          <button onClick={() => handleToDeleteOneTotalQuestions(index,totalQuestions)}>
              <MdDeleteOutline className='ml-5 text-2xl cursor-pointer'></MdDeleteOutline>
          </button>
      </td> */}
                            </tr>
                        )) : <span className="text-xl font-bold text-red-400">NO Data Available</span>}
                    </tbody>

                </table>
            </div>

            <div className="pagination mt-20">
               
                 
                     <button className="mr-3 bg-amber-200 px-2 py-1 rounded-tl-lg rounded-br-lg font-semibold" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button className="ml-3  bg-green-200 px-2 py-1 rounded-tl-lg rounded-br-lg font-semibold" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
               
            </div>
        </div>
    );
};

export default ShowQuestionPagination;

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/UserContext";
import { toast } from "react-hot-toast";
import QuestionAnswerTable from "./QandAComponents.js/QuestionsAnswersTable";

function QandA() {
  const [questionAnswer, setQuestionsAnswer] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const {user}=useContext(AuthContext)


  //got the current user data from database  
  useEffect(() => {
    if (user?.email) {
      
      fetchQuestionsAnswerByEmail();
    }
  }, [user?.email]);

  const fetchQuestionsAnswerByEmail = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tht/QandAnswers', {
        params: {
          email: user?.email,
        },
      });
      setQuestionsAnswer(response.data);
  
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  console.log(questionAnswer)

  


//create a function to delete a user from the frontend and database both side 
const handleDelete = async (userId) => {
  try {
    await axios.delete(`http://localhost:5000/tht/QandAnswers/delete/${userId}`);
    toast.success('Question Answer deleted successfully');
    setQuestionsAnswer(questionAnswer.filter((user) => user.id !== userId));
  } catch (error) {
    console.error('Error deleting user:', error);
    toast.error('Failed to delete user');
  }
};




//create a function to update a user from the frontend and database both side 
const updateUser = async (userId, editingUser) => {
  try {
    const response = await axios.put(`http://localhost:5000/tht/QandAnswers/update/${userId}`, editingUser);
    toast.success("user information updated successfully");
    // Optionally, you can show a success message to the user using a toast or other UI notification.
  } catch (error) {
    toast.error('Error updating user:', error);
    // Optionally, you can show an error message to the user using a toast or other UI notification.
  }
};
// const saveUser = (userId,updatedUser) => {
//   updateUser(userId, updatedUser);
//   setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
//   setEditingUser(null);
// };





  


  function handleSubmit(event) {
    event.preventDefault();

    if (user && question && answer) {

      //load current user data from database
      fetch('http://localhost:5000/tht/QandAnswers/add', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({ email: user?.email, question: question, answer:answer })
      })
          .then(res => res.json())
          .then(data => {
              if (data?.insertId) {
                  toast.success('Questions answer stored Successfully');
                  setQuestionsAnswer([...questionAnswer, { email: user?.email, question: question, answer:answer }]);
                  setQuestion("");
                  setAnswer("");


              }
              else {
                  toast.error(data.message);
              }

          })

  }
  else{
    toast.error("please add question and answer in input field")
  }

  }



  const handleEdit = async(id, editedQuestion, editedAnswer, editedDate, editedTime) => {
    setQuestionsAnswer(questionAnswer.map(questionAnswer => {
      if (questionAnswer.id === id) {
        return {
          ...questionAnswer,
          question: editedQuestion,
          answer: editedAnswer,
          date: editedDate,
          time: editedTime
        };
      }
      return questionAnswer;
    }));
    try {
      const response = await axios.put(`http://localhost:5000/tht/QandAnswers/update/${id}`, {editedQuestion, editedAnswer, editedDate, editedTime});
      toast.success("user information updated successfully");
      // Optionally, you can show a success message to the user using a toast or other UI notification.
    } catch (error) {
      toast.error('Error updating user:', error);
      // Optionally, you can show an error message to the user using a toast or other UI notification.
    }
  };


  return (
    <div className="mx-20 my-32">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2 pl-2 text-start" htmlFor="name">
          Question:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="question"
          type="text"
          placeholder="Please input question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-400 mb-2 pl-2 text-start" htmlFor="email">
          Answer
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          id="answer"
          type="text"
          placeholder="Please input answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#004368]  hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
<div>
  <h1 className="mt-32 mb-10 text-sky-300 text-3xl font-bold ">
    Questions And Answer list
  </h1>
    
    
    <QuestionAnswerTable
    onDelete={handleDelete}
    onEdit={handleEdit}
    questionAnswers={questionAnswer}
    ></QuestionAnswerTable>
</div>
    </div>
  );
}

export default QandA;

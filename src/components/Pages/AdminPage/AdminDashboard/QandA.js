import { useState } from "react";

function QandA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Name: ${name}\nEmail: ${email}`);
  }

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-400 mb-2 pl-2 text-start" htmlFor="email">
          Answer
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          id="answer"
          type="email"
          placeholder="Please input answer"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
    </div>
  );
}

export default QandA;

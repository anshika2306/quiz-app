import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Question from '../../components/Question'
const AddQuestion = () => {
  const router = useRouter()
  const [category, setCategory] = useState()
  const [question, setQuestion] = useState()
  const [difficultyLevel, setDifficultyLevel] = useState()
  const [option1, setOption1] = useState()
  const [option2, setOption2] = useState()
  const [option3, setOption3] = useState()
  const [option4, setOption4] = useState()
  const [solution, setSolution] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { 
      category,
      questionText: question,
      options : [option1, option2, option3, option4],
      correctOptions: solution,
      difficultyLevel
     }
     const access_token = localStorage.getItem('token');
        if (access_token == null) {
            router.push(`http://${window.location.host}/login`);
        }
    let res = await fetch(`http://${window.location.host}/api/addquestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': access_token
      },
      body: JSON.stringify([data]),
    })
    console.log([data]);
    let response = await res.json()
    console.log(response)
    setQuestion('')
    setCategory('')
    setOption1('')
    setOption2('')
    setOption3('')
    setOption4('')
    setSolution('')
    setDifficultyLevel('')
    if (response.success) {
      toast.success('Question added successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.error(response.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  
  const handleChange = (e) => {
    if (e.target.name == 'question') {
      setQuestion(e.target.value)
    }
    else if (e.target.name == 'category') {
      setCategory(e.target.value)
    }
    else if (e.target.name == 'option1') {
      setOption1(e.target.value)
    }
    else if (e.target.name == 'option2') {
      setOption2(e.target.value)
    }
    else if (e.target.name == 'option3') {
      setOption3(e.target.value)
    }
    else if (e.target.name == 'option4') {
      setOption4(e.target.value)
    }
    else if (e.target.name == 'solution') {
      setSolution(e.target.value)
    }
    else if (e.target.name == 'difficultyLevel') {
      setDifficultyLevel(e.target.value)
    }
  }


  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Image width={100} height={40} className="mx-auto h-12 w-auto" src="/digiaccel.svg" alt="Digiaccel logo" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Add Question</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
          
          <div id='quizdata' className="-space-y-px rounded-md shadow-sm">
            <div>
              <input value={category} onChange={handleChange} id={"category"} name={"category"} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Category" />
              <input value={question} onChange={handleChange} id={"question"} name={"question"} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Question" />
              <input value={option1} onChange={handleChange} id={"option1"} name={"option1"} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 1" />
              <input value={option2} onChange={handleChange} id={"option2"} name={"option2"} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 2" />
              <input value={option3} onChange={handleChange} id={"option3"} name={"option3"} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 3" />
              <input value={option4} onChange={handleChange} id={"option4"} name={"option4"} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 4" />
              <input value={solution} onChange={handleChange} id={"solution"} name={"solution"} type="number" min="1" max="4" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Enter Correct option (1 - 4) Number only." />
              <input value={difficultyLevel} onChange={handleChange} id={"difficultyLevel"} name={"difficultyLevel"} type="number" min="1" max="10" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Enter Difficulty (1 - 10) Number only." />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddQuestion
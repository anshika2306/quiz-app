import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
const AddQuiz = () => {
  const router = useRouter()
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { category, title, description }
    const access_token = localStorage.getItem('token');
    if (access_token == null) {
      router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addquiz`, {
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
    setCategory('')
    setTitle('')
    setDescription('')
    if (response.success) {
      toast.success('Quiz Created Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/admin/addquestion`)
      }, 1000);
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
    if (e.target.name == 'category') {
      setCategory(e.target.value)
    }
    else if (e.target.name == 'title') {
      setTitle(e.target.value)
    }
    else if (e.target.name == 'description') {
      setDescription(e.target.value)
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
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create Quiz</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
          <div id='quizdata' className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="title" className="sr-only">Email address</label>
              <input value={title} onChange={handleChange} id="title" name="title" type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Quiz Title" />
              <input value={category} onChange={handleChange} id="category" name="category" type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Quiz Category" />
              <input value={description} onChange={handleChange} id="description" name="description" type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Quiz Description" />
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

export default AddQuiz
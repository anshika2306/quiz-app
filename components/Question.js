import { useEffect, useState } from "react"
import React from 'react'


const Question = (id) => {
    const [question, setQuestion] = useState() 
    const [option1, setOption1] = useState() 
    const [option2, setOption2] = useState() 
    const [option3, setOption3] = useState() 
    const [option4, setOption4] = useState() 
    useEffect(()=>{

    })
   return <>
        <div>
            <input value={question} id={"question" + id} name={"question" + id} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Question" />
            <input value={option1} id={"option1-" + id} name={"option1-" + id} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 1" />
            <input value={option2} id={"option2-" + id} name={"option2-" + id} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 2" />
            <input value={option3} id={"option3-" + id} name={"option3-" + id} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 3" />
            <input value={option4} id={"option4-" + id} name={"option4-" + id} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Option 4" />
            <input value={solution} id={"solution-" + id} name={"solution-" + id} type="text" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Enter Correct option (1-4) Number only." />
        </div>
    </>
}

export default Question;

import Link from 'next/link'
import React from 'react'

const Quizzes = ({ quizzes }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="m-auto p-4 lg:w-1/3">
            {quizzes.map((item) => {
              return <div key={item._id} className="h-full bg-gray-100 bg-opacity-75 px-8 m-5 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{item.category}</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{item.title}</h1>
                <p className="leading-relaxed mb-3">{item.desc}</p>
                <Link href={`/quiz/${item.category}`} className="text-indigo-500 inline-flex items-center">Start Now
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
export async function getServerSideProps(context) {
  let data = await fetch(`http://${window.location.host}/api/getquiz`);
  let quizzes_data = await data.json();
  
  return {
    props: { quizzes: quizzes_data.quizzes }, // will be passed to the page component as props
  }
}
export default Quizzes
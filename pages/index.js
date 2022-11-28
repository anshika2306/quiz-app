import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Quiz App</title>
        <meta name="quiz-app" content="Created by Anshika Mahajan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <Image width={720} height={600} className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="/student-login.jpg" />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Are you ready to test your knowledge?</h1>
            <p className="mb-8 leading-relaxed">Being a student is easy. Learning requires actual work. -  William Crawford
            </p>
            <div className="flex justify-center">
              <Link href={'/quizzes'}>
              <button className="inline-flex text-white bg-gradient-to-r from-gray-700 to-blue-800 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Browse Quizzes</button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}

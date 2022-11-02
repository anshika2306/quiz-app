import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const Post = ({slug, difficulty}) => {
    // useEffect(() => {
    //     const res = await axios.get(`some-url/todos`);
    // },[]);
    function App() {
        const [data, setData] = useState([]);
        const getData = async () => {
            const data = await fetch(`http://localhost:3000/api/getquestions?category=${slug}&difficultyLevel=${difficulty}`);
            const balle = await data.json();
            console.log('hui',balle)
            setData(balle);
        };
        useEffect(() => {
            getData();
        }, []);
        return <div>{JSON.stringify(data)}</div>;
    }
    // App()
    (async ()=>{
        const data = await fetch(`http://localhost:3000/api/getquestions?category=${slug}&difficultyLevel=51`);
        const balle = await data.json();
        console.log('hui',balle,slug)
        // setData(balle);
    })();
    const router = useRouter()
    // const { slug } = router.query
    return <>
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col w-full mb-12">

                    <h1 className="sm:text-xl text-2xl font-medium title-font mb-4 text-gray-900">Question 1</h1>
                    <p className="lg:w-2/3 leading-relaxed text-base">What is JavaScript?</p>
                </div>
                <div>
                    <ul class="w-50 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="list-radio-license" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">JavaScript is a scripting language used to make the website interactive </label>
                            </div>
                        </li>
                        <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="list-radio-id" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">JavaScript is an assembly language used to make the website interactive</label>
                            </div>
                        </li>
                        <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="list-radio-millitary" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="list-radio-millitary" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">JavaScript is a compiled language used to make the website interactive</label>
                            </div>
                        </li>
                        <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="list-radio-passport" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="list-radio-passport" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">None of the mentioned</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="my-3 inline-flex">
                    <button class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        Prev
                    </button>
                    <button class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                        Next
                    </button>
                </div>
            </div>
        </section>
    </>
}

export const getServerSideProps = async (context) => {
    const { slug, difficulty } = context.query;
    // If slug is "undefined", since "undefined" cannot be serialized, server will throw error
    // But null can be serializable
    if (!slug) {
        slug = null;
    }
    // now we are passing the slug to the component
    return { props: { slug:slug, difficulty: difficulty} };
};

export default Post
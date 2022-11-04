import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const Post = ({ slug }) => {
    const [data, setData] = useState('');
    const [selectedRadio, setRadio] = useState(null)

    const getData = async () => {
        const access_token = localStorage.getItem('token');
        if (access_token == null) {
            router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
        }
        console.log(access_token);
        let questionDetails = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getquestions?category=${slug}`, {
            headers: {
                'token': access_token
            }
        });
        questionDetails = await questionDetails.json()
        
        setData(questionDetails.randomQuestion);
    };
    useEffect(() => {
        getData();

    }, []);

    const submitSolution = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('token');
        const answer = selectedRadio;
        // setRadio(null);
        console.log('answer', answer)
        let submissionResult = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/submitanswer`, {
            method: 'POST',
            headers: {
                'token': access_token
            },
            body: JSON.stringify({
                question_id: data._id,
                answer: answer
            })
        });
        submissionResult = await submissionResult.json();
        
        let radio = document.getElementsByClassName('radio-button-class');
        for (let i = 0; i < radio.length; i++) {
            radio[i].disabled = true;
        }
        document.getElementById('submit-button').setAttribute('hidden', true)
        document.getElementById('next-button').removeAttribute('hidden')
        if(submissionResult.win){
            document.getElementById('win-alert').removeAttribute('hidden')
            let questionParts = document.getElementsByClassName('question-part');
            for(let i = 0; i < questionParts.length; i++){
                questionParts[i].setAttribute('hidden', true);
                document.getElementById('next-button').value = 'Retry'
            }
            setTimeout(() => {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/results`)
              }, 1500);
        }
        else if(submissionResult.lost){
            document.getElementById('lost-alert').removeAttribute('hidden')
            let questionParts = document.getElementsByClassName('question-part');
            for(let i = 0; i < questionParts.length; i++){
                questionParts[i].setAttribute('hidden', true);
                document.getElementById('next-button').value = 'Retry'
            }
            setTimeout(() => {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/results`)
              }, 1500);
        }
        else if (submissionResult.result) {
            document.getElementById('success-alert').removeAttribute('hidden')
        } else {
            document.getElementById('wrong-alert').removeAttribute('hidden')
        }
    }

    const radioOnChange = async (e) => {
        console.log(e.target.value)
        setRadio(e.target.value)
    }

    const loadnextProblem = async (e) => {
        e.preventDefault();
        getData();
        document.getElementById('wrong-alert').setAttribute('hidden', true)
        document.getElementById('success-alert').setAttribute('hidden', true)
        document.getElementById('win-alert').setAttribute('hidden', true)
        document.getElementById('lost-alert').setAttribute('hidden', true)
        document.getElementById('submit-button').removeAttribute('hidden')
        document.getElementById('next-button').setAttribute('hidden', true)
        let radio = document.getElementsByClassName('radio-button-class');
        let questionParts = document.getElementsByClassName('question-part');
        for(let i = 0; i < questionParts.length; i++){
            questionParts[i].removeAttribute('hidden');
            document.getElementById('next-button').value = 'Retry'
        }
        for (let i = 0; i < radio.length; i++) {
            radio[i].disabled = false;
        }
    }
    
    const router = useRouter()
    if (data) {
        return <>
            <section className="text-gray-600 body-font relative" >
                <div className="container px-5 py-24 mx-auto">
                    <div hidden id='win-alert' class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <span class="font-medium">Congratulations you won this quiz!</span> Proud of you.
                    </div>
                    <div hidden id='lost-alert' class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <span class="font-medium">You lost this quiz!</span> Dont worry just a little more practice for next time.
                    </div>
                    <div hidden id='success-alert' class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <span class="font-medium">Correct Answer!</span> Wow, you know stuff. Lets try a more difficult one.
                    </div>
                    <div hidden id='wrong-alert' class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <span class="font-medium">Incorrect Answer!</span> No worries. Lets try an easy one.
                    </div>
                    <div className="question-part flex flex-col w-full mb-12">
                        <h1 className="question-part sm:text-xl text-2xl font-medium title-font mb-4 text-gray-900">Question &#40;Difficulty&#58; {data.difficultyLevel}&#41;</h1>
                        <p className="question-part lg:w-2/3 leading-relaxed text-base">{data.questionText}</p>
                    </div>
                    <div className='question-part'>
                        <ul class="w-50 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                            {data.options.map((value, index) => {
                                return <><li key={index} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                                    <div class="flex items-center pl-3">
                                        <input onClick={radioOnChange} id="list-radio-license" type="radio" value={index + 1} name="list-radio" className="radio-button-class w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label for="list-radio-license" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{value}</label>
                                    </div>
                                </li></>
                            })}


                        </ul>
                    </div>
                    <div class="my-3 inline-flex">
                        <button id='submit-button' onClick={submitSolution} class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Submit
                        </button>
                        <button hidden id='next-button' onClick={loadnextProblem} class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    }
    else {
        return "loading.."
    }
}

export const getServerSideProps = async (context) => {
    const { slug } = context.query;
    // If slug is "undefined", since "undefined" cannot be serialized, server will throw error
    // But null can be serializable
    if (!slug) {
        slug = null;
    }
    // now we are passing the slug to the component
    return { props: { slug: slug } };
};

export default Post
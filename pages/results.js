import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
const Post = () => {
    const [data, setData] = useState(null);

    const getData = async () => {
        const access_token = localStorage.getItem('token');
        
        if (access_token == null) {
            router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
        }
        let results = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getquizresults`, {
            headers: {
                'token': access_token
            }
        });
        results = await results.json()
        
        setData(results);
    };
    useEffect(() => {
        getData();

    }, []);

    const getDateString = (date)=>{
        let x = new Date(date.toString());
        let s = x.getDate() + "-" + x.getMonth() + "-" + x.getFullYear();
        return s;
    }

    const router = useRouter()
    if (data) {
        return <>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">My progress</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {
                            data.map((value, index) => {
                                return <>
                                    <div className="p-4 lg:w-1/4 md:w-1/2">
                                        <div className="h-full flex flex-col items-center text-center">
                                            <div className="w-full">
                                                {value.finished && value.result ?
                                                    <h2 className="title-font font-bold text-lg text-green-600">You did Great!</h2> : <></>
                                                }
                                                {value.finished && !value.result ?
                                                    <h2 className="title-font font-bold text-lg text-red-600">Need More Practice</h2> : <></>
                                                }
                                                {!value.finished ?
                                                    <h2 className="title-font font-bold text-lg text-gray-600">Lets Resume</h2> : <></>
                                                }

                                                <h3 className="text-gray-500 mb-3">{value.quiz_id}</h3>
                                                <h3 className="text-gray-500 mb-3">Score: {value.score}</h3>
                                                <h3 className="text-gray-500 mb-3">Date: {getDateString(value.updatedAt)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>
            </section>


        </>
    }
    else {
        return "loading.."
    }
}
export default Post
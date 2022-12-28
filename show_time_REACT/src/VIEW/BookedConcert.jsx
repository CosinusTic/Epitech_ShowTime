import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"


const BookedConcert = () => {
    const params = useParams();
    const id = params.id;
    
    const [concert, setConcert] = useState(null);

    useEffect(() => {
        async function computeConcert()
        {
            const response = await fetch('http://localhost:3000/concerts/' + id)
                .then((response) => response.json());
            setConcert(response);
            console.log(response.concert.group);
        }
        computeConcert();
    }, [])

    return(
    concert ? 
        <div class="mt-5 max-w-md mx-auto bg-white rounded-xl border shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
            <div class="md:shrink-0">
            <img
                class="h-48 w-full object-cover md:h-full md:w-48"
                src={concert.concert.image_url}
                alt="concert image"
            />
            </div>
            <div class="p-4 w-3/5 ml-6">
            <div class="flex items-center justify-between">
                <h5 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {concert.concert.group}
                </h5>
                <h6 className="ml-6">{concert.concert.genre}</h6>
            </div>
            
            <p
                class="block mt-1  leading-tight font-medium text-black"
            >
                {concert.concert.location}  <strong className="uppercase text-sm  text-gray-400 font-light tracking-tight">‏‏ {concert.concert.date}</strong>
            </p>
            <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-gray-800 dark:text-white">
                {concert.concert.price}€
                </span>
            </div>
            </div>
            
        </div>
        </div>
    : ('Loading...')
    )
}

export default BookedConcert;
import React, {useState, useEffect} from "react";
import ConcertForAdmin from "../Component/ConcertForAdmin";

const ManageConcerts = () => {
    const [concerts, setConcerts] = useState(null);
    async function computeConcerts()
    {
        const response = await fetch('http://localhost:3000/concerts')
            .then((response) => response.json());
        setConcerts(response)

    }
    computeConcerts();
    return (
        <div>
            {concerts ? concerts.concerts.map((concert) => <ConcertForAdmin concert={concert}/>) : ('Loading...')}
        </div>
    );
}

export default ManageConcerts;
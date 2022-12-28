import QRCode from "qrcode";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


const NathanQRCOde = () => {
    const params = useParams();
    const id = params.id;

    const [concert, setConcert] = useState(null);
    const [text, setText] = useState("");
    const canvasRef = useRef();

    useEffect(() => {
        QRCode.toCanvas(
            canvasRef.current,
            text || " ",
            (error) => error && console.error(error)

        );
        setText("http://localhost:3001/bookedConcert/" + id);
        async function computeConcert() {
            const response = await fetch('http://localhost:3000/concerts/' + id)
                .then((response) => response.json());
            setConcert(response);
            console.log(response.concert.group);
        }
        computeConcert();
    }, [text]);

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    )
}

export default NathanQRCOde





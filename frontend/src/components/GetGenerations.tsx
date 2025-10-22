import { useState } from "react";
import type { GeneratedResponse } from "../generationType";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;


export const GetGenerations = () => {

    const [history, setHistory] = useState<GeneratedResponse[]>([]);

    const handleClick = async () => {
        try {
            const res = await axios.get(`${apiUrl}/generations`, { withCredentials: true });
            console.log(res)
            setHistory(res.data.generations);
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    return (
        <div>
            <p>Last 5 Generated Results</p>
            <button
                onClick={handleClick}
                className="text-blue-600 border-2 px-4 py-1 bg-blue-100 hover:bg-blue-300 rounded-md border-gray-300 mt-1"
            >
                Show 
            </button>
            <div>
                { history[0] && <div className="flex justify-center mt-4">
                    <div className="w-full max-w-md object-cover rounded-md mb-2 border p-2 border-gray-300">
                        {/* <h2 className="font-bold mb-2">History</h2> */}
                        <ul className="space-y-4">
                            {history.map((item) => (
                            <li
                                key={item.id}
                                className=""
                            >
                                <div className="flex gap-4 border border-gray-300 rounded-lg p-2 bg-white">
                                    <img
                                    src={item.imageUrl}
                                    alt={item.prompt}
                                    className="h-20 w-auto rounded"
                                    />
                                    <div className="text-sm">
                                    <p><span className="font-semibold">ID:</span> {item.id}</p>
                                    <p><span className="font-semibold">Prompt:</span> {item.prompt}</p>
                                    <p><span className="font-semibold">Style:</span> {item.style}</p>
                                    <p>
                                        <span className="font-semibold">Created At:</span>{" "}
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                    </div>}
            </div>
        </div>
    )
}
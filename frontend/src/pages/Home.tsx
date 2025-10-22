import { useState } from "react"
import { Generate } from "../components/Generate"
import { GetGenerations } from "../components/GetGenerations"
export const Home = () => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div>
            <button
                onClick={() => {
                    setShowHistory(prev => !prev);
                }}
                className="text-lg text-blue-400 p-2 rounded bg-blue-50"
            >
                {showHistory? 'Generate New Image' : 'Show History'}
            </button>
            <div className="mt-10">
                { showHistory ? (
                    <GetGenerations />
                ) : (
                    <Generate />
                )}
            </div>
        </div>
    )
}
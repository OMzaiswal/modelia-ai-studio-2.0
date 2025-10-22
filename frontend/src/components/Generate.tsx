import { useState } from "react";
import Upload from "./Upload";
import PromptInput from "./PromptInput";
import StyleDropdown from "./StyleDropdown";
import type { GenerateRequest, GeneratedResponse } from '../generationType';
import axios from "axios";
import { retryWithBackoff } from "../lib/retry";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

export const Generate = () => {

    const [img, setImg] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState<'Editorial' | 'Streetwear' | 'Vintage'>('Editorial');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setresponse] = useState<GeneratedResponse | null>(null);
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    const handleSubmit = async () => {
      if (loading) {
        if (abortController) {
          abortController.abort();
          setAbortController(null);
          toast.error("Request Aborted !!")
        }
        return;
      }
      if (!prompt || !style || !img) {
        toast.error('Please enter all the details');
        return;
      }
      setError('');
      setLoading(true);
      setresponse(null);


      const controller = new AbortController();
      setAbortController(controller);
    
      const request: GenerateRequest = {
        prompt,
        style,
        image: img
      }
  
      try {
        const res = await retryWithBackoff( async () => 
          await axios.post(`${apiUrl}/generations`,request, { 
            headers: {
              'Content-Type': 'multipart/form-data',
          }, 
          signal: controller.signal
        }), 3, 500);
  
        setresponse(res.data.generation);
        setPrompt('');
        setImg(null)
        
      } catch(err: any) {
        if(err.name === 'AbortError') {
          return;
        }
        if (err.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="flex justify-center gap-10 content-center">
        <div className="flex flex-col max-w-md w-full items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md gap-4">
          <h3 className='my-2'>Generate AI Image</h3>
          <Upload onUpload={setImg} />
          <PromptInput onChange={setPrompt}/>
          <StyleDropdown value={style} onchange={setStyle}/>
          <button
            className={`border-2 border-gray-300 rounded-lg w-full px-8 py-1 transition-colors ${
            loading
            ? 'bg-red-100 text-red-600 hover:bg-red-200 '
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
            onClick={handleSubmit}
          >
            {loading? 'Abort' : 'Generate'}
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div>{response && (
            <div className="my-4 w-full p-4 border border-gray-300 rounded bg-white">
              <img src={response.imageUrl} alt="Generated" className="max-w-sm rounded" />
              <p className="text-gray-600 text-sm mt-2">
                <strong>ID:</strong> {response.id} <br/>
                <strong>Prompt:</strong> {response.prompt}<br />
                <strong>Style:</strong> {response.style} <br/>
                <strong>Created At:</strong> {response.createdAt}
              </p>
            </div>
          )}
          </div>
      </div>
    )
}
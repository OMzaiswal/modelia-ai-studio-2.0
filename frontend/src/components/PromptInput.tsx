
interface PromptInputProps {
    onchange: (text: string) => void
    value: string
}

export default function PromptInput({ onchange, value }: PromptInputProps) {

    return (
        <div className="flex justify-center w-full">
            <textarea
                rows={2} 
                placeholder="Enter your prompt"
                value={ value } 
                className="w-full border-2 border-gray-300 rounded-md p-2"
                onChange={e => onchange(e.target.value)} 
            />
        </div>
    )
}
interface StyleDropdownProp {
    value: string;
    onchange: (style: 'Editorial' | 'Streetwear' | 'Vintage') => void
}

const StyleOption = ["Editorial", "Streetwear", "Vintage"] as const;

export default function StyleDropdown({ value, onchange }: StyleDropdownProp) {
    return (
        <div className="w-full flex items-center space-x-2">
            <label htmlFor="dropdown">Choose Style</label>
            <select id="dropdown" value={value} 
                    className="border-2 border-gray-300 rounded-md p-2"
                    onChange={e => onchange(e.target.value as 'Editorial' | 'Streetwear' | 'Vintage')}
                    >
                {StyleOption.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                )) }
            </select>
        </div>
    )
}   
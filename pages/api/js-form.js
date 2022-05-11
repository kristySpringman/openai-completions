import {useState} from 'react'


export default function Form() {
    // const handleChange(event) {
        // handle change => if th
    //     if (event.target.prompt.value)
    // }
    const [prompt, setPrompt] = useState('')
    const [result, setResult] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            prompt: prompt,
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/form'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        response.text().then(txt => {
            setResult(txt)
        })
        
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="prompt">Enter your prompt:</label>
                    <textarea 
                    rows="5" 
                    cols="60" 
                    type="text" 
                    id="prompt" 
                    name="prompt"
                    onChange={event => setPrompt(event.target.value)}
                    required />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id="results">
                {result}
            </div>
        </div>
    )
}
import { useState } from 'react';

export default function TestForm() {
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !url) return;

        const testUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}`;

        try {
            const res = await fetch(testUrl);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div>

            <h2>Webhook Endpoint Validator</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@example.com"
                        required
                    />
                </div>

                <div>
                    <label>API Endpoint URL: </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://my-backend.onrender.com/api/webhook"
                        required
                    />
                </div>

                <button type="submit">Validate</button>
            </form>

            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{response}</pre>
                </div>
            )}
        </div>
    );
}
import { useState, useEffect } from 'react';

export default function UsernameChecker() {
  const [username, setUsername] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAvailability = async () => {
      if (username.trim() === '') {
        setAvailable(null);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch('http://localhost:4000/api/check-availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: username }),
        });

        const data = await res.json();
        setAvailable(data.available);
      } catch (error) {
        console.error('Error checking availability:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      checkAvailability();
    }, 500); // Debounce to reduce API calls

    return () => clearTimeout(debounceTimer);
  }, [username]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      {loading && <p>Checking...</p>}
      {available === true && <p className="text-green-500">Available ✅</p>}
      {available === false && <p className="text-red-500">Not available ❌</p>}
    </div>
  );
}
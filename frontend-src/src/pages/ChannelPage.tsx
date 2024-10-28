import React, { useEffect, useState } from 'react';

interface Channel {
  _id: string;
  name: string;
  isLocked: boolean;
}

const ChannelPage = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [error, setError] = useState<string | null>(null);

  
useEffect(() => {
  const fetchChannels = async () => {
    try {
      const response = await fetch('/api/channels');
      if (!response.ok) {
        throw new Error('Failed to fetch channels');
      }
      const data = await response.json();
      setChannels(data); 
    } catch (error) {
      const err = error as Error; 
      setError(err.message); 
    }
  };

  fetchChannels();
}, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Channels</h1>
      <ul>
        {channels.map(channel => (
          <li key={channel._id}>
            {channel.name} {channel.isLocked ? '(Locked)' : '(Open)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelPage;

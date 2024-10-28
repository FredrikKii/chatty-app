import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  // Hämtar kanaler från API
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch('http://localhost:4343/api/channels');
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    fetchChannels();
  }, []);

  
  const joinChannel = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div>
      <h2>Available Channels</h2>
      <ul>
        {channels.map((channel: { _id: string, name: string, isLocked: boolean }) => (
          <li key={channel._id}>
            {channel.name} {channel.isLocked ? '(Locked)' : ''}
            <button onClick={() => joinChannel(channel._id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HistoryPanel from '../components/HistoryPanel';
import { useAuth } from '../hooks/useAuth';
import { getRoomDetails } from '../services/Api';

export default function RoomHistoryPage() {
  const { roomId } = useParams();
  const { token, user } = useAuth();
  const [userDirectory, setUserDirectory] = useState({});

  useEffect(() => {
    if (!roomId || !token) return;

    getRoomDetails(roomId)
      .then((roomData) => {
        const directory = {};
        if (roomData.members) {
          roomData.members.forEach(member => {
            if (typeof member === 'object' && member.id) {
              directory[member.id] = member.name || member.username || 'Desconocido';
            }
          });
        }
        setUserDirectory(directory);
      })
      .catch((error) => {
        console.error('Error cargando detalles de la sala:', error);
      });
  }, [roomId, token]);

  if (!token || !user) {
    return <div className="ns-root"><div className="dash-loading">Cargando…</div></div>;
  }

  return (
    <div className="ns-root">
      <Navbar chatRoute={roomId ? `/rooms/${roomId}/chat` : undefined} backToRoom={roomId ? `/rooms/${roomId}` : undefined} />
      <main style={{ padding: '120px 16px 32px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 'min(920px, 96vw)' }}>
          <h2 style={{ color: '#e6eaf2', textAlign: 'center', marginBottom: '16px' }}>Historial de la Sala</h2>
          <HistoryPanel
            roomId={roomId}
            authToken={token}
            userDirectory={userDirectory}
            currentUserId={user.id}
          />
        </div>
      </main>
    </div>
  );
}

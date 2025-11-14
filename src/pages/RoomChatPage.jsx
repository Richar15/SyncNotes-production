import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RoomChatPanel from '../components/RoomChatPanel';

export default function RoomChatPage() {
  const { roomId } = useParams();

  return (
    <div className="ns-root">
      <Navbar historyRoute={roomId ? `/rooms/${roomId}/history` : undefined} backToRoom={roomId ? `/rooms/${roomId}` : undefined} />
      <main style={{ padding: '120px 16px 32px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 'min(920px, 96vw)' }}>
          <h2 style={{ color: '#e6eaf2', textAlign: 'center', marginBottom: '16px' }}>💬 Mantente Conectado con Tu Equipo</h2>
          <RoomChatPanel roomId={roomId} />
        </div>
      </main>
    </div>
  );
}

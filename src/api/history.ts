export interface ChangeHistoryDto {
  id?: string;
  userId?: string;
  userName?: string;
  username?: string; // Campo adicional que viene del backend
  action?: string;   // p.ej. CREAR_TAREA, ACTUALIZAR_TAREA, AGREGAR_MIEMBRO
  details?: string;  // texto libre que envía el backend
  createdAt: string; // fecha ISO o epoch
  timestamp?: string; // Campo adicional que viene del backend
}

export async function fetchRoomHistory(roomId: string, token: string) {
  const res = await fetch(`/api/rooms/${roomId}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Historial: ${res.status} ${txt}`);
  }
  return (await res.json()) as ChangeHistoryDto[];
}
function ReservationsList({ reservations }) {
  return (
    <>
      <h2>Mis Reservas</h2>

      {reservations.length === 0 ? (
        <p>No tienes reservas</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {reservation.service?.name} | {reservation.date} | {reservation.time}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ReservationsList;

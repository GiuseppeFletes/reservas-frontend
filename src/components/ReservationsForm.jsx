function ReservationForm({
  services,
  selectedService,
  setSelectedService,
  date,
  setDate,
  time,
  setTime,
  handleReservation,
  message
}) {
  return (
    <>
      <h2>Crear Reserva</h2>

      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">Selecciona un servicio</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <br /><br />

      <button onClick={handleReservation}>
        Reservar
      </button>

      <p>{message}</p>
    </>
  );
}

export default ReservationForm;

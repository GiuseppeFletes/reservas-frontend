function ServicesList({ services }) {
  return (
    <>
      <h2>Servicios disponibles</h2>

      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ServicesList;

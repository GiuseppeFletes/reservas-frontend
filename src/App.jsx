import { useState, useEffect } from "react";
import axios from "axios";
import ReservationsList from "./components/ReservationsList";
import ReservationForm from "./components/ReservationsForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (token) {
      fetchServices(token);
      fetchReservations(token);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { email, password }
      );

      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  const fetchServices = async (authToken) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/services",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setServices(response.data);
    } catch (error) {
      console.error("Error al obtener servicios");
    }
  };

  const fetchReservations = async (authToken) => {
    try{
      const response = await axios.get(
        "http://127.0.0.1:8000/api/reservations",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setReservations(response.data);
    }catch(error){
      console.log("Error al obtener reservas");
    }
  };

  const handleReservation = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reservations",
        {
          service_id: selectedService,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Reserva creada correctamente");
      fetchReservations(token);
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("Este horario ya está reservado");
      } else {
        setMessage("Error al crear reserva");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setServices([]);
  };

  if (!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
          <button type="submit">Iniciar sesión</button>
        </form>

        

      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <h2>Servicios disponibles</h2>

      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>

      <ReservationsList reservations={reservations} />
      <ReservationForm
        services={services}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        handleReservation={handleReservation}
        message={message}
      />


  
    </div>
  );
}

export default App;

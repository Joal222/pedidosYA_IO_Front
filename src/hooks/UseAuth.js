// src/hooks/UseAuth.js
import { useState, useContext } from "react";
import { signUp, login } from "../services/authService";
import { AuthContext, decodeToken } from "../context/authContext";
import AlertToastify from "./AlertToastify";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export const useAuth = (onOpenChange) => {
  const { setUser } = useContext(AuthContext);
  const [selected, setSelected] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Usar useNavigate para redirigir

  const handleInputChange = (e, form) => {
    const { name, value } = e.target;
    if (form === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=,.])[A-Za-z\d!@#$%^&*()-+=,.]{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      AlertToastify('error', 'Contraseñas no coinciden');
      setSignUpData({ ...signUpData, password: "", confirmPassword: "" });
      return;
    }

    if (!validatePassword(signUpData.password)) {
      AlertToastify('error', 'Contraseña insegura');
      setSignUpData({ ...signUpData, password: "", confirmPassword: "" });
      return;
    }
    try {
      await signUp(signUpData);
      onOpenChange(false);
      setTimeout(() => {
        setSelected("login"); 
        onOpenChange(true); 
      }, 10); 
      AlertToastify('success', 'Usuario Creado con Exito!');
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 400) {
          AlertToastify('error', error.response.data.message || 'Correo ya registrado');
          setSignUpData({ ...signUpData, email: "" });
        } else {
          AlertToastify('error', error.response.data.message || 'Error al registrar!');
        }
      } else {
        AlertToastify('error', 'Error de conexión o respuesta no estándar');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      const decodedToken = decodeToken(data.token);
      setUser({ email: loginData.email, role: decodedToken.role }); // Actualiza el contexto con la información del usuario

      if (decodedToken.role === 'ADMIN') {
        navigate('/dashBoard'); // Redirige a crear-vuelo
      } else {
        navigate('/'); // Redirige a la página principal
      }

      onOpenChange(false);
      AlertToastify('success', 'Inicio de sesión Exitoso!');
    } catch (error) {
      AlertToastify('error', 'Correo o Contraseña Incorrectas!');
    }
  };

  return {
    selected, setSelected,
    loginData, signUpData,
    error,
    handleInputChange,
    handleSignUp,
    handleLogin
  };
};

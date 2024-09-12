import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Tabs, Tab, Input, Button, ModalFooter, Link } from '@nextui-org/react';
import { useAuth } from '../../hooks/UseAuth';
import { useAuthModal } from '../../context/AuthModalContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import 'react-toastify/dist/ReactToastify.css';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  const {
    selected, setSelected,
    loginData, signUpData,
    error,
    handleInputChange,
    handleSignUp,
    handleLogin
  } = useAuth(closeAuthModal);

  const navigate = useNavigate(); // Usar useNavigate para redirigir

  const handleClose = () => {
    closeAuthModal();
    navigate('/'); // Redirigir a la página de inicio
  };

  const modalWidth = selected === "sign-up" ? "max-w-4xl" : "max-w-lg";

  return (
    <Modal isOpen={isAuthModalOpen} onClose={handleClose} placement="top-center" className="bg-background/65 backdrop-saturate-110">
      <ModalContent className={modalWidth}>
        <ModalHeader>
          <Tabs fullWidth size="md" aria-label="Tabs form" selectedKey={selected} onSelectionChange={setSelected}>
            <Tab key="login" title="Iniciar sesión" />
            <Tab key="sign-up" title="Registrarse" />
          </Tabs>
        </ModalHeader>
        <ModalBody>
          {selected === "login" ? (
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <Input clearable bordered fullWidth color="warning" size="sm" isRequired label="Email" placeholder="Ingresar su email" value={loginData.email} onChange={(e) => handleInputChange(e, 'login')} name="email" />
              <Input clearable bordered fullWidth color="warning" size="sm" isRequired label="Contraseña" placeholder="Ingresar su contraseña" type="password" value={loginData.password} onChange={(e) => handleInputChange(e, 'login')} name="password" />
              <div className="flex items-center justify-center w-full">
              <Button className="bg-green-600 hover:bg-green-400 w-1/2" type="submit">Ingresar</Button>
              </div>
            </form>
          ) : (
            <form className="flex flex-wrap gap-4" onSubmit={handleSignUp}>
              <div className="flex-1 min-w-[calc(50%-1rem)]">
                <Input className="m-2" color="warning" isRequired label="Nombre" placeholder="Ingrese sus nombres" value={signUpData.firstName} onChange={(e) => handleInputChange(e, 'sign-up')} name="firstName" />
                <Input className="m-2" color="warning" isRequired label="Apellido" placeholder="Ingrese sus apellidos" value={signUpData.lastName} onChange={(e) => handleInputChange(e, 'sign-up')} name="lastName" /> 
              </div>
              <div className="flex-1 min-w-[calc(50%-1rem)]">
              <Input className="m-2" color="warning" isRequired label="Correo electrónico" type="email" placeholder="Ingrese su correo electrónico" value={signUpData.email} onChange={(e) => handleInputChange(e, 'sign-up')} name="email" />
                <Input className="m-2" color="warning" isRequired label="Contraseña" type="password" placeholder="Ingrese su contraseña" value={signUpData.password} onChange={(e) => handleInputChange(e, 'sign-up')} name="password" />
                <Input className="m-2" color="warning" isRequired label="Confirme su Contraseña" type="password" placeholder="Confirme su contraseña" value={signUpData.confirmPassword} onChange={(e) => handleInputChange(e, 'sign-up')} name="confirmPassword" />
              </div>
              <div className="flex-1 min-w-[calc(50%-1rem)]">
                <p className="text-center text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link color="primary" onClick={() => setSelected("login")}>
                    Iniciar sesión
                  </Link>
                </p>
                <div className="flex items-center justify-center w-full">
                <Button className="bg-green-600 hover:bg-green-400 w-1/3" type="submit">Registrarse</Button>
                </div>
              </div>
            </form>
          )}
        </ModalBody>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ModalFooter>
          <div className="flex items-center justify-center w-full">
            <Button className="bg-red-700 hover:bg-red-600 text-white w-1/3" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;

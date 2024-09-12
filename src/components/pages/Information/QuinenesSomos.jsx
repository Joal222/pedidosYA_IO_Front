import React from "react";
import NavBar from "../../navbar/NavBar";
import "./QuienesSomos.css"; // Asegúrate de tener estilos para el video y las secciones

const QuinenesSomos = () => {
  return (
    <div>
      <div className="flex flex-col w-full h-1/5">
        <NavBar />
      </div>
      {/* Sección de video de fondo */}
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="/video/truck-moving-2.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
        <div className="overlay">
          <h1>Bienvenidos a Nuestra Empresa</h1>
        </div>
      </div>

      {/* Sección de Quiénes Somos */}
      <section className="quienes-somos">
        <h2>Quiénes Somos</h2>
        <p>
          En Delivery YA, somos un equipo apasionado y comprometido con la
          entrega de productos de manera rápida y eficiente. Nuestra misión es
          facilitar la vida de nuestros clientes, asegurando que reciban sus
          pedidos de forma segura y en el menor tiempo posible. Creemos que cada
          entrega es una oportunidad para brindar un servicio excepcional y
          superar las expectativas de quienes confían en nosotros
        </p>
      </section>

      {/* Sección de Misión, Visión y Propósito */}
      <section className="mision-vision-proposito">
        <div className="iconos">
          <div className="icono">
            <h3>Misión</h3>
            <p>
              Nuestra misión es ofrecer un servicio de entrega rápido, confiable
              y accesible, garantizando que nuestros clientes reciban sus
              productos de manera segura y en el menor tiempo posible. Nos
              comprometemos a facilitar la vida de nuestros usuarios, brindando
              una experiencia de compra sin complicaciones.
            </p>
          </div>
          <div className="icono">
            <h3>Visión</h3>
            <p>
              Nuestra visión es ser la empresa líder en servicios de delivery en
              la región, reconocida por nuestra innovación y excelencia en el
              servicio al cliente. Aspiramos a expandir nuestras operaciones y
              ofrecer soluciones de entrega que se adapten a las necesidades
              cambiantes de nuestros clientes, contribuyendo al desarrollo
              sostenible de las comunidades que servimos.
            </p>
          </div>
          <div className="icono">
            <h3>Propósito</h3>
            <p>
              Estamos comprometidos a proporcionar un servicio de alta calidad,
              priorizando la satisfacción del cliente en cada entrega. Valoramos
              a nuestro equipo y fomentamos un ambiente de trabajo inclusivo y
              motivador. Además, nos comprometemos a operar de manera
              responsable, minimizando nuestro impacto ambiental y apoyando
              iniciativas locales que beneficien a la comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Valores */}
      <section className="valores">
        <h2>Valores</h2>
        <ul>
          <li>Integridad</li>
          <li>Compromiso</li>
          <li>Innovación</li>
          <li>Respeto</li>
          <li>Trabajo en equipo</li>
        </ul>
      </section>
    </div>
  );
};

export default QuinenesSomos;

import React, { useState, useEffect } from 'react';
import { ChevronDown, Leaf, Recycle, AlertTriangle, Globe, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { datosEcologicos } from '../data/mock';

const PaginaPrincipal = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionVisible, setSeccionVisible] = useState({});
  const [enLinea, setEnLinea] = useState(navigator.onLine);

  // Bloquear herramientas de desarrollo
  useEffect(() => {
    const bloquearDevTools = () => {
      // Detectar si las DevTools están abiertas
      let devtools = { open: false, orientation: null };
      const threshold = 160;

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true;
            alert('🚫 Inspección bloqueada por el mejor estudiante del ITQ 🚫');
            window.location.reload();
          }
        } else {
          devtools.open = false;
        }
      }, 500);

      // Bloquear teclas F12, Ctrl+Shift+I, Ctrl+U, etc.
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
          alert('🚫 Inspección bloqueada por el mejor estudiante del ITQ 🚫');
        }
      });

      // Bloquear clic derecho
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('🚫 Inspección bloqueada por el mejor estudiante del ITQ 🚫');
      });
    };

    bloquearDevTools();
  }, []);

  // Detectar estado de conexión a internet
  useEffect(() => {
    const manejarEstadoConexion = () => {
      setEnLinea(navigator.onLine);
    };

    window.addEventListener('online', manejarEstadoConexion);
    window.addEventListener('offline', manejarEstadoConexion);

    return () => {
      window.removeEventListener('online', manejarEstadoConexion);
      window.removeEventListener('offline', manejarEstadoConexion);
    };
  }, []);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          setSeccionVisible(prev => ({
            ...prev,
            [entrada.target.id]: entrada.isIntersecting
          }));
        });
      },
      { threshold: 0.3 }
    );

    const secciones = document.querySelectorAll('.seccion-animada');
    secciones.forEach(seccion => observador.observe(seccion));

    return () => observador.disconnect();
  }, []);

  const navegarA = (seccionId) => {
    document.getElementById(seccionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setMenuAbierto(false);
  };

  // Mostrar mensaje cuando no hay internet
  if (!enLinea) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <WifiOff className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sin conexión</h2>
          <p className="text-gray-600 text-lg">Se volvió a caer el EVA :c</p>
          <p className="text-sm text-gray-500 mt-2">Verifica tu conexión a internet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      {/* Cabecera con menú */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-green-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-800">EcoConciencia Verde ITQ</span>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="flex items-center space-x-2 text-green-700 hover:text-white hover:bg-green-600"
            >
              <span>Menú</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${menuAbierto ? 'rotate-180' : ''}`} />
            </Button>
            
            {menuAbierto && (
              <div className="absolute right-0 mt-2 w-48 bg-green-600 rounded-lg shadow-lg border border-green-700 py-2">
                {datosEcologicos.menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navegarA(item.id)}
                    className="w-full text-left px-4 py-3 text-white hover:bg-green-700 transition-colors font-medium"
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Sección Hero */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${datosEcologicos.imagenHero})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-6 animate-fade-in-up texto-con-sombra" style={{
            fontFamily: 'Impact, Arial Black, sans-serif',
            textShadow: '4px 4px 8px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,0.5)',
            letterSpacing: '2px'
          }}>
            ITQ ECOCONCIENCIA VERDE
          </h1>
          <p className="text-xl md:text-2xl animate-fade-in-up animation-delay-300 font-semibold" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}>
            Juntos por un planeta más limpio y sostenible
          </p>
        </div>
      </section>

      {/* Sección: Por qué son problema los plásticos */}
      <section className={`seccion-animada py-20 bg-white ${seccionVisible['problema-plasticos'] ? 'animate-slide-in-left' : 'opacity-0'}`} id="problema-plasticos">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <h2 className="text-4xl font-bold text-gray-800">¿Por qué son un problema?</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {datosEcologicos.problemaPlasticos.descripcion}
              </p>
              <div className="space-y-4">
                {datosEcologicos.problemaPlasticos.puntos.map((punto, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">{punto}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={datosEcologicos.problemaPlasticos.imagen}
                alt="Problema de plásticos"
                className="w-full h-96 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Primer Video */}
      <section id="video" className={`seccion-animada py-20 bg-gradient-to-r from-blue-50 to-cyan-50 ${seccionVisible['video'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Conoce más sobre el impacto</h2>
            <p className="text-lg text-gray-600">Un video que cambiará tu perspectiva</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <iframe
                src={datosEcologicos.primerVideo.url}
                className="w-full h-full"
                allowFullScreen
                title="Video sobre reciclaje"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Impacto Ambiental */}
      <section id="impacto" className={`seccion-animada py-20 bg-green-50 ${seccionVisible['impacto'] ? 'animate-slide-in-right' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative md:order-2">
              <img 
                src={datosEcologicos.impactoAmbiental.imagen}
                alt="Impacto ambiental"
                className="w-full h-96 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="md:order-1">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-8 w-8 text-blue-500" />
                <h2 className="text-4xl font-bold text-gray-800">Impacto Ambiental</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {datosEcologicos.impactoAmbiental.descripcion}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {datosEcologicos.impactoAmbiental.estadisticas.map((stat, index) => (
                  <Card key={index} className="bg-white/70 hover:bg-white/90 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{stat.numero}</div>
                      <div className="text-sm text-gray-600">{stat.descripcion}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Rechazar */}
      <section className={`seccion-animada py-20 bg-red-50 ${seccionVisible['rechazar'] ? 'animate-slide-in-left' : 'opacity-0'}`} id="rechazar">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <h2 className="text-4xl font-bold text-gray-800">Rechazar</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {datosEcologicos.rechazar.descripcion}
              </p>
              <div className="space-y-4">
                {datosEcologicos.rechazar.acciones.map((accion, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">{accion}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={datosEcologicos.rechazar.imagen}
                alt="Rechazar plásticos"
                className="w-full h-96 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Reutilizar */}
      <section className={`seccion-animada py-20 bg-yellow-50 ${seccionVisible['reutilizar'] ? 'animate-slide-in-right' : 'opacity-0'}`} id="reutilizar">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative md:order-2">
              <img 
                src={datosEcologicos.reutilizar.imagen}
                alt="Reutilizar plásticos"
                className="w-full h-96 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="md:order-1">
              <div className="flex items-center space-x-3 mb-6">
                <Recycle className="h-8 w-8 text-yellow-600" />
                <h2 className="text-4xl font-bold text-gray-800">Reutilizar</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {datosEcologicos.reutilizar.descripcion}
              </p>
              <div className="space-y-4">
                {datosEcologicos.reutilizar.ideas.map((idea, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <p className="text-gray-600">{idea}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Reciclar */}
      <section className={`seccion-animada py-20 bg-green-50 ${seccionVisible['reciclar'] ? 'animate-slide-in-left' : 'opacity-0'}`} id="reciclar">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Recycle className="h-8 w-8 text-green-600" />
                <h2 className="text-4xl font-bold text-gray-800">Reciclar</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {datosEcologicos.reciclar.descripcion}
              </p>
              <div className="space-y-4">
                {datosEcologicos.reciclar.pasos.map((paso, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-600">{paso}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={datosEcologicos.reciclar.imagen}
                alt="Reciclar plásticos"
                className="w-full h-96 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Segundo Video */}
      <section className={`seccion-animada py-20 bg-gradient-to-r from-green-50 to-emerald-50 ${seccionVisible['segundo-video'] ? 'animate-fade-in' : 'opacity-0'}`} id="segundo-video">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Soluciones en acción</h2>
            <p className="text-lg text-gray-600">Descubre cómo puedes hacer la diferencia</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <iframe
                src={datosEcologicos.segundoVideo.url}
                className="w-full h-full"
                allowFullScreen
                title="Video sobre soluciones"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sección QR Final */}
      <section id="qr" className={`seccion-animada py-20 bg-white ${seccionVisible['qr'] ? 'animate-zoom-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Únete al cambio</h2>
          <p className="text-lg text-gray-600 mb-8">Escanea o dale Click y ayúdanos en una encuesta</p>
          <div className="flex justify-center">
            <img 
              src={datosEcologicos.imagenQR}
              alt="Código QR"
              className="w-64 h-64 object-contain cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg rounded-2xl"
              onClick={() => window.open(datosEcologicos.enlaceQR, '_blank')}
            />
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-green-400" />
            <span className="text-lg font-semibold">EcoConciencia Verde ITQ</span>
          </div>
          <p className="text-gray-400">
            © 2025 ITQ EcoConciencia Verde. Todos los derechos reservados. 
            Comprometidos con un futuro sostenible.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaginaPrincipal;
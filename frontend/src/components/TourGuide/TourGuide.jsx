import { useEffect, useContext } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './TourGuide.css';
import { StoreContext } from '../../context/StoreContext';

export const useTourGuide = () => {
  const { token } = useContext(StoreContext);

  const startTour = () => {
    // Detectar si es móvil (menos de 750px)
    const isMobile = window.innerWidth <= 750;

    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: 'Siguiente →',
      prevBtnText: '← Anterior',
      doneBtnText: '¡Empezar a Ordenar! ✨',
      closeBtnText: 'Omitir Tour',
      progressText: 'Paso {{current}} de {{total}}',
      allowClose: true,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      animate: true,
      smoothScroll: true,
      onDestroyed: () => {
        localStorage.setItem('tourCompleted', 'true');
      },
      steps: [
        // PASO 1: Bienvenida
        {
          element: '.logo',
          popover: {
            title: '👋 ¡Bienvenido a Golden Fork!',
            description: 'Te guiaremos rápidamente por las funciones principales de nuestra app. ¡Solo tomará un momento!',
            side: 'bottom',
            align: 'start'
          }
        },
        // PASO 2: Navegación del Menú (solo en desktop)
        ...(isMobile ? [] : [{
          element: '.navbar-menu',
          popover: {
            title: '🍴 Navegación Principal',
            description: `Usa estos links para moverte por la app:
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><strong>Inicio</strong> - Página principal</li>
              <li><strong>Menú</strong> - Explora nuestros platos</li>
              <li><strong>App</strong> - Descarga nuestra app móvil</li>
              <li><strong>Contactanos</strong> - Ponte en contacto</li>
            </ul>`,
            side: 'bottom',
            align: 'center'
          }
        }]),
        // PASO 3: Búsqueda de Platos
        {
          element: '#search-icon',
          popover: {
            title: '🔍 Buscar Platos',
            description: '¿Sabes qué quieres comer? ¡Búscalo aquí! Busca por nombre, descripción o categoría para encontrar rápidamente tus platos favoritos.',
            side: 'bottom',
            align: 'center'
          }
        },
        // PASO 4: Tema Claro/Oscuro
        {
          element: '#theme-switch',
          popover: {
            title: '🌙 Modo Oscuro / ☀️ Modo Claro',
            description: 'Cambia entre temas según tu preferencia. ¡Protege tus ojos en la noche o disfruta de un diseño brillante durante el día!',
            side: 'bottom',
            align: 'center'
          }
        },
        // PASO 5: Carrito de Compras
        {
          element: '.navbar-search-icon',
          popover: {
            title: '🛒 Tu Carrito',
            description: 'Aquí verás tus productos agregados. El punto rojo indica cuántos items tienes. Haz clic para revisar y proceder al pago.',
            side: 'bottom',
            align: 'end'
          }
        },
        // PASO 6: Categorías del Menú
        {
          element: '#explore-menu',
          popover: {
            title: '📋 Explora Nuestro Menú',
            description: 'Filtra los platos por categoría: Ensaladas, Rollos, Postres, Sándwiches, etc. Haz clic en una categoría para ver solo esos platos.',
            side: 'bottom',
            align: 'center'
          }
        },
        // PASO 7: Agregar al Carrito
        {
          element: '.food-item',
          popover: {
            title: '➕ Agregar Platos',
            description: 'Haz clic en el botón "+" para agregar un plato a tu carrito. Verás controles para aumentar, disminuir o eliminar la cantidad.',
            side: 'top',
            align: 'center'
          }
        },
        // PASO 8: Hacer un Pedido
        {
          element: '.navbar-search-icon',
          popover: {
            title: '💳 Realizar tu Pedido',
            description: `Sigue estos pasos para ordenar:
            <ol style="margin: 10px 0; padding-left: 20px;">
              <li>Agrega platos al carrito</li>
              <li>Haz clic en el carrito 🛒</li>
              <li>Revisa tu orden</li>
              <li>Procede al checkout</li>
              <li>¡Disfruta tu comida!</li>
            </ol>`,
            side: 'bottom',
            align: 'end'
          }
        },
        // PASO 9: My Orders (condicional)
        ...(token ? [{
          element: '.navbar-profile',
          popover: {
            title: '📦 Mis Pedidos',
            description: 'Desde tu perfil puedes ver el historial de tus órdenes, el estado actual de entrega y detalles de cada pedido con rastreo en tiempo real.',
            side: 'bottom',
            align: 'end'
          }
        }] : [{
          element: '.navbar-right button',
          popover: {
            title: '🔐 Crea tu Cuenta',
            description: `Para hacer pedidos y ver tu historial:
            <ol style="margin: 10px 0; padding-left: 20px;">
              <li>Haz clic en "Sign In"</li>
              <li>Crea tu cuenta o inicia sesión</li>
              <li>¡Empieza a ordenar!</li>
            </ol>`,
            side: 'bottom',
            align: 'end'
          }
        }]),
        // PASO 10: Finalización
        {
          popover: {
            title: '🎉 ¡Listo para Ordenar!',
            description: `Ya conoces todas las funciones principales. ¿Tienes hambre? ¡Empieza a explorar nuestro delicioso menú!
            <br/><br/>
            <small style="color: var(--text-secondary);">💡 Tip: Puedes volver a ver este tour haciendo clic en el botón ❓ del navbar.</small>`,
            side: 'center',
            align: 'center'
          }
        }
      ]
    });

    driverObj.drive();
  };

  // Verificar si es la primera visita
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('tourCompleted');
    
    if (!hasSeenTour) {
      // Esperar un poco para que la página cargue completamente
      const timer = setTimeout(() => {
        startTour();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [token]);

  return { startTour };
};

export default useTourGuide;

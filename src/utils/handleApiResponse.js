// utils/handleApiResponse.js

import { toast } from 'react-toastify'; // Importamos la librería react-toastify para mostrar notificaciones

const handleApiResponse = (responseCode) => {
  switch (responseCode) {
    case 200:
      // No se requiere ninguna acción adicional
      break;
    case 401:
      toast.error('La clave API es incorrecta');
      break;
    case 400:
      toast.error('Los parámetros enviados son incorrectos');
      break;
    default:
      toast.error('Ocurrió un error inesperado');
  }
};

export default handleApiResponse;
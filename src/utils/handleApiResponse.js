// utils/handleApiResponse.js
import { toast } from 'react-toastify';

const handleApiResponse = (responseCode, message = '') => {
  switch (responseCode) {
    case 200:
    case 201:
      toast.success(message || 'Operación exitosa');
      break;
    case 204:
      toast.info(message || 'Operación exitosa');
      break;
    case 400:
      toast.error(message || 'Solicitud incorrecta');
      break;
    case 401:
      toast.error(message || 'No autorizado');
      break;
    case 404:
      toast.error(message || 'Recurso no encontrado');
      break;
    case 500:
      toast.error(message || 'Error del servidor');
      break;
    default:
      toast.error(message || 'Error desconocido');
  }
};

export default handleApiResponse;
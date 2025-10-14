import axiosClient from './axiosClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// If you don't want to use hook here, you can export a function that accepts navigate.
export function setupAuthInterceptors(navigate) {
  // to prevent multiple toasts
  let shownToast = false;

  axiosClient.interceptors.response.use(
    res => res,
    error => {
      const status = error?.response?.status;
      const data = error?.response?.data || {};

      // Server indicated TOKEN_EXPIRED
      if (status === 401 && data.error === 'TOKEN_EXPIRED') {
        if (!shownToast) {
          shownToast = true;
          toast.info('Session expired — kripya dobara login karein', {
            autoClose: 4000,
            onClose: () => { shownToast = false; }
          });
        }

        // Clear local auth state then redirect
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // if you store other auth flags, clear them too

        // navigate to login after small delay so user sees toast
        setTimeout(() => navigate('/login'), 600); // 600ms; adjust as needed

        return Promise.reject(error);
      }

      // generic unauthorized (invalid/missing token)
      if (status === 401 && !data.error) {
        if (!shownToast) {
          shownToast = true;
          toast.warn('Unauthorized — please login again', { autoClose: 4000, onClose: () => { shownToast = false }});
        }
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 600);
      }

      return Promise.reject(error);
    }
  );
}

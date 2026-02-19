
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: false
});

export default Toast;

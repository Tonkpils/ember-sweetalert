import { Promise } from 'rsvp';
import Swal from 'sweetalert2';

export default function(...args) {
  return new Promise((resolve, reject) => {
    Swal(...args).then(resolve, reject);
  });
}

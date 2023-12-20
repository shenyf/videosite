import { boot } from 'quasar/wrappers'
import { Notify} from 'quasar';

const error = (msg, html) => Notify.create({
  message: msg,
  timeout: 5000,
  html: !!html,
  color: 'negative',
});
const info = (msg, html) => Notify.create({
  message: msg,
  html: !!html,
  color: 'positive',
});
const warn = (msg, html) => Notify.create({
  message: msg,
  html: !!html,
  color: 'warning',
});
const retMsg = (r) => {
  if (r.success) {
    info(r.message);
  } else {
    error(r.message);
  }
};
// console.log(Vue, '<<<<<<<<<<<<<')
// Quasar.prototype.$info = info;
// Quasar.prototype.$warn = warn;
// Quasar.prototype.$error = error;
// Quasar.prototype.$retMsg = retMsg;

export default boot(async (/* { app, router, ... } */) => {
  // something to do
})

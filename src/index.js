import app from './app.js'
import { PORT } from './config.js'


const loginRoutes = require('./routes/login-routes');
app.use('/api', loginRoutes);

app.listen(PORT)
console.log('consola se esta ejecutando desde el puerto', PORT)



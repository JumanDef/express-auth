/* Local dependencies */
import App from './app';
import AuthRoute from './routes/auth.route';
import FileRoute from './routes/file.route';

const app = new App([new AuthRoute(), new FileRoute()]);

app.listen();

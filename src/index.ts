import { config } from 'dotenv';
import App from './app';
import NotionController from './notion/notion-controller';

config();

const app = new App([new NotionController()]);

app.listen();

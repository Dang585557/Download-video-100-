import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import getVideo from './api/getVideo.js';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/getVideo', getVideo);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

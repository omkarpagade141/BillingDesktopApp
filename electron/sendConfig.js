import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { log } from 'console';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendConfig = async () => {
    console.log('@@@@@@@ 1111');
  try {
    console.log('@@@@@@@ 22222');
    const configPath = path.join(__dirname, 'config.json');
    console.log('@@@@@@ 333333');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    console.log('@@@@@@@@ 44444');

    // Send configuration to the backend
    const response = await axios.post('http://localhost:8080/configapi/config', config, {
      headers: {
        'Content-Type': 'application/json',
      },
       
    });
    console.log('@@@ response',response);

    console.log('Config sent successfully:', response.data);
  } catch (error) {
    console.log('@@@@@@@@@',error);
    console.error('Error sending config:', error);
  }
};

export default sendConfig;

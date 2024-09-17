// Importa Sequelize y dotenv
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

// Crea la instancia de Sequelize usando las variables de entorno
export const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,        // Nombre de la base de datos
  process.env.POSTGRES_USER,        // Usuario
  process.env.POSTGRES_PASSWORD,    // Contraseña
  {
    host: process.env.POSTGRES_HOST.split(':')[0], // Host (sin el puerto)
    port: process.env.POSTGRES_HOST.split(':')[1], // Puerto
    dialect: 'postgres',                     // Dialecto que estás usando
    dialectOptions: {
      ssl: {
        require: true,                      // Requiere SSL
        rejectUnauthorized: false           // Evitar el rechazo de certificados no autorizados
      }
    }
  }
);

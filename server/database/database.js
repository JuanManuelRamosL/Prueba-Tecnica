// Importa Sequelize y dotenv
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

// Crea la instancia de Sequelize usando las variables de entorno
export const sequelize = new Sequelize(
  process.env.DB_NAME,        // Nombre de la base de datos
  process.env.DB_USER,        // Usuario
  process.env.DB_PASSWORD,    // Contraseña
  {
    host: process.env.DB_HOST.split(':')[0], // Host
    port: process.env.DB_HOST.split(':')[1], // Puerto
    dialect: 'postgres'                      // Dialecto que estás usando
  }
);



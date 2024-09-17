# Prueba-Tecnica

# Proyecto de Gestión de Productos

Este es un proyecto web para gestionar productos, con un front-end construido en Next.js y un back-end en Node.js con Express y Sequelize, que interactúa con una base de datos PostgreSQL.

## Contenido

1. [Requisitos previos](#requisitos-previos)
2. [Instalación y configuración](#instalación-y-configuración)
3. [Levantar el proyecto](#levantar-el-proyecto)
    - [Front-end](#front-end)
    - [Back-end](#back-end)

---

## Requisitos previos

Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:

- [Node.js](https://nodejs.org/) v14 o superior
- [PostgreSQL](https://www.postgresql.org/) v12 o superior
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación y configuración

1. **Clona el repositorio en tu máquina local:**

   ```bash
   git clone https://github.com/JuanManuelRamosL/Prueba-Tecnica.git
   cd Prueba tecnica
   cd front
   npm install

   ..cd server
   npm install
2. **Condigura el servidor :**
   dejar el .env con las variables para la configuracion de la base de datos postgre desplegada, o crear una base de datos local postgre v12 o mas y remplazar las variables con tus datos 
   personales 

3. **Levantar el server**
   ```bash
   npm start

4.  **Levantar el Front**
   ```bash
   ..cd front
    npm run dev
```
Back End corriendo en puerto : http://localhost:3001
Front End corriendo en puerto : http://localhost:3000

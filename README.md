# Todo App Web - Aplicación Fullstack

Este proyecto es una aplicación web de lista de tareas ("Todo App") desarrollada por [Jose Martinez](https://josecito.dev), utilizando un stack de tecnologías modernas para ofrecer una experiencia fluida y dinámica. Incluye tanto el backend (API REST) como el frontend, y permite la gestión de tareas de forma sencilla y eficiente.

## Tabla de Contenidos
- [Instalación](#instalación)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Dependencias](#dependencias)
  - [Frontend](#frontend-dependencies)
  - [Backend](#backend-dependencies)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Portafolio](#portafolio)

## Instalación

### Requisitos previos
Para correr esta aplicación, necesitarás tener instalados los siguientes programas:
- [Node.js](https://nodejs.org/) (Versión recomendada: LTS)
- Un navegador web actualizado (Google Chrome, Firefox, etc.)

### Backend

1. Desde la raíz del proyecto, navega a la carpeta del backend:
    ```bash
    cd api
    ```

2. Instala las dependencias del backend:
    ```bash
    npm install
    ```

3. Inicia el servidor backend en modo desarrollo:
    ```bash
    npm run dev
    ```
   Esto ejecutará el servidor en `http://localhost:3000`.

### Frontend

1. Desde la raíz del proyecto, navega a la carpeta del frontend:
    ```bash
    cd todo-app-web
    ```

2. Instala las dependencias del frontend:
    ```bash
    npm install
    ```

3. Inicia el servidor frontend:
    ```bash
    npm run dev
    ```
   La aplicación se ejecutará en una dirección local que aparecerá en la terminal (por ejemplo, `http://localhost:3000`).

## Dependencias

### Frontend Dependencies

- **Axios**: Cliente HTTP basado en promesas que facilita la interacción con APIs. Utilizado para hacer peticiones HTTP y consumir el backend.
  
- **Framer Motion**: Librería de animaciones para React que permite crear transiciones y gestos de manera fluida y declarativa.

- **React-Router-DOM**: Sistema de enrutamiento para aplicaciones React de una sola página (SPA). Permite crear rutas dinámicas y vistas anidadas.

- **Tailwind CSS**: Framework de CSS utilitario para estilizar la interfaz de usuario de manera rápida y eficiente. Facilita la creación de componentes con un diseño moderno.

- **Tempo.js**: Utilizado para el manejo y la manipulación de fechas, proporcionando una interfaz fácil para presentar las fechas de una manera más legible y humana.

- **React-hot-toast**: Librería para mostrar notificaciones en tiempo real. Ideal para alertas de éxito, error o cualquier otro mensaje emergente.

- **Lucide Icons**: Colección de iconos simples y elegantes, usados para mejorar la interfaz de usuario con elementos visuales intuitivos.

### Backend Dependencies

- **Express**: Framework minimalista para construir servidores web en Node.js. Utilizado para manejar las rutas y la lógica de la API REST.

- **bcrypt**: Librería para encriptación de contraseñas. Se utiliza para proteger los datos de los usuarios mediante hashing seguro.

- **CORS (Cross-Origin Resource Sharing)**: Middleware utilizado para permitir o restringir peticiones HTTP entre dominios diferentes, facilitando la comunicación entre el frontend y el backend.

- **UUID**: Generador de identificadores únicos universales, utilizado para crear IDs únicos y seguros para los elementos como tareas o usuarios.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Express**: Framework para desarrollar APIs REST con Node.js.
- **Tailwind CSS**: Framework de CSS para estilizar la aplicación.
- **Framer Motion**: Biblioteca de animación para mejorar la interactividad de la app.

## Portafolio

Puedes ver otros proyectos de [Jose Martinez aquí](https://josecito.dev).

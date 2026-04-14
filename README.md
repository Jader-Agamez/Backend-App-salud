# 🏥 Salud App — Backend

API REST desarrollada con **Node.js + Express + MySQL** que permite encontrar hospitales según la EPS, especialista y nivel de complejidad del usuario.

---

## 📁 Estructura del proyecto

```
salud-backend/
├── index.js          # Servidor principal
├── db.js             # Conexión a MySQL
├── routes/
│   ├── eps.js        # Ruta GET /api/eps
│   ├── especialistas.js  # Ruta GET /api/especialistas
│   └── hospitales.js # Ruta GET /api/hospitales
├── package.json
└── README.md
```

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [MySQL](https://www.mysql.com/) (MySQL Workbench o XAMPP)

---

## 🚀 Instalación

**1. Instalar dependencias**
```bash
cd salud-backend
npm install
```

**2. Configurar la base de datos**

Abre MySQL Workbench, ve a **File → Open SQL Script**, selecciona el archivo `database.sql` ubicado en la raíz del proyecto y ejecuta con `Ctrl + Shift + Enter`.

**3. Configurar la conexión en `db.js`**
```js
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'tu_contraseña',
  database: 'salud_app'
})
```

**4. Correr el servidor**
```bash
node index.js
```

El servidor quedará corriendo en `http://localhost:3000`

---

## 📡 Endpoints

### GET `/api/eps`
Retorna todas las EPS con su régimen y NIT.

**Respuesta:**
```json
[
  { "id": 1, "nombre": "Aliansalud EPS", "nit": "830113831", "regimen": "Contributivo" },
  { "id": 11, "nombre": "Coosalud EPS", "nit": "900226715", "regimen": "Subsidiado" }
]
```

---

### GET `/api/especialistas`
Retorna todos los especialistas disponibles.

**Respuesta:**
```json
[
  { "id": 1, "nombre": "Medicina General" },
  { "id": 3, "nombre": "Oftalmología" }
]
```

---

### GET `/api/hospitales`
Busca hospitales según EPS, especialista y nivel de complejidad.

**Parámetros query:**

| Parámetro        | Tipo | Requerido | Descripción                          |
|------------------|------|-----------|--------------------------------------|
| `eps_id`         | int  | ✅        | ID de la EPS del usuario             |
| `especialista_id`| int  | ✅        | ID del especialista que necesita     |
| `nivel_max`      | int  | ❌        | Nivel máximo del hospital (1-4). Por defecto 4 |

**Ejemplo:**
```
GET http://localhost:3000/api/hospitales?eps_id=11&especialista_id=2&nivel_max=3
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Hospital General de Medellín",
    "nivel": 3,
    "direccion": "Calle 24 # 48-30, Medellín",
    "telefono": "4441333"
  }
]
```

---

## 🗄️ Base de datos

### Tablas

| Tabla                  | Descripción                                      |
|------------------------|--------------------------------------------------|
| `eps`                  | EPS con nombre, NIT y régimen                    |
| `hospitales`           | Hospitales con nombre, nivel, dirección y teléfono |
| `especialistas`        | Especialidades médicas disponibles               |
| `hospital_eps`         | Relación entre hospitales y EPS (convenios)      |
| `hospital_especialista`| Relación entre hospitales y especialistas        |

### Niveles de complejidad

| Nivel | Descripción         | Ejemplo                        |
|-------|---------------------|--------------------------------|
| 1     | Básico              | Metrosalud, centros de salud   |
| 2     | Intermedio          | Clínicas pequeñas              |
| 3     | Alta complejidad    | Hospital General de Medellín   |
| 4     | Máxima complejidad  | Hospital Pablo Tobón, San Vicente |

---

## 📦 Dependencias

| Paquete   | Versión  | Uso                        |
|-----------|----------|----------------------------|
| express   | ^5.2.1   | Servidor HTTP              |
| mysql2    | ^3.20.0  | Conexión a MySQL           |
| cors      | ^2.8.6   | Permitir peticiones del frontend |

---

## 🔧 Scripts

```bash
npm start   # Corre el servidor con node
npm run dev # Corre el servidor con nodemon (recarga automática)
```

> Para usar `npm run dev` instala nodemon: `npm install -g nodemon`

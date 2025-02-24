CREATE DATABASE soluciones_vecinales;

\c soluciones_vecinales

CREATE TYPE estado_solicitud AS ENUM("pendiente", "aprobada", "denegada");
CREATE TYPE estado_incidencia AS ENUM("creada", "procesandose", "finalizada");
CREATE TYPE userRol AS ENUM("inquilino", "administrador", "webAdmin");

CREATE TABLE comunidad(
    id_comunidad INT primary key GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    calle VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    pais VARCHAR(50) NOT NULL

);

CREATE TABLE usuario(
    correo VARCHAR(60) PRIMARY KEY,
    rol userRol NOT NULL,
    nombre_usuario VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(255,
    calle VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    piso INTm
    letra CHAR(1)
);

CREATE TABLE credenciales(
    correo_usuario VARCHAR(255) REFERENCES usuario ON DELETE CASCADE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (correo_usuario)
)

CREATE TABLE mensaje(
    timestamp TIMESTAMP,
    comunidad INTEGER REFERENCES comunidad ON DELETE CASCADE,
    PRIMARY KEY (timestamp, comunidad)
)

CREATE TABLE zona_comun(
    nombre VARCHAR(255),
    comunidad INT REFERENCES comunidad ON DELETE CASCADE,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255),
    horario_inicio TIME NOT NULL,
    horario_fin TIME NOT NULL,
    PRIMARY KEY (nombre, comunidad)
)

CREATE TABLE incidencia(
    comunidad INT REFERENCES comunidad ON DELETE CASCADE,
    usuario VARCHAR(255) REFERENCES usuario ON DELETE CASCADE,
    fecha timestamp NOT NULL,
    descripcion TEXT NOT NULL,
    estado estado_solicitud NOT NULL,
    PRIMARY KEY (comunidad, usuario, fecha)
)

CREATE TABLE reserva(
    usuario VARCHAR(255) REFERENCES usuario ON DELETE CASCADE,
    zona VARCHAR(255) REFERENCES zona (nombre) ON DELETE CASCADE,
    comunidad INT REFERENCES comunidad,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    PRIMARY KEY (comunidad, usuario fecha)
)

CREATE TABLE incripcion(
    usuario VARCHAR(255) REFERENCES usuario ON DELETE CASCADE, 
    comunidad INT REFERENCES comunidad ON DELETE CASCADE,
    PRIMARY KEY (usuario, comunidad)
)

CREATE TABLE solicitud(
    usuario VARCHAR(255) REFERENCES usuario ON DELETE CASCADE, 
    comunidad INT REFERENCES comunidad ON DELETE CASCADE,
    estado estado_solicitud NOT NULL
    PRIMARY KEY (usuario, comunidad)
)





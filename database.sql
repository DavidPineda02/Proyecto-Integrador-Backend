-- ============================================================
--  Base de datos: tasks_manager_group3
-- ============================================================

CREATE DATABASE IF NOT EXISTS tasks_manager_group3;
USE tasks_manager_group3;

-- ------------------------------------------------------------
--  Tabla: users
-- ------------------------------------------------------------
CREATE TABLE users (
    id          VARCHAR(20)                                         NOT NULL,
    firstName   VARCHAR(100)                                        NOT NULL,
    lastName    VARCHAR(100)                                        NOT NULL,
    email       VARCHAR(255)                                        NOT NULL UNIQUE,
    status      ENUM('activo','inactivo','suspendido','eliminado')  NOT NULL DEFAULT 'activo',
    role        ENUM('admin','usuario')                             NOT NULL DEFAULT 'usuario',
    password    VARCHAR(255)                                        NOT NULL,
    createdAt   DATETIME                                            NOT NULL,
    updatedAt   DATETIME                                            NOT NULL,
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
--  Tabla: tasks
-- ------------------------------------------------------------
CREATE TABLE tasks (
    id          VARCHAR(20)                                         NOT NULL,
    title       VARCHAR(255)                                        NOT NULL,
    description TEXT                                                NOT NULL DEFAULT '',
    status      ENUM('pendiente','en progreso','completada')        NOT NULL DEFAULT 'pendiente',
    priority    ENUM('baja','media','alta')                         NOT NULL DEFAULT 'media',
    createdAt   DATETIME                                            NOT NULL,
    updatedAt   DATETIME                                            NOT NULL,
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
--  Tabla: task_users  (relacion N:M entre tasks y users)
-- ------------------------------------------------------------
CREATE TABLE task_users (
    task_id     VARCHAR(20) NOT NULL,
    user_id     VARCHAR(20) NOT NULL,
    PRIMARY KEY (task_id, user_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)  ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)  ON DELETE CASCADE
);

-- ============================================================
--  Seed data: usuarios iniciales
-- ============================================================
INSERT INTO users (id, firstName, lastName, email, status, role, password, createdAt, updatedAt) VALUES
('1000000001', 'Carlos',    'Ramirez',   'carlos.ramirez@email.com',       'activo', 'admin',   'Admin12345', NOW(), NOW()),
('1000000002', 'Laura',     'Gomez',     'laura.gomez@email.com',          'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000003', 'Andres',    'Martinez',  'andres.martinez@email.com',      'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000004', 'Sofia',     'Lopez',     'sofia.lopez@email.com',          'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000005', 'Miguel',    'Torres',    'miguel.torres@email.com',        'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000006', 'Valentina', 'Hernandez', 'valentina.hernandez@email.com',  'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000007', 'Juan',      'Castro',    'juan.castro@email.com',          'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000008', 'Camila',    'Rojas',     'camila.rojas@email.com',         'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000009', 'Daniel',    'Morales',   'daniel.morales@email.com',       'activo', 'usuario', 'User12345',  NOW(), NOW()),
('1000000010', 'Paula',     'Vargas',    'paula.vargas@email.com',         'activo', 'usuario', 'User12345',  NOW(), NOW());

-- (La tabla tasks y task_users comienzan vacías, igual que en el store.js original)

-- ============================================================
--  Usuario de aplicacion para tasks_manager_group3
--  Uso local/desarrollo
-- ============================================================

CREATE DATABASE IF NOT EXISTS tasks_manager_group3;

CREATE USER IF NOT EXISTS 'task_manager_app'@'localhost'
IDENTIFIED BY 'TaskManager123!';

ALTER USER 'task_manager_app'@'localhost'
IDENTIFIED BY 'TaskManager123!';

GRANT ALL PRIVILEGES ON tasks_manager_group3.* TO 'task_manager_app'@'localhost';

FLUSH PRIVILEGES;

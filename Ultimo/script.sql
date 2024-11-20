--Creando Base de datos
CREATE DATABASE aingtel;

-- Crear la tabla Dealer
CREATE TABLE Dealer (
    ci INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone INT,
    address VARCHAR(255)
);

-- Crear la tabla Category
CREATE TABLE Category (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO Category (id, name) VALUES
(0, 'Categoría'),
(1, 'Videovigilancia'),
(2, 'Redes y Comunicaciones'),
(3, 'Seguridad Electrónica'),
(4, 'Sistemas Domóticos'),
(5, 'Sistemas para Energía y Respaldo'),
(6, 'Biométricos'),
(7, 'Sistemas Eléctricos');

-- Crear la tabla Product
CREATE TABLE Product (
    code VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category INT,
    cost FLOAT NOT NULL,
    price FLOAT NOT NULL,
    image VARCHAR(255),
    description VARCHAR(500),
    FOREIGN KEY (category) REFERENCES Category(id)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID único y autoincrementable
    username VARCHAR(100) NOT NULL UNIQUE, -- Nombre de usuario único
    password VARCHAR(255) NOT NULL, -- Contraseña encriptada
    rol VARCHAR(50) NOT NULL -- Rol del usuario
);

INSERT INTO User(username, password, rol) VALUES ('aingtelempresa@gmail.com', 'aingtelempresa','admin')
INSERT INTO User(username, password, rol) VALUES ('admin', 'admin','admin')

DELIMITER //
CREATE TRIGGER agregando_user
AFTER INSERT ON Dealer
FOR EACH ROW
BEGIN
    INSERT INTO User (username, password, rol)
    VALUES (NEW.email, NEW.password, 'dealer');
END;
//
DELIMITER ;

CREATE TABLE Quotation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dealer_email VARCHAR(100),
    buyer_name VARCHAR(100) NOT NULL,
    buyer_phone BIGINT,
    buyer_email VARCHAR(100),
    buyer_address VARCHAR(255),
    total_price FLOAT NOT NULL,
    quotation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dealer_email) REFERENCES user(username)
);
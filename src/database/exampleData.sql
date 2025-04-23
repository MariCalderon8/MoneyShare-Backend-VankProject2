-- Inserciones para la tabla "user"
INSERT INTO "user" (name, email, username, password, tel) VALUES
('Juan Pérez', 'juan.perez@email.com', 'juanp', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491122334455'),
('María González', 'maria.gonzalez@email.com', 'mariag', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491123456789'),
('Carlos Rodríguez', 'carlos.rodriguez@email.com', 'carlosr', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491187654321'),
('Ana Martínez', 'ana.martinez@email.com', 'anam', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491156789012'),
('Luis Sánchez', 'luis.sanchez@email.com', 'luiss', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491198765432'),
('Paula López', 'paula.lopez@email.com', 'paulal', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491145678901'),
('Diego Fernández', 'diego.fernandez@email.com', 'diegof', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491132109876'),
('Sofía Torres', 'sofia.torres@email.com', 'sofiat', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491167890123'),
('Roberto García', 'roberto.garcia@email.com', 'robertog', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491143210987'),
('Laura Díaz', 'laura.diaz@email.com', 'laurad', '$2b$10$pj9rdQRFYtwujL3h9awRk.pTUxmIhnYg9DZ9JlQewgy44YIVTJryS', '+5491178901234');

-- Inserciones corregidas para la tabla "share"
INSERT INTO "share" (id_creator, code, type, name, description, amount, paid_amount, status, start_date, due_date, split_equally) VALUES
(1, 'TRIP2023', 'share_expense', 'Viaje a Bariloche', 'Gastos del viaje grupal a Bariloche', 12500.00, 12500.00, 'active', '2023-07-10 10:00:00', '2023-08-15 23:59:59', true),
(2, 'APTRENT', 'share_expense', 'Alquiler Departamento', 'Gastos mensuales del departamento compartido', 9000.00, 9000.00, 'completed', '2023-06-01 08:00:00', '2023-06-30 23:59:59', true),
(3, 'BDAYPARTY', 'share_expense', 'Fiesta de Cumpleaños', 'Gastos para la fiesta sorpresa de Ana', 5200.00, 5200.00, 'active', '2023-07-15 14:30:00', '2023-07-30 20:00:00', true),
(4, 'VACATION24', 'share_goal', 'Ahorro Vacaciones 2024', 'Fondo común para viaje a Brasil', 20000.00, 20000.00, 'active', '2023-06-15 09:00:00', '2023-12-31 23:59:59', true),
(5, 'CARPOOL23', 'share_expense', 'Gastos de Transporte', 'Gastos compartidos de combustible y peajes', 3600.00, 3600.00, 'completed', '2023-07-01 06:00:00', '2023-07-31 23:59:59', true),
(6, 'HOMETHEAT', 'share_goal', 'Sistema de Cine en Casa', 'Compra grupal de sistema de entretenimiento', 7500.00, 7500.00, 'active', '2023-07-20 15:00:00', '2023-09-30 23:59:59', true),
(7, 'LUNCH2023', 'share_expense', 'Almuerzos de Oficina', 'Rotación de pagos para almuerzos grupales', 4200.00, 4200.00, 'active', '2023-07-03 11:00:00', '2023-08-03 14:00:00', true),
(8, 'RENTDEBT', 'share_debt', 'Deuda de Alquiler', 'Préstamo para cubrir alquiler de julio', 6000.00, 2000.00, 'active', '2023-07-05 16:00:00', '2023-09-05 16:00:00', false),
(9, 'SPORTSEQ', 'share_expense', 'Equipamiento Deportivo', 'Compra grupal de equipo para fútbol 5', 4800.00, 4800.00, 'completed', '2023-06-10 17:30:00', '2023-07-10 17:30:00', true),
(10, 'COURSES24', 'share_goal', 'Cursos Online 2023', 'Suscripciones compartidas a plataformas educativas', 3600.00, 3600.00, 'active', '2023-07-12 20:00:00', '2023-10-12 20:00:00', true);

-- Inserciones para la tabla "expense"
-- Share 1: Viaje a Bariloche (total: 12500.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(1, 1, 4500.00, 'Transporte', '2023-07-10 12:30:00', 'Pasajes de avión ida y vuelta'),
(1, 3, 3200.00, 'Alojamiento', '2023-07-11 10:15:00', 'Reserva del hotel - 4 noches'),
(1, 2, 1800.00, 'Comidas', '2023-07-12 20:00:00', 'Cenas en restaurantes locales'),
(1, 1, 1500.00, 'Excursiones', '2023-07-13 09:30:00', 'Tour al Cerro Catedral'),
(1, 4, 1500.00, 'Excursiones', '2023-07-14 10:45:00', 'Excursión Circuito Chico');

-- Share 2: Alquiler Departamento (total: 9000.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(2, 2, 6000.00, 'Alquiler', '2023-06-01 09:00:00', 'Pago mensual de alquiler'),
(2, 5, 1500.00, 'Servicios', '2023-06-05 14:20:00', 'Pago de electricidad y agua'),
(2, 6, 1000.00, 'Servicios', '2023-06-10 11:30:00', 'Pago de internet y cable'),
(2, 2, 500.00, 'Insumos', '2023-06-15 18:45:00', 'Productos de limpieza y baño');

-- Share 3: Fiesta de Cumpleaños (total: 5200.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(3, 3, 2000.00, 'Lugar', '2023-07-15 15:00:00', 'Alquiler del salón'),
(3, 7, 1500.00, 'Comida', '2023-07-16 12:30:00', 'Catering para 20 personas'),
(3, 5, 800.00, 'Bebidas', '2023-07-17 16:45:00', 'Bebidas alcohólicas y no alcohólicas'),
(3, 3, 900.00, 'Decoración', '2023-07-18 10:00:00', 'Globos, guirnaldas y centro de mesa');

-- Share 4: Ahorro Vacaciones 2024 (total: 20000.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(4, 4, 12000.00, 'Ahorro', '2023-06-15 09:30:00', 'Depósito para reservas en Brasil'),
(4, 1, 8000.00, 'Ahorro', '2023-07-05 14:30:00', 'Segundo depósito para reservas');

-- Share 5: Gastos de Transporte (total: 3600.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(5, 5, 2200.00, 'Combustible', '2023-07-02 08:15:00', 'Cargas de combustible del mes'),
(5, 8, 1400.00, 'Peajes', '2023-07-15 17:30:00', 'Peajes acumulados del mes');

-- Share 6: Sistema de Cine en Casa (total: 7500.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(6, 6, 4500.00, 'Electrónica', '2023-07-20 16:00:00', 'Sistema de sonido para sala común'),
(6, 2, 3000.00, 'Electrónica', '2023-07-22 11:00:00', 'Proyector y pantalla');

-- Share 7: Almuerzos de Oficina (total: 4200.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(7, 7, 950.00, 'Comida', '2023-07-03 13:30:00', 'Almuerzo lunes - equipo completo'),
(7, 9, 850.00, 'Comida', '2023-07-10 12:45:00', 'Almuerzo lunes - equipo completo'),
(7, 1, 800.00, 'Comida', '2023-07-17 13:15:00', 'Almuerzo lunes - equipo completo'),
(7, 3, 900.00, 'Comida', '2023-07-24 12:30:00', 'Almuerzo lunes - equipo completo'),
(7, 5, 700.00, 'Comida', '2023-07-31 13:00:00', 'Almuerzo lunes - equipo completo');

-- Share 8: Deuda de Alquiler (total: 6000.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(8, 2, 6000.00, 'Préstamo', '2023-07-05 16:30:00', 'Préstamo para cubrir alquiler de julio');

-- Share 9: Equipamiento Deportivo (total: 4800.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(9, 9, 2800.00, 'Deportes', '2023-06-10 18:00:00', 'Camisetas y shorts para el equipo'),
(9, 10, 2000.00, 'Deportes', '2023-06-12 17:30:00', 'Balones y equipamiento de entrenamiento');

-- Share 10: Cursos Online 2023 (total: 3600.00)
INSERT INTO "expense" (id_share, id_user, amount, category, date, description) VALUES
(10, 10, 2400.00, 'Educación', '2023-07-12 20:30:00', 'Suscripción anual a Coursera'),
(10, 6, 1200.00, 'Educación', '2023-07-14 16:15:00', 'Suscripción anual a Udemy');

-- Inserciones para la tabla "share_split"
-- Share 1: Viaje a Bariloche (total: 12500.00, 4 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(1, 1, 25.00, 3125.00, 6000.00, 2875.00),    -- Juan pagó pasajes y excursión (6000), debe 3125 = balance +2875
(1, 2, 25.00, 3125.00, 1800.00, -1325.00),   -- María pagó comidas (1800), debe 3125 = balance -1325
(1, 3, 25.00, 3125.00, 3200.00, 75.00),      -- Carlos pagó hotel (3200), debe 3125 = balance +75
(1, 4, 25.00, 3125.00, 1500.00, -1625.00);   -- Ana pagó excursión (1500), debe 3125 = balance -1625

-- Share 2: Alquiler Departamento (total: 9000.00, 3 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(2, 2, 33.33, 3000.00, 6500.00, 3500.00),    -- María pagó alquiler y productos (6500), debe 3000 = balance +3500
(2, 5, 33.33, 3000.00, 1500.00, -1500.00),   -- Luis pagó servicios (1500), debe 3000 = balance -1500
(2, 6, 33.34, 3000.00, 1000.00, -2000.00);   -- Paula pagó internet (1000), debe 3000 = balance -2000

-- Share 3: Fiesta de Cumpleaños (total: 5200.00, 5 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(3, 3, 20.00, 1040.00, 2900.00, 1860.00),    -- Carlos pagó salón y decoración (2900), debe 1040 = balance +1860
(3, 5, 20.00, 1040.00, 800.00, -240.00),     -- Luis pagó bebidas (800), debe 1040 = balance -240
(3, 7, 20.00, 1040.00, 1500.00, 460.00),     -- Diego pagó catering (1500), debe 1040 = balance +460
(3, 8, 20.00, 1040.00, 0.00, -1040.00),      -- Sofía no ha pagado nada, debe 1040 = balance -1040
(3, 9, 20.00, 1040.00, 0.00, -1040.00);      -- Roberto no ha pagado nada, debe 1040 = balance -1040

-- Share 4: Ahorro Vacaciones 2024 (total: 20000.00, 4 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(4, 1, 25.00, 5000.00, 8000.00, 3000.00),    -- Juan hizo depósito (8000), debe 5000 = balance +3000
(4, 4, 25.00, 5000.00, 12000.00, 7000.00),   -- Ana hizo primer depósito (12000), debe 5000 = balance +7000
(4, 7, 25.00, 5000.00, 0.00, -5000.00),      -- Diego no ha pagado, debe 5000 = balance -5000
(4, 10, 25.00, 5000.00, 0.00, -5000.00);     -- Laura no ha pagado, debe 5000 = balance -5000

-- Share 5: Gastos de Transporte (total: 3600.00, 3 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(5, 5, 33.33, 1200.00, 2200.00, 1000.00),    -- Luis pagó combustible (2200), debe 1200 = balance +1000
(5, 8, 33.33, 1200.00, 1400.00, 200.00),     -- Sofía pagó peajes (1400), debe 1200 = balance +200
(5, 9, 33.34, 1200.00, 0.00, -1200.00);      -- Roberto no ha pagado, debe 1200 = balance -1200

-- Share 6: Sistema de Cine en Casa (total: 7500.00, 5 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(6, 2, 20.00, 1500.00, 3000.00, 1500.00),    -- María pagó proyector (3000), debe 1500 = balance +1500
(6, 4, 20.00, 1500.00, 0.00, -1500.00),      -- Ana no ha pagado, debe 1500 = balance -1500
(6, 6, 20.00, 1500.00, 4500.00, 3000.00),    -- Paula pagó sistema de sonido (4500), debe 1500 = balance +3000
(6, 8, 20.00, 1500.00, 0.00, -1500.00),      -- Sofía no ha pagado, debe 1500 = balance -1500
(6, 10, 20.00, 1500.00, 0.00, -1500.00);     -- Laura no ha pagado, debe 1500 = balance -1500

-- Share 7: Almuerzos de Oficina (total: 4200.00, 5 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(7, 1, 20.00, 840.00, 800.00, -40.00),       -- Juan pagó un almuerzo (800), debe 840 = balance -40
(7, 3, 20.00, 840.00, 900.00, 60.00),        -- Carlos pagó un almuerzo (900), debe 840 = balance +60
(7, 5, 20.00, 840.00, 700.00, -140.00),      -- Luis pagó un almuerzo (700), debe 840 = balance -140
(7, 7, 20.00, 840.00, 950.00, 110.00),       -- Diego pagó un almuerzo (950), debe 840 = balance +110
(7, 9, 20.00, 840.00, 850.00, 10.00);        -- Roberto pagó un almuerzo (850), debe 840 = balance +10

-- Share 8: Deuda de Alquiler (total: 6000.00), esto es un préstamo directo
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(8, 2, 0.00, 0.00, 6000.00, 6000.00),        -- María prestó el dinero, debe 0 = balance +6000
(8, 8, 100.00, 6000.00, 2000.00, -4000.00);  -- Sofía recibió el préstamo, debe 6000, pagó 2000 = balance -4000

-- Share 9: Equipamiento Deportivo (total: 4800.00, 6 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(9, 1, 16.67, 800.00, 0.00, -800.00),        -- Juan no ha pagado, debe 800 = balance -800
(9, 3, 16.67, 800.00, 0.00, -800.00),        -- Carlos no ha pagado, debe 800 = balance -800
(9, 5, 16.67, 800.00, 0.00, -800.00),        -- Luis no ha pagado, debe 800 = balance -800
(9, 7, 16.67, 800.00, 0.00, -800.00),        -- Diego no ha pagado, debe 800 = balance -800
(9, 9, 16.66, 800.00, 2800.00, 2000.00),     -- Roberto pagó camisetas (2800), debe 800 = balance +2000
(9, 10, 16.66, 800.00, 2000.00, 1200.00);    -- Laura pagó balones (2000), debe 800 = balance +1200

-- Share 10: Cursos Online 2023 (total: 3600.00, 4 personas)
INSERT INTO "share_split" (id_share, id_user, percentage, assigned_amount, paid, balance) VALUES
(10, 2, 25.00, 900.00, 0.00, -900.00),       -- María no ha pagado, debe 900 = balance -900
(10, 4, 25.00, 900.00, 0.00, -900.00),       -- Ana no ha pagado, debe 900 = balance -900
(10, 6, 25.00, 900.00, 1200.00, 300.00),     -- Paula pagó Udemy (1200), debe 900 = balance +300
(10, 10, 25.00, 900.00, 2400.00, 1500.00);   -- Laura pagó Coursera (2400), debe 900 = balance +1500

-- Inserciones para la tabla "notification"
-- Notificaciones de bienvenida para todos los usuarios
INSERT INTO "notification" (id_user, message, type, date) VALUES
(1, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-01 08:00:00'),
(2, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-01 09:15:00'),
(3, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-01 10:30:00'),
(4, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-01 11:45:00'),
(5, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-02 08:30:00'),
(6, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-02 09:45:00'),
(7, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-02 10:15:00'),
(8, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-02 11:30:00'),
(9, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-02 14:00:00'),
(10, '🎉 ¡Bienvenido a MoneyShare! 💸\nTu lugar para compartir gastos y ahorrar en equipo 🙌', 'general', '2023-06-02 15:20:00');

-- Notificaciones de creación de shares
INSERT INTO "notification" (id_user, message, type, date) VALUES
(1, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Viaje a Bariloche! 💸', 'general', '2023-07-10 10:00:00'),
(2, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Alquiler Departamento! 💸', 'general', '2023-06-01 08:00:00'),
(3, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Fiesta de Cumpleaños! 💸', 'general', '2023-07-15 14:30:00'),
(4, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Ahorro Vacaciones 2024! 💸', 'general', '2023-06-15 09:00:00'),
(5, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Gastos de Transporte! 💸', 'general', '2023-07-01 06:00:00'),
(6, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Sistema de Cine en Casa! 💸', 'general', '2023-07-20 15:00:00'),
(7, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Almuerzos de Oficina! 💸', 'general', '2023-07-03 11:00:00'),
(8, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Deuda de Alquiler! 💸', 'general', '2023-07-05 16:00:00'),
(9, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Equipamiento Deportivo! 💸', 'general', '2023-06-10 17:30:00'),
(10, '🎉 ¡Creaste un nuevo share! 💸\n¡Ya puedes empezar a compartir gastos en Cursos Online 2023! 💸', 'general', '2023-07-12 20:00:00');

-- Notificaciones de unión a shares (para miembros que no crearon el share)
INSERT INTO "notification" (id_user, message, type, date) VALUES
-- Share 1: Viaje a Bariloche
(2, '🎉 ¡Te uniste al share "Viaje a Bariloche"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-07-10 10:30:00'),
(3, '🎉 ¡Te uniste al share "Viaje a Bariloche"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-07-10 10:45:00'),
(4, '🎉 ¡Te uniste al share "Viaje a Bariloche"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-07-10 11:00:00'),

-- Share 2: Alquiler Departamento
(5, '🎉 ¡Te uniste al share "Alquiler Departamento"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-06-01 08:30:00'),
(6, '🎉 ¡Te uniste al share "Alquiler Departamento"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-06-01 08:45:00'),

-- Share 3: Fiesta de Cumpleaños
(5, '🎉 ¡Te uniste al share "Fiesta de Cumpleaños"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-07-15 15:00:00'),
(7, '🎉 ¡Te uniste al share "Fiesta de Cumpleaños"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-07-15 15:15:00'),
(8, '🎉 ¡Te uniste al share "Fiesta de Cumpleaños"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-07-15 15:30:00'),
(9, '🎉 ¡Te uniste al share "Fiesta de Cumpleaños"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-07-15 15:45:00'),

-- Share 4: Ahorro Vacaciones 2024
(1, '🎉 ¡Te uniste al share "Ahorro Vacaciones 2024"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-06-15 09:30:00'),
(7, '🎉 ¡Te uniste al share "Ahorro Vacaciones 2024"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-06-15 09:45:00'),
(10, '🎉 ¡Te uniste al share "Ahorro Vacaciones 2024"! 💸\n¡Ya puedes empezar a compartir gastos en el equipo! 💸', 'general', '2023-06-15 10:00:00');

-- Notificaciones de gastos añadidos
INSERT INTO "notification" (id_user, message, type, date) VALUES
-- Share 1: Viaje a Bariloche - Gastos de Juan (id_user = 1)
(1, '🎉 Añadiste un gasto de $4500.00 en el share "Viaje a Bariloche" \n ¡Listo para compartir entre todos! 🤝', 'general', '2023-07-10 12:30:00'),
(2, '🎉 Juan Pérez añadió un gasto de $4500.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-10 12:30:00'),
(3, '🎉 Juan Pérez añadió un gasto de $4500.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-10 12:30:00'),
(4, '🎉 Juan Pérez añadió un gasto de $4500.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-10 12:30:00'),

(1, '🎉 Añadiste un gasto de $1500.00 en el share "Viaje a Bariloche" \n ¡Listo para compartir entre todos! 🤝', 'general', '2023-07-13 09:30:00'),
(2, '🎉 Juan Pérez añadió un gasto de $1500.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-13 09:30:00'),
(3, '🎉 Juan Pérez añadió un gasto de $1500.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-13 09:30:00'),
(4, '🎉 Juan Pérez añadió un gasto de $1500.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-13 09:30:00'),

-- Share 1: Viaje a Bariloche - Gastos de Carlos (id_user = 3)
(3, '🎉 Añadiste un gasto de $3200.00 en el share "Viaje a Bariloche" \n ¡Listo para compartir entre todos! 🤝', 'general', '2023-07-11 10:15:00'),
(1, '🎉 Carlos Rodríguez añadió un gasto de $3200.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-11 10:15:00'),
(2, '🎉 Carlos Rodríguez añadió un gasto de $3200.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-11 10:15:00'),
(4, '🎉 Carlos Rodríguez añadió un gasto de $3200.00 en el share "Viaje a Bariloche" \n ¡No olvides pagar tu parte! 🎯', 'general', '2023-07-11 10:15:00');

-- Notificaciones de pagos entre usuarios
INSERT INTO "notification" (id_user, message, type, date) VALUES
-- Share 1: Viaje a Bariloche - Pagos de María a Juan
(2, '✅ Pagaste $1325.00 a Juan Pérez en el share "Viaje a Bariloche" ¡Gracias por mantener todo al día! 📅', 'payment', '2023-07-16 14:00:00'),
(1, '💸 María González te pagó $1325.00 en el share "Viaje a Bariloche" ¡Ya casi se completa el reparto! 🎯', 'payment', '2023-07-16 14:00:00'),

-- Share 1: Viaje a Bariloche - Pagos de Ana a Carlos
(4, '✅ Pagaste $1625.00 a Carlos Rodríguez en el share "Viaje a Bariloche" ¡Gracias por mantener todo al día! 📅', 'payment', '2023-07-17 10:30:00'),
(3, '💸 Ana Martínez te pagó $1625.00 en el share "Viaje a Bariloche" ¡Ya casi se completa el reparto! 🎯', 'payment', '2023-07-17 10:30:00'),

-- Share 2: Alquiler Departamento - Pagos de Luis a María
(5, '✅ Pagaste $1500.00 a María González en el share "Alquiler Departamento" ¡Gracias por mantener todo al día! 📅', 'payment', '2023-06-20 13:15:00'),
(2, '💸 Luis Sánchez te pagó $1500.00 en el share "Alquiler Departamento" ¡Ya casi se completa el reparto! 🎯', 'payment', '2023-06-20 13:15:00'),

-- Share 2: Alquiler Departamento - Pagos de Paula a María
(6, '✅ Pagaste $2000.00 a María González en el share "Alquiler Departamento" ¡Gracias por mantener todo al día! 📅', 'payment', '2023-06-22 17:45:00'),
(2, '💸 Paula López te pagó $2000.00 en el share "Alquiler Departamento" ¡Ya casi se completa el reparto! 🎯', 'payment', '2023-06-22 17:45:00'),

-- Share 8: Deuda de Alquiler - Pagos de Sofía a María
(8, '✅ Pagaste $2000.00 a María González en el share "Deuda de Alquiler" ¡Gracias por mantener todo al día! 📅', 'payment', '2023-08-05 11:30:00'),
(2, '💸 Sofía Torres te pagó $2000.00 en el share "Deuda de Alquiler" ¡Ya casi se completa el reparto! 🎯', 'payment', '2023-08-05 11:30:00');

-- Notificaciones adicionales para shares completados
INSERT INTO "notification" (id_user, message, type, date) VALUES
-- Share 2: Alquiler Departamento (completado)
(2, '🎉 ¡El share "Alquiler Departamento" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-06-30 23:59:59'),
(5, '🎉 ¡El share "Alquiler Departamento" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-06-30 23:59:59'),
(6, '🎉 ¡El share "Alquiler Departamento" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-06-30 23:59:59'),

-- Share 5: Gastos de Transporte (completado)
(5, '🎉 ¡El share "Gastos de Transporte" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-31 23:59:59'),
(8, '🎉 ¡El share "Gastos de Transporte" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-31 23:59:59'),
(9, '🎉 ¡El share "Gastos de Transporte" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-31 23:59:59'),

-- Share 9: Equipamiento Deportivo (completado)
(9, '🎉 ¡El share "Equipamiento Deportivo" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-10 17:30:00'),
(10, '🎉 ¡El share "Equipamiento Deportivo" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-10 17:30:00'),
(1, '🎉 ¡El share "Equipamiento Deportivo" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-10 17:30:00'),
(3, '🎉 ¡El share "Equipamiento Deportivo" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-10 17:30:00'),
(5, '🎉 ¡El share "Equipamiento Deportivo" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-10 17:30:00'),
(7, '🎉 ¡El share "Equipamiento Deportivo" ha sido completado exitosamente! Todos los pagos han sido realizados. 🎯', 'general', '2023-07-10 17:30:00');

-- Notificaciones recordatorias de pago
INSERT INTO "notification" (id_user, message, type, date) VALUES
-- Share 3: Fiesta de Cumpleaños - Recordatorios
(8, '⏰ Recordatorio: Tienes un pago pendiente de $1040.00 en el share "Fiesta de Cumpleaños". ¡No olvides liquidarlo! 💸', 'debt', '2023-07-25 10:00:00'),
(9, '⏰ Recordatorio: Tienes un pago pendiente de $1040.00 en el share "Fiesta de Cumpleaños". ¡No olvides liquidarlo! 💸', 'debt', '2023-07-25 10:00:00'),

-- Share 4: Ahorro Vacaciones 2024 - Recordatorios
(7, '⏰ Recordatorio: Tienes un pago pendiente de $5000.00 en el share "Ahorro Vacaciones 2024". ¡No olvides contribuir! 💰', 'goal', '2023-08-15 09:30:00'),
(10, '⏰ Recordatorio: Tienes un pago pendiente de $5000.00 en el share "Ahorro Vacaciones 2024". ¡No olvides contribuir! 💰', 'goal', '2023-08-15 09:30:00'),

-- Share 6: Sistema de Cine en Casa - Recordatorios
(4, '⏰ Recordatorio: Tienes un pago pendiente de $1500.00 en el share "Sistema de Cine en Casa". ¡No olvides liquidarlo! 💸', 'debt', '2023-08-10 16:00:00'),
(8, '⏰ Recordatorio: Tienes un pago pendiente de $1500.00 en el share "Sistema de Cine en Casa". ¡No olvides liquidarlo! 💸', 'debt', '2023-08-10 16:00:00'),
(10, '⏰ Recordatorio: Tienes un pago pendiente de $1500.00 en el share "Sistema de Cine en Casa". ¡No olvides liquidarlo! 💸', 'debt', '2023-08-10 16:00:00'),

-- Share 8: Deuda de Alquiler - Recordatorio
(8, '⏰ Recordatorio: Aún tienes una deuda pendiente de $4000.00 en el share "Deuda de Alquiler". ¡Planifica tu próximo pago! 💰', 'debt', '2023-08-20 10:00:00');
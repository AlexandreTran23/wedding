-- Table des chambres (Rooms)
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    capacity INT NOT NULL DEFAULT 2,
    public_price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des invités (Guests)
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    attendance VARCHAR(10) CHECK (attendance IN ('yes', 'no', 'maybe')),
    meal_choice VARCHAR(50) CHECK (meal_choice IN ('viande', 'poisson', 'vegetarien', 'none')),
    dietary_requirements TEXT,
    message TEXT,
    
    -- Gestion du logement
    wants_lodging BOOLEAN DEFAULT FALSE,
    room_id UUID REFERENCES rooms(id),
    is_waiting_for_partner BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des 17 chambres initiales
INSERT INTO rooms (name, description, capacity, public_price, discount_price, image_url) VALUES
('Chateau 102', 'Lit twinable; Salle de bain : baignoire, double vasque et bidet; Toilettes séparés; Balcon; Vue sur les bois; Accès ascenseur;Communicante avec la 103', 2, 333.00, 266.00, '/chateau-chambre-102-1.jpg'),
('Junior Suite 103', 'Lit twinable; Salle de bain : baignoire, double vasque et bidet; Toilettes séparés; Accès ascenseur; Communicante avec la 102 et 104', 2, 388.00, 310.00, '/js-chambre-junior-suite-103-chateau-de-candie-richard-roberts-2025.jpg'),
('Junior Suite 104', 'Lit twinable; Salle de Bain : baignoire, double vasque et douche à l’italienne; Toilettes séparés; Accès ascenseur; Communicante avec la 103', 2, 388.00, 310.00, '/js-chambre-junior-suite-104-chateau-de-candie-richard-roberts-2025.jpg'),
('Prestige 105', 'Lit twinable ; Salle de bain : baignoire sur pieds et double vasque; Toilettes avec bidet séparés; Vue sur la piscine; Accès ascenseur', 2, 388.00, 310.00, '/js-chambre-105-1.jpg'),
('Chateau 107', 'Lit twinable ; Salle de bain : baignoire, double vasque, bidet et toilettes; Chambre mansardée; Accès ascenseur', 2, 258.00, 206.00, '/chateau-chambre-107-1.jpg'),
('Chateau 108', 'Lit twinable; Salle de bain : baignoire, double vasque et bidet; Toilettes séparés ', 2, 333.00, 266.00, '/chateau-chambre-108-chateau-de-candie-richard-roberts-2025.jpg'),
('Junior Suite 109', 'Suite 1ère chambre :  2 lits singles et balcon vue sur la piscine; Salle de bain : baignoire, double vasque et bidet; Toilettes séparés; 2ème chambre : 1 lit double baldaquin', 4, 578.00, 462.00, '/js-chambre-109-1-1.jpg'),
('Chambre Cosy 111', 'Lit twinable; Salle de bain : douche à l’italienne, une vasque et toilettes; Une kitchenette; Accès PMR, en passant par la réception', 2, 333.00, 266.00, '/js-chambre-111-1.jpg'),
('Chambre Cosy 112', 'Lit double; Un dressing; Baignoire sur pied et double vasque (dans la chambre); *Toilettes séparés *pas de séparation entre la salle de bain et la chambre', 2, 333.00, 266.00, '/cc-chambre-121-1.jpg'),
('Junior Cosy 126', 'Lit twinable; Salle de bain : baignoire, un vasque et toilettes, Accès par les escalier étroit', 2, 258.00, 206.00, '/jc-chambre-126-1.jpg'),
('Suite familiale 127', 'Suite; Salle de bain : baignoire, une vasque et toilettes; 1ère chambre : 2 lits singles; 2ème chambre : (très spacieuse) 2 lits doubles; Grande baies vitrées vue sur les bois.; Accès par escalier étroit', 6, 653.00, 522.00, '/suite-chambre-127-2-1.jpg'),
('Junior Cosy 128', 'Lit double; Salle de bain : douche à l’italienne et une vasque; Toilettes séparés; Vue sur la piscine.', 2, 258.00, 206.00, '/jc-chambre-128-1.jpg'),
('Junior Suite 201', 'Lit double baldaquin habillé de rideaux; Salle de bain : baignoire sur pieds et double vasque; Toilettes séparés avec un bidet; Vue sur la piscine Communicante avec la 203', 2, 388.00, 310.00, '/js-chambre-201-1.jpg'),
('Chateau 203', 'Lit twinable escamotable; Salle de bain : baignoire, une vasque, bidet et toilettes ; communicante avec la 201; Accès par ascenseur', 2, 333.00, 266.00, '/chateau-chambre-203.jpg'),
('Chateau 301', 'Chambre duplex avec un étage; Salle de bain : baignoire, double vasque et bidet; Toilettes séparés; 1ère chambre : 1 lit double; Etage avec un escalier; 2ème chambre : 1 lit double et 2 lits single; Accès par ascenseur', 6, 603.00, 482.00, '/suite-chambre-301-1-1.jpg'),
('Chambre 303', 'Chambre duplex avec un étage; 1ère salle de bain : baignoire, une vasque et un bidet; Toilettes séparés; 1ère chambre : un lit double; Etage avec escalier; 2ème chambre : 2 lits singles et 1 lit d’appoint; Toilettes; Accès par ascenseur', 5, 603.00, 482.00, '/suite-chambre-303-1-1.jpg');

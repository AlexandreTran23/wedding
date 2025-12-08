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
('Chambre 1', 'Chambre double confortable avec vue sur le parc.', 2, 150.00, 120.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 2', 'Chambre double spacieuse.', 2, 150.00, 120.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 3', 'Suite avec balcon.', 2, 180.00, 140.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 4', 'Chambre twin cosy.', 2, 140.00, 110.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 5', 'Chambre double standard.', 2, 150.00, 120.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 6', 'Chambre avec vue sur la cour.', 2, 150.00, 120.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 7', 'Chambre historique.', 2, 160.00, 130.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 8', 'Chambre double lumineuse.', 2, 150.00, 120.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 9', 'Petite suite.', 2, 170.00, 135.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 10', 'Chambre calme.', 2, 140.00, 110.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 11', 'Chambre double supérieure.', 2, 160.00, 130.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 12', 'Chambre avec baignoire.', 2, 155.00, 125.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 13', 'Chambre sous les toits.', 2, 145.00, 115.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 14', 'Chambre double.', 2, 150.00, 120.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 15', 'Grande chambre familiale.', 4, 200.00, 160.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 16', 'Chambre double accès PMR.', 2, 150.00, 120.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg'),
('Chambre 17', 'Suite nuptiale (réservée).', 2, 250.00, 0.00, '/canide-artprism-47-retouche_3_123516-169097545849643.jpeg');
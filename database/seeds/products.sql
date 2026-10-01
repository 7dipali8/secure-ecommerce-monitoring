-- ShopNest product catalog seed
-- Category: Electronics
BEGIN;
INSERT INTO products
(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
SELECT
    seed.name,
    seed.brand,
    seed.description,
    seed.price,
    seed.original_price,
    seed.discount_percent,
    seed.category,
    seed.stock,
    seed.image_url
FROM (
    VALUES
    (
        'Smart Watch',
        'boAt',
        'Smart watch with fitness tracking and notifications',
        2499.00, 3499.00, 29, 'Electronics', 50,
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Wireless Mouse',
        'Logitech',
        'Ergonomic wireless mouse for everyday use',
        899.00, 1299.00, 31, 'Electronics', 60,
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'HD Webcam',
        'Logitech',
        'HD webcam for online meetings and video calls',
        1999.00, 2799.00, 29, 'Electronics', 35,
        'https://images.unsplash.com/photo-1760348213920-d2a90ed705fd?auto=format&fit=crop&fm=jpg&q=80&w=600'
    ),
    (
        'Wi-Fi Router',
        'TP-Link',
        'Dual-band Wi-Fi router for home connectivity',
        1899.00, 2499.00, 24, 'Electronics', 40,
        'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Smart Band',
        'Xiaomi',
        'Lightweight fitness band with activity tracking',
        1799.00, 2499.00, 28, 'Electronics', 45,
        'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Portable Projector',
        'Epson',
        'Compact projector for home entertainment and presentations',
        12999.00, 15999.00, 19, 'Electronics', 12,
        'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Digital Camera',
        'Canon',
        'Digital camera for photography and everyday shooting',
        24999.00, 29999.00, 17, 'Electronics', 10,
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Bluetooth Tracker',
        'Samsung',
        'Compact Bluetooth tracker for personal belongings',
        1499.00, 1999.00, 25, 'Electronics', 30,
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'USB-C Hub',
        'Anker',
        'Multiport USB-C hub for laptops and tablets',
        2299.00, 2999.00, 23, 'Electronics', 25,
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Power Bank 20000mAh',
        'Ambrane',
        'High-capacity power bank for charging devices on the go',
        1799.00, 2499.00, 28, 'Electronics', 40,
        'https://images.unsplash.com/photo-1609592806596-b43badaf7c0c?w=600&auto=format&fit=crop&q=80'
    )
) AS seed(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);


-- Category: Audio

INSERT INTO products
(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
SELECT
    seed.name,
    seed.brand,
    seed.description,
    seed.price,
    seed.original_price,
    seed.discount_percent,
    seed.category,
    seed.stock,
    seed.image_url
FROM (
    VALUES
    (
        'Wireless Headphones',
        'Sony',
        'Over-ear wireless headphones for music and calls',
        2999.00, 3999.00, 25, 'Audio', 35,
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Wireless Earbuds',
        'boAt',
        'Compact wireless earbuds with a charging case',
        1499.00, 1999.00, 25, 'Audio', 50,
        'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Bluetooth Speaker',
        'JBL',
        'Portable Bluetooth speaker for indoor and outdoor listening',
        2499.00, 3299.00, 24, 'Audio', 30,
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Studio Headphones',
        'Audio-Technica',
        'Over-ear headphones for studio monitoring and editing',
        5999.00, 7499.00, 20, 'Audio', 15,
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Gaming Headset',
        'HyperX',
        'Gaming headset with cushioned ear cups and microphone',
        3499.00, 4499.00, 22, 'Audio', 25,
        'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Neckband Earphones',
        'OnePlus',
        'Wireless neckband earphones for everyday listening',
        1299.00, 1799.00, 28, 'Audio', 40,
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Soundbar',
        'Sony',
        'Compact soundbar for television and home entertainment',
        7999.00, 9999.00, 20, 'Audio', 12,
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'USB Condenser Microphone',
        'FIFINE',
        'USB microphone for streaming, recording, and meetings',
        2999.00, 3999.00, 25, 'Audio', 20,
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Portable Mini Speaker',
        'boAt',
        'Small portable speaker for travel and personal use',
        999.00, 1499.00, 33, 'Audio', 45,
        'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Wired Earphones',
        'JBL',
        'Wired in-ear earphones for music and voice calls',
        699.00, 999.00, 30, 'Audio', 60,
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&auto=format&fit=crop&q=80'
    )
) AS seed(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);


-- Category: Computers & Accessories

INSERT INTO products
(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
SELECT
    seed.name,
    seed.brand,
    seed.description,
    seed.price,
    seed.original_price,
    seed.discount_percent,
    seed.category,
    seed.stock,
    seed.image_url
FROM (
    VALUES
    (
        'Mechanical Keyboard',
        'Redragon',
        'Mechanical keyboard for typing and gaming',
        2999.00, 3999.00, 25, 'Computers & Accessories', 25,
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Gaming Mouse',
        'Logitech',
        'Precision gaming mouse with ergonomic design',
        1799.00, 2499.00, 28, 'Computers & Accessories', 30,
        'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Laptop Stand',
        'Portronics',
        'Adjustable laptop stand for desk setups',
        999.00, 1499.00, 33, 'Computers & Accessories', 35,
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Laptop Backpack',
        'American Tourister',
        'Laptop backpack with padded laptop compartment',
        1499.00, 2199.00, 32, 'Computers & Accessories', 20,
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'USB Flash Drive 64GB',
        'SanDisk',
        'Compact 64GB USB flash drive for file storage',
        599.00, 899.00, 33, 'Computers & Accessories', 50,
        'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Portable SSD 500GB',
        'Samsung',
        'Portable solid-state drive for fast file transfers',
        4499.00, 5999.00, 25, 'Computers & Accessories', 15,
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'MicroSD Card 128GB',
        'Kingston',
        '128GB microSD card for compatible devices',
        999.00, 1499.00, 33, 'Computers & Accessories', 40,
        'https://images.unsplash.com/photo-1546526155-29858d428a5f?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Ethernet Cable 10m',
        'D-Link',
        '10-metre Ethernet cable for wired networking',
        399.00, 599.00, 33, 'Computers & Accessories', 45,
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Mechanical Number Pad',
        'Redragon',
        'Compact mechanical number pad for productivity',
        1299.00, 1799.00, 28, 'Computers & Accessories', 20,
        'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80'
    ),
    (
        'Wireless Keyboard',
        'Logitech',
        'Wireless keyboard for home and office use',
        1499.00, 1999.00, 25, 'Computers & Accessories', 30,
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80'
    )
) AS seed(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);


INSERT INTO products
(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
SELECT
    seed.name, seed.brand, seed.description, seed.price, seed.original_price,
    seed.discount_percent, seed.category, seed.stock, seed.image_url
FROM (VALUES
    ('Fast Charging Cable', 'Anker', 'Durable USB-C fast charging cable', 499, 799, 38, 'Mobile Accessories', 50, 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb'),
    ('Wireless Charging Pad', 'Samsung', 'Qi wireless charging pad', 1499, 1999, 25, 'Mobile Accessories', 35, 'https://images.unsplash.com/photo-1591290619762-c588e6b9a3d3'),
    ('Phone Case', 'Spigen', 'Shock-resistant protective phone case', 799, 1199, 33, 'Mobile Accessories', 60, 'https://images.unsplash.com/photo-1601593346740-925612772716'),
    ('Tempered Glass Protector', 'amFilm', 'Scratch-resistant screen protector', 399, 599, 33, 'Mobile Accessories', 80, 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37'),
    ('Car Phone Holder', 'Portronics', 'Adjustable dashboard mobile holder', 699, 999, 30, 'Mobile Accessories', 40, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'),
    ('USB-C OTG Adapter', 'UGREEN', 'Compact USB-C OTG adapter', 349, 499, 30, 'Mobile Accessories', 55, 'https://images.unsplash.com/photo-1625842268584-8f3296236761'),
    ('Selfie Stick Tripod', 'Portronics', 'Extendable selfie stick with tripod', 999, 1499, 33, 'Mobile Accessories', 25, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'),
    ('Power Bank 10000mAh', 'Ambrane', 'Compact portable power bank', 1299, 1799, 28, 'Mobile Accessories', 45, 'https://images.unsplash.com/photo-1609592806596-b43badaf7c0c'),
    ('Mobile Ring Holder', 'PopSockets', 'Grip and stand for smartphones', 499, 699, 29, 'Mobile Accessories', 70, 'https://images.unsplash.com/photo-1556656793-08538906a9f8'),
    ('Multiport Charging Adapter', 'Belkin', 'Multi-device USB charging adapter', 1899, 2499, 24, 'Mobile Accessories', 30, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0')
) AS seed(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);

INSERT INTO products
(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
SELECT
    seed.name, seed.brand, seed.description, seed.price, seed.original_price,
    seed.discount_percent, seed.category, seed.stock, seed.image_url
FROM (VALUES
    ('Football', 'Nivia', 'Durable machine-stitched football for outdoor play', 899, 1299, 31, 'Sports', 30, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'),
    ('Volleyball', 'Cosco', 'Official-size volleyball for training and matches', 799, 1199, 33, 'Sports', 25, 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1'),
    ('Tennis Racket', 'Wilson', 'Lightweight tennis racket for recreational play', 2499, 3499, 29, 'Sports', 20, 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6'),
    ('Table Tennis Bat', 'Stag', 'Control-focused table tennis bat', 699, 999, 30, 'Sports', 35, 'https://images.unsplash.com/photo-1611251135345-18c56206b863'),
    ('Basketball', 'Spalding', 'Indoor and outdoor basketball', 1299, 1799, 28, 'Sports', 25, 'https://images.unsplash.com/photo-1519861531473-9200262188bf'),
    ('Skipping Rope', 'Boldfit', 'Adjustable skipping rope for cardio workouts', 299, 499, 40, 'Sports', 50, 'https://images.unsplash.com/photo-1434596922112-19c563067271'),
    ('Sports Water Bottle', 'Decathlon', 'Reusable bottle for sports and outdoor activities', 399, 599, 33, 'Sports', 40, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8'),
    ('Gym Duffel Bag', 'Puma', 'Spacious duffel bag for sports equipment', 1499, 2199, 32, 'Sports', 20, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'),
    ('Resistance Bands Set', 'Boldfit', 'Multi-resistance bands for strength training', 599, 999, 40, 'Sports', 45, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc'),
    ('Sports Gloves', 'Nivia', 'Grip-enhancing training gloves', 499, 799, 38, 'Sports', 30, 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee')
) AS seed(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);


INSERT INTO products
(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
SELECT
    seed.name, seed.brand, seed.description, seed.price, seed.original_price,
    seed.discount_percent, seed.category, seed.stock, seed.image_url
FROM (VALUES
    ('English Willow Cricket Bat', 'SG', 'English willow cricket bat for leather-ball cricket', 4999, 6999, 29, 'Cricket', 15, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da'),
    ('Cricket Tennis Ball', 'Cosco', 'Durable tennis ball for casual cricket matches', 99, 149, 34, 'Cricket', 60, 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6'),
    ('Cricket Helmet', 'Shrey', 'Protective cricket helmet with face guard', 2499, 3499, 29, 'Cricket', 12, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'),
    ('Batting Gloves', 'SS', 'Padded batting gloves with secure wrist support', 899, 1299, 31, 'Cricket', 20, 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee'),
    ('Cricket Leg Guards', 'SG', 'Lightweight batting pads for cricket practice', 1499, 2199, 32, 'Cricket', 18, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da'),
    ('Cricket Kit Bag', 'DSC', 'Spacious cricket kit bag with multiple compartments', 1999, 2799, 29, 'Cricket', 15, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'),
    ('Cricket Stumps Set', 'Nivia', 'Portable cricket stumps set for practice', 699, 999, 30, 'Cricket', 25, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da'),
    ('Leather Cricket Ball', 'SG', 'Red leather cricket ball for match practice', 399, 599, 33, 'Cricket', 35, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'),
    ('Cricket Arm Guard', 'SS', 'Protective forearm guard for batting', 499, 799, 38, 'Cricket', 20, 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee'),
    ('Cricket Practice Net', 'Cosco', 'Portable practice net for cricket training', 2999, 3999, 25, 'Cricket', 8, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da')
) AS seed(name, brand, description, price, original_price, discount_percent, category, stock, image_url)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);

-- ============================================================
-- BADMINTON PRODUCTS (10)
-- ============================================================

INSERT INTO products (
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
SELECT
    seed.name, seed.brand, seed.description, seed.price,
    seed.original_price, seed.discount_percent,
    seed.category, seed.stock, seed.image_url
FROM (VALUES
    (
        'Professional Badminton Racket',
        'Yonex',
        'Lightweight badminton racket designed for control and power.',
        2499, 3499, 29, 'Badminton', 35,
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600'
    ),
    (
        'Badminton Shuttlecock Set',
        'Yonex',
        'Pack of durable shuttlecocks for regular practice and games.',
        499, 699, 29, 'Badminton', 80,
        'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600'
    ),
    (
        'Badminton Net',
        'Cosco',
        'Portable badminton net for indoor and outdoor play.',
        1299, 1799, 28, 'Badminton', 25,
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600'
    ),
    (
        'Badminton Grip Tape Set',
        'Li-Ning',
        'Comfortable anti-slip racket grip tapes.',
        199, 299, 33, 'Badminton', 100,
        'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600'
    ),
    (
        'Badminton Racket Cover',
        'Yonex',
        'Protective cover for carrying and storing a racket.',
        399, 599, 33, 'Badminton', 50,
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'
    ),
    (
        'Badminton Sports Shoes',
        'Li-Ning',
        'Lightweight court shoes with grip for quick movement.',
        1999, 2799, 29, 'Badminton', 30,
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'
    ),
    (
        'Badminton Kit Bag',
        'Victor',
        'Spacious sports bag for rackets and badminton accessories.',
        1799, 2499, 28, 'Badminton', 20,
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'
    ),
    (
        'Badminton Headband',
        'Nivia',
        'Sweat-absorbing headband for training and matches.',
        249, 399, 38, 'Badminton', 60,
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'
    ),
    (
        'Badminton Wristbands',
        'Nivia',
        'Comfortable wristbands for sweat control during play.',
        199, 299, 33, 'Badminton', 70,
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'
    ),
    (
        'Badminton Training Racket',
        'Cosco',
        'Entry-level racket suitable for beginners and practice.',
        899, 1299, 31, 'Badminton', 40,
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600'
    )
) AS seed(
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);


-- ============================================================
-- BASKETBALL PRODUCTS (10)
-- ============================================================

INSERT INTO products (
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
SELECT
    seed.name, seed.brand, seed.description, seed.price,
    seed.original_price, seed.discount_percent,
    seed.category, seed.stock, seed.image_url
FROM (VALUES
    (
        'Official Size Basketball',
        'Spalding',
        'Durable basketball suitable for outdoor and indoor games.',
        1499, 1999, 25, 'Basketball', 40,
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600'
    ),
    (
        'Rubber Outdoor Basketball',
        'Nivia',
        'Grip-focused rubber basketball for outdoor courts.',
        799, 1199, 33, 'Basketball', 50,
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600'
    ),
    (
        'Basketball Training Shoes',
        'Nike',
        'Cushioned shoes designed for court movement and training.',
        4999, 6499, 23, 'Basketball', 20,
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'
    ),
    (
        'Basketball Hoop Net',
        'Cosco',
        'Replacement net for a standard basketball hoop.',
        299, 449, 33, 'Basketball', 60,
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600'
    ),
    (
        'Portable Basketball Pump',
        'Nivia',
        'Hand pump with needle for inflating sports balls.',
        249, 399, 38, 'Basketball', 70,
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600'
    ),
    (
        'Basketball Arm Sleeve',
        'Nike',
        'Stretchable arm sleeve for comfortable court practice.',
	699, 999, 30, 'Basketball', 35,
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600'
    ),
    (
        'Basketball Training Cones',
        'Boldfit',
        'Set of training cones for agility and footwork drills.',
        399, 599, 33, 'Basketball', 45,
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600'
    ),
    (
        'Basketball Sports Socks',
        'Puma',
        'Cushioned sports socks for court training.',
        349, 499, 30, 'Basketball', 55,
        'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600'
    ),
    (
        'Basketball Carry Bag',
        'Cosco',
        'Lightweight bag for carrying a basketball and accessories.',
        599, 899, 33, 'Basketball', 30,
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'
    ),
    (
        'Mini Basketball Set',
        'Nivia',
        'Mini basketball for recreational play and skill practice.',
        499, 699, 29, 'Basketball', 40,
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600'
    )
) AS seed(
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);


-- ============================================================
-- FITNESS & RUNNING PRODUCTS (10)
-- ============================================================

INSERT INTO products (
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
SELECT
    seed.name, seed.brand, seed.description, seed.price,
    seed.original_price, seed.discount_percent,
    seed.category, seed.stock, seed.image_url
FROM (VALUES
    (
        'Adjustable Dumbbells',
        'Boldfit',
        'Adjustable dumbbells for strength training at home.',
        2499, 3499, 29, 'Fitness & Running', 25,
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600'
    ),
    (
        'Yoga Mat',
        'Decathlon',
        'Non-slip exercise mat for yoga, stretching, and workouts.',
        899, 1299, 31, 'Fitness & Running', 50,
        'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600'
    ),
    (
        'Digital Skipping Rope',
        'Boldfit',
        'Skipping rope with a digital counter for cardio workouts.',
        599, 899, 33, 'Fitness & Running', 40,
        'https://images.unsplash.com/photo-1434596922112-19c563067271?w=600'
    ),
    (
        'Running Shoes',
        'Asics',
        'Lightweight running shoes designed for everyday training.',
        3999, 5499, 27, 'Fitness & Running', 30,
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'
    ),
    (
        'Fitness Resistance Bands',
        'Boldfit',
        'Resistance band set for strength and mobility exercises.',
        699, 999, 30, 'Fitness & Running', 45,
        'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600'
    ),
    (
        'Stainless Steel Shaker Bottle',
        'Puma',
        'Leak-resistant shaker bottle for mixing workout drinks.',
[O        499, 799, 38, 'Fitness & Running', 60,
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'
    ),
    (
        'Foam Roller',
        'Strauss',
        'Textured foam roller for post-workout muscle recovery.',
        999, 1499, 33, 'Fitness & Running', 20,
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600'
    ),
    (
        'Fitness Gloves',
        'Nivia',
        'Padded workout gloves for a comfortable gym grip.',
        399, 599, 33, 'Fitness & Running', 50,
        'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=600'
    ),
    (
        'Running Waist Belt',
        'Decathlon',
        'Compact waist belt for carrying essentials while running.',
        599, 899, 33, 'Fitness & Running', 35,
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'
    ),
    (
        'Push Up Bars',
        'Boldfit',
        'Stable push-up handles for home strength workouts.',
        799, 1199, 33, 'Fitness & Running', 30,
        'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600'
    )
) AS seed(
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);



-- ============================================================
-- HOME & LIFESTYLE PRODUCTS (10)
-- ============================================================

INSERT INTO products (
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
SELECT
    seed.name, seed.brand, seed.description, seed.price,
    seed.original_price, seed.discount_percent,
    seed.category, seed.stock, seed.image_url
FROM (VALUES
    (
        'Insulated Water Bottle',
        'Milton',
        'Reusable insulated bottle for everyday hydration.',
        699, 999, 30, 'Home & Lifestyle', 50,
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'
    ),
    (
        'Ceramic Coffee Mug',
        'Home Centre',
        'Classic ceramic mug for coffee, tea, and other beverages.',
        299, 449, 33, 'Home & Lifestyle', 60,
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600'
    ),
    (
        'LED Desk Lamp',
        'Philips',
        'Compact LED desk lamp for reading and workspace lighting.',
        999, 1499, 33, 'Home & Lifestyle', 25,
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600'
    ),
    (
        'Cotton Cushion Cover Set',
        'Wakefit',
        'Soft cotton cushion covers for living room decoration.',
        499, 799, 38, 'Home & Lifestyle', 40,
        'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600'
    ),
    (
        'Minimalist Wall Clock',
        'Ajanta',
        'Simple wall clock for home and office interiors.',
        599, 899, 33, 'Home & Lifestyle', 30,
        'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600'
    ),
    (
        'Stainless Steel Lunch Box',
        'Cello',
        'Reusable lunch box for office, school, and travel.',
        799, 1199, 33, 'Home & Lifestyle', 45,
        'https://images.unsplash.com/photo-1547592180-85f173990554?w=600'
    ),
    (
        'Decorative Table Planter',
        'IKEA',
        'Modern planter for small indoor plants and home decor.',
        399, 599, 33, 'Home & Lifestyle', 35,
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600'
    ),
    (
        'Microfiber Bedsheet Set',
        'Wakefit',
        'Easy-care bedsheet set for everyday bedroom use.',
        1299, 1799, 28, 'Home & Lifestyle', 20,
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'
    ),
    (
        'Reusable Shopping Tote Bag',
        'DailyObjects',
        'Lightweight reusable tote bag for shopping and daily use.',
        349, 499, 30, 'Home & Lifestyle', 55,
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600'
    ),
    (
        'Digital Alarm Clock',
        'Portronics',
        'Compact digital clock for bedside tables and desks.',
        899, 1299, 31, 'Home & Lifestyle', 25,
        'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600'
    )
) AS seed(
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);


-- ============================================================
-- MOBILE PHONES: IPHONE AND SAMSUNG (10)
-- ============================================================

INSERT INTO products (
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
SELECT
    seed.name, seed.brand, seed.description, seed.price,
    seed.original_price, seed.discount_percent,
    seed.category, seed.stock, seed.image_url
FROM (VALUES
    (
        'iPhone 16',
        'Apple',
        'Apple smartphone with an advanced camera system and A18 chip.',
        69900, 79900, 13, 'Mobiles', 15,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 16 Plus',
        'Apple',
        'Large-display iPhone with A18 performance and long battery life.',
        79900, 89900, 11, 'Mobiles', 12,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 16 Pro',
        'Apple',
        'Pro iPhone featuring an advanced camera system and A18 Pro chip.',
        109900, 119900, 8, 'Mobiles', 10,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 16 Pro Max',
        'Apple',
        'Premium iPhone with a large display, advanced cameras, and A18 Pro.',
        129900, 144900, 10, 'Mobiles', 8,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 15',
        'Apple',
        'iPhone with a Dynamic Island display and dual-camera system.',
        59900, 69900, 14, 'Mobiles', 18,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'Samsung Galaxy S25',
        'Samsung',
        'Flagship smartphone with Galaxy AI and a high-resolution display.',
        80999, 84999, 5, 'Mobiles', 12,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy S25+',
        'Samsung',
        'Premium Galaxy smartphone with a large display and powerful performance.',
        99999, 104999, 5, 'Mobiles', 10,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy S25 Ultra',
        'Samsung',
        'Ultra-premium Galaxy phone with S Pen and advanced camera features.',
        129999, 141999, 8, 'Mobiles', 8,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy A56 5G',
        'Samsung',
        'Mid-range 5G smartphone with a bright display and versatile cameras.',
        41999, 45999, 9, 'Mobiles', 20,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy A36 5G',
        'Samsung',
        'Everyday 5G smartphone with a large display and dependable performance.',
        32999, 36999, 11, 'Mobiles', 20,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    )
) AS seed(
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);
-- ============================================================
-- ADDITIONAL MOBILE PHONES: IPHONE AND SAMSUNG (10)
-- ============================================================

INSERT INTO products (
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
SELECT
    seed.name, seed.brand, seed.description, seed.price,
    seed.original_price, seed.discount_percent,
    seed.category, seed.stock, seed.image_url
FROM (VALUES
    (
        'iPhone 15 Plus',
        'Apple',
        'Large-screen iPhone with an A16 Bionic chip and dual-camera system.',
        69900, 79900, 13, 'Mobiles', 12,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 15 Pro',
        'Apple',
        'Premium iPhone with an A17 Pro chip and advanced camera capabilities.',
        89900, 109900, 18, 'Mobiles', 10,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 14',
        'Apple',
        'iPhone with an OLED display, A15 Bionic chip, and dual cameras.',
        49900, 59900, 17, 'Mobiles', 15,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 14 Plus',
        'Apple',
        'Large-display iPhone with an A15 Bionic chip and long battery life.',
        59900, 69900, 14, 'Mobiles', 10,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'iPhone 13',
        'Apple',
        'Compact iPhone with an A15 Bionic chip and dual-camera system.',
        39900, 49900, 20, 'Mobiles', 18,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'
    ),
    (
        'Samsung Galaxy S24 FE',
        'Samsung',
        'Galaxy smartphone with Galaxy AI features and a versatile camera.',
        49999, 59999, 17, 'Mobiles', 12,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy S24 Ultra',
        'Samsung',
        'Premium Galaxy phone with S Pen support and advanced camera features.',
        109999, 129999, 15, 'Mobiles', 8,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy A26 5G',
        'Samsung',
        '5G smartphone with a Super AMOLED display and versatile cameras.',
        24999, 27999, 11, 'Mobiles', 25,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy A16 5G',
        'Samsung',
        'Affordable 5G smartphone for everyday communication and entertainment.',
        18999, 21999, 14, 'Mobiles', 30,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    ),
    (
        'Samsung Galaxy Z Flip6',
        'Samsung',
        'Foldable Galaxy smartphone with a compact design and flexible display.',
        89999, 109999, 18, 'Mobiles', 6,
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'
    )
) AS seed(
    name, brand, description, price, original_price,
    discount_percent, category, stock, image_url
)
WHERE NOT EXISTS (
    SELECT 1
    FROM products existing
    WHERE existing.name = seed.name
      AND existing.category = seed.category
);
COMMIT;

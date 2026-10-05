-- ShopNest product seed
-- Source: manually corrected RDS products table
-- 53 products; organized by category, then product ID.
-- Product values are preserved exactly from the RDS export.

BEGIN;

-- ============================================================
-- Audio (8 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (251, 'Gaming Headset', 'HyperX', 'Gaming headset with cushioned ear cups and microphone', 3499.00, 4499.00, 22, 'Audio', 24, 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (252, 'USB Condenser Microphone', 'FIFINE', 'USB microphone for streaming, recording, and meetings', 2999.00, 3999.00, 25, 'Audio', 20, 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (253, 'Studio Headphones', 'Audio-Technica', 'Over-ear headphones for studio monitoring and editing', 5999.00, 7499.00, 20, 'Audio', 15, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (255, 'Bluetooth Speaker', 'JBL', 'Portable Bluetooth speaker for indoor and outdoor listening', 2499.00, 3299.00, 24, 'Audio', 30, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (256, 'Portable Mini Speaker', 'boAt', 'Small portable speaker for travel and personal use', 999.00, 1499.00, 33, 'Audio', 45, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (258, 'Wireless Earbuds', 'boAt', 'Compact wireless earbuds with a charging case', 1499.00, 1999.00, 25, 'Audio', 50, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (259, 'Wireless Headphones', 'Sony', 'Over-ear wireless headphones for music and calls', 2999.00, 3999.00, 25, 'Audio', 35, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (260, 'Soundbar', 'Sony', 'Compact soundbar for television and home entertainment', 7999.00, 9999.00, 20, 'Audio', 12, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Badminton (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (302, 'Professional Badminton Racket', 'Yonex', 'Lightweight badminton racket designed for control and power.', 2499.00, 3499.00, 29, 'Badminton', 35, 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Basketball (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (405, 'Basketball Sports Socks', 'Puma', 'Cushioned sports socks for court training.', 349.00, 499.00, 30, 'Basketball', 55, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600', '2026-10-03 07:47:50.066239')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Beauty & Personal Care (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (439, 'Makeup Brush Set', 'BlendPro', 'Multi-piece makeup brush set for blending and detailed application.', 799.00, 1199.00, 33, 'Beauty & Personal Care', 27, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600', '2026-10-03 09:38:27.532613')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Computers & Accessories (5 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (261, 'MicroSD Card 128GB', 'Kingston', '128GB microSD card for compatible devices', 999.00, 1499.00, 33, 'Computers & Accessories', 40, 'https://images.unsplash.com/photo-1546526155-29858d428a5f?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (264, 'Gaming Mouse', 'Logitech', 'Precision gaming mouse with ergonomic design', 1799.00, 2499.00, 28, 'Computers & Accessories', 30, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (265, 'Laptop Backpack', 'American Tourister', 'Laptop backpack with padded laptop compartment', 1499.00, 2199.00, 32, 'Computers & Accessories', 20, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (367, 'Mechanical Number Pad', 'Redragon', 'Compact mechanical number pad for productivity', 1299.00, 1799.00, 28, 'Computers & Accessories', 20, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80', '2026-10-03 07:47:50.066239')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (447, 'Dell 15 Core Ultra 5 225H Laptop', 'Dell', 'Dell 15 laptop with Intel Core Ultra 5 225H processor, 16GB RAM, and 512GB SSD.', 74999.00, 84999.00, 12, 'Computers & Accessories', 7, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', '2026-10-03 09:41:09.807523')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Electronics (8 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (241, 'Smart Watch', 'boAt', 'Smart watch with fitness tracking and notifications', 2499.00, 3499.00, 29, 'Electronics', 37, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (242, 'Wireless Mouse', 'Logitech', 'Ergonomic wireless mouse for everyday use', 899.00, 1299.00, 31, 'Electronics', 48, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (244, 'Wi-Fi Router', 'TP-Link', 'Dual-band Wi-Fi router for home connectivity', 1899.00, 2499.00, 24, 'Electronics', 40, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (245, 'Smart Band', 'Xiaomi', 'Lightweight fitness band with activity tracking', 1799.00, 2499.00, 28, 'Electronics', 45, 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (247, 'Digital Camera', 'Canon', 'Digital camera for photography and everyday shooting', 24999.00, 29999.00, 17, 'Electronics', 10, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (249, 'USB-C Hub', 'Anker', 'Multiport USB-C hub for laptops and tablets', 2299.00, 2999.00, 23, 'Electronics', 25, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (250, 'Power Bank 20000mAh', 'Ambrane', 'High-capacity power bank for charging devices on the go', 1799.00, 2499.00, 28, 'Electronics', 40, 'https://images.unsplash.com/photo-1609592806596-b43badaf7c0c?w=600&auto=format&fit=crop&q=80', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (454, 'Digital Watch', 'TimePro', 'Digital wristwatch with an easy-to-read display.', 799.00, 1199.00, 33, 'Electronics', 19, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', '2026-10-03 09:50:04.389432')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Fashion (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (432, 'Women''s Handbag', 'Lavie', 'Stylish handbag for everyday use', 1499.00, 1999.00, 25, 'Fashion', 21, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', '2026-10-03 09:32:49.832054')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Fitness & Running (3 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (321, 'Yoga Mat', 'Decathlon', 'Non-slip exercise mat for yoga, stretching, and workouts.', 899.00, 1299.00, 31, 'Fitness & Running', 50, 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (323, 'Adjustable Dumbbells', 'Boldfit', 'Adjustable dumbbells for strength training at home.', 2499.00, 3499.00, 29, 'Fitness & Running', 25, 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (324, 'Foam Roller', 'Strauss', 'Textured foam roller for post-workout muscle recovery.', 999.00, 1499.00, 33, 'Fitness & Running', 20, 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Food & Beverages (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (452, 'Dairy Milk Chocolate', 'Cadbury', 'Dairy Milk chocolate bar for a sweet treat.', 100.00, 100.00, 0, 'Food & Beverages', 50, 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600', '2026-10-03 09:50:04.389432')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Gifts & Flowers (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (433, 'Flower Bouquet', 'Floral Studio', 'Decorative flower bouquet for gifting', 799.00, 999.00, 20, 'Gifts & Flowers', 29, 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80', '2026-10-03 09:32:49.832054')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Home & Lifestyle (8 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (332, 'LED Desk Lamp', 'Philips', 'Compact LED desk lamp for reading and workspace lighting.', 999.00, 1499.00, 33, 'Home & Lifestyle', 25, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (334, 'Cotton Cushion Cover Set', 'Wakefit', 'Soft cotton cushion covers for living room decoration.', 499.00, 799.00, 38, 'Home & Lifestyle', 39, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (335, 'Ceramic Coffee Mug', 'Home Centre', 'Classic ceramic mug for coffee, tea, and other beverages.', 299.00, 449.00, 33, 'Home & Lifestyle', 60, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (336, 'Reusable Shopping Tote Bag', 'DailyObjects', 'Lightweight reusable tote bag for shopping and daily use.', 349.00, 499.00, 30, 'Home & Lifestyle', 55, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (337, 'Decorative Table Planter', 'IKEA', 'Modern planter for small indoor plants and home decor.', 399.00, 599.00, 33, 'Home & Lifestyle', 35, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (338, 'Microfiber Bedsheet Set', 'Wakefit', 'Easy-care bedsheet set for everyday bedroom use.', 1299.00, 1799.00, 28, 'Home & Lifestyle', 17, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (339, 'Minimalist Wall Clock', 'Ajanta', 'Simple wall clock for home and office interiors.', 599.00, 899.00, 33, 'Home & Lifestyle', 28, 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (455, 'Bedside Study Table', 'HomeCraft', 'Compact study table for bedroom work and study.', 2499.00, 3499.00, 29, 'Home & Lifestyle', 10, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600', '2026-10-03 09:50:04.389432')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Mobile Accessories (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (278, 'Tempered Glass Protector', 'amFilm', 'Scratch-resistant screen protector', 399.00, 599.00, 33, 'Mobile Accessories', 80, 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ============================================================
-- ============================================================
-- Mobiles (2 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (346, 'iPhone 16 Pro Max', 'Apple', 'Premium iPhone with a large display, advanced cameras, and A18 Pro.', 129900.00, 144900.00, 10, 'Mobiles', 7, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (353, 'Samsung Galaxy A16 5G', 'Samsung', 'Affordable 5G smartphone for everyday communication and entertainment.', 18999.00, 21999.00, 14, 'Mobiles', 30, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;

-- Musical Instruments (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (431, 'Acoustic Guitar', 'Yamaha', 'Acoustic guitar for music practice and performance', 5999.00, 7499.00, 20, 'Musical Instruments', 13, 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80', '2026-10-03 09:32:49.832054')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Sports (8 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (282, 'Sports Gloves', 'Nivia', 'Grip-enhancing training gloves', 499.00, 799.00, 38, 'Sports', 30, 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (283, 'Skipping Rope', 'Boldfit', 'Adjustable skipping rope for cardio workouts', 299.00, 499.00, 40, 'Sports', 50, 'https://images.unsplash.com/photo-1434596922112-19c563067271', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (284, 'Tennis Racket', 'Wilson', 'Lightweight tennis racket for recreational play', 2499.00, 3499.00, 29, 'Sports', 19, 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (285, 'Sports Water Bottle', 'Decathlon', 'Reusable bottle for sports and outdoor activities', 399.00, 599.00, 33, 'Sports', 37, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (287, 'Football', 'Nivia', 'Durable machine-stitched football for outdoor play', 899.00, 1299.00, 31, 'Sports', 30, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (290, 'Volleyball', 'Cosco', 'Official-size volleyball for training and matches', 799.00, 1199.00, 33, 'Sports', 25, 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1', '2026-10-01 12:08:06.494317')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (380, 'Basketball', 'Spalding', 'Indoor and outdoor basketball', 1299.00, 1799.00, 28, 'Sports', 24, 'https://images.unsplash.com/photo-1519861531473-9200262188bf', '2026-10-03 07:47:50.066239')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (449, 'Nike Sports Shoes', 'Nike', 'Sports shoes designed for running, training and everyday athletic use.', 3499.00, 4999.00, 30, 'Sports', 14, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', '2026-10-03 09:50:04.389432')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Women's Fashion (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (448, 'Women''s Bracelet', 'StyleAura', 'Elegant everyday bracelet with a minimalist design.', 699.00, 999.00, 30, 'Women''s Fashion', 22, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', '2026-10-03 09:41:48.745865')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Women's Fashion Accessories (1 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, description, price, original_price, discount_percent, category, stock, image_url, created_at) VALUES (435, 'Women''s Sunglasses', 'SunLuxe', 'Modern UV-protective sunglasses with a lightweight frame.', 899.00, 1299.00, 31, 'Women''s Fashion Accessories', 25, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600', '2026-10-03 09:38:27.532613')
ON CONFLICT (id) DO NOTHING;

-- Keep the PostgreSQL sequence aligned with the highest existing product ID.
SELECT pg_catalog.setval('public.products_id_seq', 455, true);

COMMIT;


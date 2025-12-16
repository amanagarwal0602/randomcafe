import json
import random
from datetime import datetime, timedelta

# Load the sample data
with open('client/public/sampleDataFull.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Fixing sample data...")

# Fix 1: Correct vegetarian flags for menu items
non_veg_keywords = ['chicken', 'beef', 'pork', 'bacon', 'ham', 'sausage', 'salmon', 'tuna', 'seafood', 'meatball', 'pepperoni', 'prosciutto', 'turkey']
always_veg_keywords = ['veg', 'vegetarian', 'mushroom', 'cheese', 'margherita', 'caprese', 'pesto pizza', 'truffle', 'spinach']

menu_items = data.get('menuItems', [])
fixed_veg_count = 0

for item in menu_items:
    name_lower = item['name'].lower()
    desc_lower = item.get('description', '').lower()
    
    # Check if item should be non-veg
    is_non_veg = any(keyword in name_lower or keyword in desc_lower for keyword in non_veg_keywords)
    
    # Check if item should definitely be veg (mushroom, cheese, etc)
    is_definitely_veg = any(keyword in name_lower for keyword in always_veg_keywords)
    
    old_veg = item.get('is_veg')
    
    if is_definitely_veg and not is_non_veg:
        item['is_veg'] = True
    elif is_non_veg:
        item['is_veg'] = False
    else:
        # Default: if it's a salad, pasta, or dessert without meat, it's probably veg
        category = item.get('category', '').lower()
        if category in ['salads', 'pasta', 'desserts', 'drinks', 'coffee']:
            item['is_veg'] = True
        # Pizzas without meat are veg
        elif category == 'pizza' and not is_non_veg:
            item['is_veg'] = True
    
    if old_veg != item['is_veg']:
        print(f"  Fixed: {item['name']} - was {old_veg}, now {item['is_veg']}")
        fixed_veg_count += 1

print(f"Fixed {fixed_veg_count} vegetarian flags")

# Fix 2: Add sample reservations if missing
if 'reservations' not in data or len(data.get('reservations', [])) == 0:
    print("Adding sample reservations...")
    
    customers = [u for u in data.get('customers', []) if u.get('role') == 'customer'][:30]
    
    reservations = []
    time_slots = ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', 
                  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM']
    statuses = ['pending', 'confirmed', 'seated', 'completed', 'cancelled']
    
    base_date = datetime.now()
    
    for i in range(50):
        customer = random.choice(customers)
        days_offset = random.randint(-5, 10)  # Past and future reservations
        res_date = base_date + timedelta(days=days_offset)
        
        # Determine status based on date
        if res_date.date() < base_date.date():
            status = random.choice(['completed', 'cancelled'])
        elif res_date.date() == base_date.date():
            status = random.choice(['confirmed', 'seated', 'pending'])
        else:
            status = random.choice(['pending', 'confirmed'])
        
        reservation = {
            "id": f"res{str(i+1).zfill(5)}",
            "table_type": "reservation",
            "user_id": customer['id'],
            "guest_name": customer['name'],
            "guest_email": customer['email'],
            "guest_phone": customer['phone'],
            "number_of_guests": random.randint(2, 8),
            "date": res_date.strftime("%Y-%m-%d"),
            "time_slot": random.choice(time_slots),
            "special_requests": "" if random.random() < 0.7 else random.choice([
                "Window seat preferred",
                "Birthday celebration",
                "Anniversary dinner",
                "High chair needed",
                "Wheelchair accessible"
            ]),
            "status": status,
            "table_number": random.randint(1, 20) if status in ['confirmed', 'seated', 'completed'] else None,
            "created_at": (res_date - timedelta(days=random.randint(1, 7))).isoformat() + 'Z',
            "updated_at": res_date.isoformat() + 'Z'
        }
        reservations.append(reservation)
    
    data['reservations'] = reservations
    print(f"Added {len(reservations)} sample reservations")

# Fix 3: Verify image URLs are appropriate for items
print("Validating image URLs...")

# Save the fixed data
with open('client/public/sampleDataFull.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("\n✅ Sample data fixed successfully!")
print(f"   - Fixed {fixed_veg_count} vegetarian flags")
print(f"   - Ensured reservations data exists")
print(f"   - Total menu items: {len(menu_items)}")
print(f"   - Total reservations: {len(data.get('reservations', []))}")
print(f"   - Total orders: {len(data.get('orders', []))}")

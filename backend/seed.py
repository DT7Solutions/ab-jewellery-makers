import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Category, Product, GoldRate

# 1. Seed Live Gold Rate for Guntur AP
gold_rate, created = GoldRate.objects.get_or_create(
    location="Guntur, AP",
    defaults={
        "gold_22k_per_gram": 6850.00,
        "gold_24k_per_gram": 7470.00,
        "silver_per_gram": 91.00
    }
)
if created:
    print("[+] Initial Gold Rate created.")
else:
    # Update rates to keep fresh
    gold_rate.gold_22k_per_gram = 6850.00
    gold_rate.gold_24k_per_gram = 7470.00
    gold_rate.silver_per_gram = 91.00
    gold_rate.save()
    print("[+] Live Gold Rate updated.")

# 2. Seed All 8 Categories
categories_data = [
    {"name": "NECKLACES", "slug": "necklaces", "description": "Exquisite 22K gold, Kundan, and Polki necklace sets for royal elegance.", "image": "categories/necklaces.png"},
    {"name": "EARRINGS", "slug": "earrings", "description": "Traditional temple work Jhumkas, Chandbalis, and gold studs.", "image": "categories/earrings.png"},
    {"name": "BANGLES", "slug": "bangles", "description": "Intricately carved 22K gold Kadas, Kangan, and floral bangles.", "image": "categories/bangles.png"},
    {"name": "RINGS", "slug": "rings", "description": "Peacock motif and Kundan solitaire statement gold rings.", "image": "categories/rings.png"},
    {"name": "PENDANTS", "slug": "pendants", "description": "Zambian emerald and ruby gold pendants.", "image": "categories/pendants.png"},
    {"name": "ANTIQUE", "slug": "antique", "description": "Regal antique finish Nakshi and royal heritage heirlooms.", "image": "categories/antique.png"},
    {"name": "BRACELETS", "slug": "bracelets", "description": "Filigree gold cuffs and Nakshi artisan bracelets.", "image": "categories/bracelets.png"},
    {"name": "MANGALSUTRA", "slug": "mangalsutra", "description": "Royal solitaire and polki diamond mangalsutras.", "image": "categories/mangalsutra.png"}
]

category_objs = {}
for cat in categories_data:
    obj, _ = Category.objects.update_or_create(
        slug=cat["slug"],
        defaults={"name": cat["name"], "description": cat["description"], "image": cat["image"]}
    )
    category_objs[cat["name"].upper()] = obj
print("[+] Seeding categories completed.")

# 3. Seed All 16 Products
products_data = [
  {
    "slug": "IND-NK-001",
    "name": "Heritage Royal Necklace Set",
    "category": "NECKLACES",
    "price": 245000.00,
    "purity": "22K",
    "weight": "28.4g",
    "image": "products/heritage-necklace.png",
    "is_featured": True,
    "is_bestseller": True,
    "description": "An iconic handcrafted 22K gold heritage necklace set adorned with ruby cabochons and natural emerald droplets."
  },
  {
    "slug": "IND-ER-002",
    "name": "Temple Goddess Jhumkas",
    "category": "EARRINGS",
    "price": 72000.00,
    "purity": "22K",
    "weight": "12.6g",
    "image": "products/temple-jhumkas.png",
    "is_featured": True,
    "is_bestseller": False,
    "description": "Traditional temple work gold jhumkas featuring Goddess motif carvings and pearl drop finish."
  },
  {
    "slug": "IND-BG-003",
    "name": "Royal Flora Gold Bangles",
    "category": "BANGLES",
    "price": 118000.00,
    "purity": "22K",
    "weight": "18.2g",
    "image": "products/gold-bangles.png",
    "is_featured": True,
    "is_bestseller": True,
    "description": "Set of exquisite floral relief carved 22K gold kada bangles designed for festive elegance."
  },
  {
    "slug": "IND-NK-004",
    "name": "Uncut Polki Diamond Necklace",
    "category": "NECKLACES",
    "price": 325000.00,
    "purity": "22K",
    "weight": "34.1g",
    "image": "products/polki-diamond-necklace.png",
    "is_featured": True,
    "is_bestseller": True,
    "description": "Uncut royal Polki diamond neckpiece embedded with vibrant emerald stone beads."
  },
  {
    "slug": "IND-CK-005",
    "name": "Imperial Kundan Choker Set",
    "category": "NECKLACES",
    "price": 148000.00,
    "purity": "22K",
    "weight": "22.5g",
    "image": "products/kundan-choker.png",
    "is_featured": True,
    "is_bestseller": False,
    "description": "Regal Kundan choker with detailed back meenakari art and lustrous seed pearl drops."
  },
  {
    "slug": "IND-RG-006",
    "name": "Royal Peacock Gold Ring",
    "category": "RINGS",
    "price": 45000.00,
    "purity": "22K",
    "weight": "6.8g",
    "image": "products/peacock-ring.png",
    "is_featured": True,
    "is_bestseller": True,
    "description": "Intricately detailed peacock crest gold ring embellished with a central ruby gemstone."
  },
  {
    "slug": "IND-PD-007",
    "name": "Emerald Grace Gold Pendant",
    "category": "PENDANTS",
    "price": 68000.00,
    "purity": "22K",
    "weight": "9.4g",
    "image": "products/emerald-pendant.png",
    "is_featured": True,
    "is_bestseller": False,
    "description": "Solitaire Zambian emerald pendant enclosed in a sparkling pave gold setting."
  },
  {
    "slug": "IND-AT-008",
    "name": "Antique Heritage Nakshi Haar",
    "category": "ANTIQUE",
    "price": 285000.00,
    "purity": "22K",
    "weight": "31.2g",
    "image": "products/heritage-necklace.png",
    "is_featured": True,
    "is_bestseller": False,
    "description": "Heritage antique finish long gold haar with nakshi work motifs."
  },
  {
    "slug": "IND-BR-009",
    "name": "Filigree Regal Gold Cuff",
    "category": "BRACELETS",
    "price": 89000.00,
    "purity": "22K",
    "weight": "14.1g",
    "image": "products/filigree-bracelet.png",
    "is_featured": True,
    "is_bestseller": False,
    "description": "Flexible gold filigree wrist cuff with secure luxury clasp."
  },
  {
    "slug": "IND-MS-010",
    "name": "Royal Solitaire Mangalsutra",
    "category": "MANGALSUTRA",
    "price": 95000.00,
    "purity": "18K",
    "weight": "8.5g",
    "image": "products/polki-diamond-necklace.png",
    "is_featured": True,
    "is_bestseller": False,
    "description": "Modern luxury double-chain black bead mangalsutra featuring a sparkling diamond pendant."
  },
  {
    "slug": "IND-ER-011",
    "name": "Royal Crescent Chandbali",
    "category": "EARRINGS",
    "price": 84000.00,
    "purity": "22K",
    "weight": "15.0g",
    "image": "products/chandbali-earrings.png",
    "is_featured": True,
    "is_bestseller": False,
    "description": "Crescent moon shaped Chandbali earrings with pearl tassels and uncut stone settings."
  },
  {
    "slug": "IND-AT-012",
    "name": "Bridal Antique Choker Set",
    "category": "ANTIQUE",
    "price": 360000.00,
    "purity": "22K",
    "weight": "42.0g",
    "image": "products/kundan-choker.png",
    "is_featured": True,
    "is_bestseller": True,
    "description": "Opulent multi-tiered bridal choker set crafted for grand traditional weddings."
  },
  {
    "slug": "IND-RG-013",
    "name": "Kundan Solitaire Gold Ring",
    "category": "RINGS",
    "price": 52000.00,
    "purity": "22K",
    "weight": "7.5g",
    "image": "products/peacock-ring.png",
    "is_featured": False,
    "is_bestseller": False,
    "description": "Handcrafted Kundan setting gold ring with floral engraving on the shank."
  },
  {
    "slug": "IND-BG-014",
    "name": "Temple Antique Gold Kada",
    "category": "BANGLES",
    "price": 135000.00,
    "purity": "22K",
    "weight": "21.0g",
    "image": "products/gold-bangles.png",
    "is_featured": False,
    "is_bestseller": False,
    "description": "Heavy antique finish temple kada with intricate divine motifs and ruby stone eyes."
  },
  {
    "slug": "IND-PD-015",
    "name": "Ruby Royal Floral Pendant",
    "category": "PENDANTS",
    "price": 58000.00,
    "purity": "22K",
    "weight": "8.2g",
    "image": "products/emerald-pendant.png",
    "is_featured": False,
    "is_bestseller": False,
    "description": "A delicate floral ruby pendant encased in 22K yellow gold with pearl drops."
  },
  {
    "slug": "IND-BR-016",
    "name": "Nakshi Antique Gold Bracelet",
    "category": "BRACELETS",
    "price": 98000.00,
    "purity": "22K",
    "weight": "15.8g",
    "image": "products/filigree-bracelet.png",
    "is_featured": False,
    "is_bestseller": False,
    "description": "Detailed Nakshi artisan carved antique gold bracelet with adjustable safety chain."
  }
]

for prod in products_data:
    cat_obj = category_objs.get(prod["category"].upper())
    obj, created = Product.objects.update_or_create(
        slug=prod["slug"],
        defaults={
            "name": prod["name"],
            "category": cat_obj,
            "price": prod["price"],
            "purity": prod["purity"],
            "weight": prod["weight"],
            "description": prod["description"],
            "image": prod["image"],
            "is_featured": prod["is_featured"],
            "is_bestseller": prod["is_bestseller"],
            "is_active": True,
            "status": "PUBLISHED",
            "product_code": prod["slug"],
            "certification": "BIS 916 Hallmarked & Certified",
            "tags": f"{prod['category'].capitalize()}, Handmade, Traditional, Popular" if prod["is_featured"] else f"{prod['category'].capitalize()}, Handmade, Traditional",
            "custom_flags": "Featured, Bestseller" if (prod["is_featured"] and prod["is_bestseller"]) else "Featured" if prod["is_featured"] else "Bestseller" if prod["is_bestseller"] else ""
        }
    )
    if created:
        print(f"  + Created Product: '{prod['name']}' ({prod['slug']})")
    else:
        print(f"  * Updated Product: '{prod['name']}' ({prod['slug']})")

print("\n[+] Full Database Seeding and Binding Completed Successfully!")

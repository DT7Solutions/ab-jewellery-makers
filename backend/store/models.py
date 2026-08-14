from django.db import models

class Category(models.Model):
    STATUS_CHOICES = [
        ('PUBLISHED', 'Published'),
        ('DRAFT', 'Draft'),
    ]

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', max_length=255, blank=True, null=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='PUBLISHED', db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Category.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.status})"

    @property
    def is_published(self):
        return self.status == 'PUBLISHED'

    @property
    def image_url(self):
        if self.image:
            url = str(self.image)
            if url.startswith('http://') or url.startswith('https://'):
                return url
            if url.startswith('/media/'):
                return f"https://www.api.abgoldjewelery.com{url}"
            if url.startswith('/'):
                return url
            return f"https://www.api.abgoldjewelery.com/media/{url.lstrip('/')}"
        return "/images/products/heritage-necklace.png"


class Product(models.Model):
    PURITY_CHOICES = [
        ('22K', '22K Gold (916 Hallmarked)'),
        ('24K', '24K Fine Gold'),
        ('18K', '18K Gold'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=12, decimal_places=2, help_text="Indicative Price in INR")
    weight = models.CharField(max_length=50, help_text="e.g. 45.2 grams", blank=True, null=True)
    purity = models.CharField(max_length=10, choices=PURITY_CHOICES, default='22K')
    description = models.TextField(blank=True, default='')
    image = models.ImageField(upload_to='products/', max_length=255, blank=True, null=True)
    status = models.CharField(max_length=15, choices=Category.STATUS_CHOICES, default='PUBLISHED', db_index=True)
    is_featured = models.BooleanField(default=False)
    is_bestseller = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    product_code = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. IND-NK-001")
    certification = models.CharField(max_length=150, default="BIS 916 Hallmarked & Certified", blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, null=True, help_text="Comma-separated tags, e.g. Bridal, Popular, New Arrival")
    custom_flags = models.CharField(max_length=255, blank=True, null=True, help_text="Comma-separated custom badges, e.g. Featured, Bestseller, Trending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} [{self.status}]"

    @property
    def is_published(self):
        return self.status == 'PUBLISHED' and self.is_active

    @property
    def image_url(self):
        if self.image:
            url = str(self.image)
            if url.startswith('http://') or url.startswith('https://'):
                return url
            if url.startswith('/media/'):
                return f"https://www.api.abgoldjewelery.com{url}"
            if url.startswith('/'):
                return url
            return f"https://www.api.abgoldjewelery.com/media/{url.lstrip('/')}"
        return "/images/products/heritage-necklace.png"


class GoldRate(models.Model):
    location = models.CharField(max_length=100, default="Tenali, AP")
    gold_22k_per_gram = models.DecimalField(max_digits=10, decimal_places=2)
    gold_24k_per_gram = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    silver_per_gram = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.location} - 22K: ₹{self.gold_22k_per_gram}/g ({self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class Inquiry(models.Model):
    customer_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Inquiries"

    def __str__(self):
        return f"Inquiry from {self.customer_name} ({self.phone})"


class HeroBanner(models.Model):
    image = models.ImageField(upload_to='banners/', max_length=255, blank=True, null=True)
    title_line_1 = models.CharField(max_length=150, help_text="e.g. Timeless Beauty.")
    title_line_2 = models.CharField(max_length=150, help_text="e.g. Crafted with")
    gold_word = models.CharField(max_length=100, help_text="e.g. Tradition.")
    description = models.TextField(help_text="Banner description paragraph.")
    order = models.IntegerField(default=0, help_text="Slide display order.")
    is_active = models.BooleanField(default=True, help_text="Toggle banner visibility.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"Banner: {self.gold_word} (Active: {self.is_active})"

    @property
    def image_url(self):
        if self.image:
            url = str(self.image)
            if url.startswith('http://') or url.startswith('https://'):
                return url
            if url.startswith('/media/'):
                return f"https://www.api.abgoldjewelery.com{url}"
            if url.startswith('/'):
                return url
            return f"https://www.api.abgoldjewelery.com/media/{url.lstrip('/')}"
        return "/images/hero-bg-full.png"

from rest_framework import serializers
from .models import Category, Product, GoldRate, Inquiry

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source='products.count', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'status', 'product_count']

    def get_image(self, obj):
        if obj.image:
            url = str(obj.image.url if hasattr(obj.image, 'url') else obj.image)
            if url.startswith('http://') or url.startswith('https://'):
                return url
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(url if url.startswith('/media/') else f"/media/{url}")
            clean_url = url if url.startswith('/media/') else f"/media/{url.lstrip('/')}"
            return f"https://www.api.abgoldjewelery.com{clean_url}"
        return "/images/products/heritage-necklace.png"


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_name', 
            'price', 'weight', 'purity', 'description', 
            'image', 'status', 'is_featured', 'is_bestseller', 'is_active', 
            'created_at'
        ]

    def get_image(self, obj):
        if obj.image:
            url = str(obj.image.url if hasattr(obj.image, 'url') else obj.image)
            if url.startswith('http://') or url.startswith('https://'):
                return url
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(url if url.startswith('/media/') else f"/media/{url}")
            clean_url = url if url.startswith('/media/') else f"/media/{url.lstrip('/')}"
            return f"https://www.api.abgoldjewelery.com{clean_url}"
        return "/images/products/heritage-necklace.png"


class GoldRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoldRate
        fields = ['id', 'location', 'gold_22k_per_gram', 'gold_24k_per_gram', 'silver_per_gram', 'updated_at']


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['id', 'customer_name', 'phone', 'email', 'product', 'message', 'created_at']

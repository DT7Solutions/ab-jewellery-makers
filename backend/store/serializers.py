from rest_framework import serializers
from .models import Category, Product, GoldRate, Inquiry

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source='products.count', read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'status', 'product_count']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation.get('image'):
            representation['image'] = "/images/products/heritage-necklace.png"
        return representation


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_name', 
            'price', 'weight', 'purity', 'description', 
            'image', 'status', 'is_featured', 'is_bestseller', 'is_active', 
            'product_code', 'certification', 'tags', 'custom_flags',
            'created_at'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation.get('image'):
            representation['image'] = "/images/products/heritage-necklace.png"
        return representation


class GoldRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoldRate
        fields = ['id', 'location', 'gold_22k_per_gram', 'gold_24k_per_gram', 'silver_per_gram', 'updated_at']


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['id', 'customer_name', 'phone', 'email', 'product', 'message', 'created_at']

from rest_framework import serializers
from .models import Category, Product, GoldRate, Inquiry, HeroBanner

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


class CategoryRelatedField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        if isinstance(data, str) and not data.isdigit():
            try:
                return Category.objects.get(slug=data)
            except Category.DoesNotExist:
                try:
                    return Category.objects.get(name__iexact=data)
                except Category.DoesNotExist:
                    raise serializers.ValidationError(f"Category '{data}' does not exist.")
        return super().to_internal_value(data)


class ProductSerializer(serializers.ModelSerializer):
    category = CategoryRelatedField(queryset=Category.objects.all())
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    description = serializers.CharField(required=False, allow_blank=True, default='')
    weight = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    product_code = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    certification = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    tags = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    custom_flags = serializers.CharField(required=False, allow_blank=True, allow_null=True)

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


class HeroBannerSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = HeroBanner
        fields = ['id', 'image', 'title_line_1', 'title_line_2', 'gold_word', 'description', 'order', 'is_active', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation.get('image'):
            representation['image'] = "/images/hero-bg-full.png"
        return representation

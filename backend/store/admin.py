from django.contrib import admin
from .models import Category, Product, GoldRate, Inquiry

@admin.action(description="Publish selected categories")
def make_category_published(modeladmin, request, queryset):
    queryset.update(status='PUBLISHED')

@admin.action(description="Move selected categories to Draft")
def make_category_draft(modeladmin, request, queryset):
    queryset.update(status='DRAFT')

@admin.action(description="Publish selected products")
def make_product_published(modeladmin, request, queryset):
    queryset.update(status='PUBLISHED')

@admin.action(description="Move selected products to Draft")
def make_product_draft(modeladmin, request, queryset):
    queryset.update(status='DRAFT')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    actions = [make_category_published, make_category_draft]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'purity', 'weight', 'status', 'is_featured', 'is_active')
    list_filter = ('status', 'category', 'purity', 'is_featured', 'is_bestseller', 'is_active')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    actions = [make_product_published, make_product_draft]


@admin.register(GoldRate)
class GoldRateAdmin(admin.ModelAdmin):
    list_display = ('location', 'gold_22k_per_gram', 'gold_24k_per_gram', 'silver_per_gram', 'updated_at')


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'phone', 'email', 'product', 'created_at')
    search_fields = ('customer_name', 'phone', 'email', 'message')

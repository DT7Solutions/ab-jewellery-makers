from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, GoldRateViewSet, InquiryViewSet, HeroBannerViewSet,
    AdminLoginView, AdminLogoutView, AdminChangePasswordView
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'gold-rates', GoldRateViewSet, basename='goldrate')
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'hero-banners', HeroBannerViewSet, basename='herobanner')

urlpatterns = [
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('admin/change-password/', AdminChangePasswordView.as_view(), name='admin-change-password'),
    path('', include(router.urls)),
]

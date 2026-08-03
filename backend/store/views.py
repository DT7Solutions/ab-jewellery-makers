from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Category, Product, GoldRate, Inquiry
from .serializers import CategorySerializer, ProductSerializer, GoldRateSerializer, InquirySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(status='PUBLISHED')
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(status='PUBLISHED', is_active=True)
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)

        if category and category.upper() != 'ALL':
            queryset = queryset.filter(category__name__iexact=category)
        if featured:
            queryset = queryset.filter(is_featured=True)

        return queryset

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_products = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)


class GoldRateViewSet(viewsets.ModelViewSet):
    queryset = GoldRate.objects.all().order_by('-updated_at')
    serializer_class = GoldRateSerializer

    @action(detail=False, methods=['get'])
    def latest(self, request):
        latest_rate = self.queryset.first()
        if latest_rate:
            serializer = self.get_serializer(latest_rate)
            return Response(serializer.data)
        # Default fallback
        return Response({
            'location': 'Guntur, AP',
            'gold_22k_per_gram': '6850.00',
            'gold_24k_per_gram': '7470.00',
            'silver_per_gram': '91.00',
            'updated_at': None
        })


class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer

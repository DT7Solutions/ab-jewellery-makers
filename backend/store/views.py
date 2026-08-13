from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import Category, Product, GoldRate, Inquiry
from .serializers import CategorySerializer, ProductSerializer, GoldRateSerializer, InquirySerializer

class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_staff or user.is_superuser:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'username': user.username,
                    'email': user.email,
                    'is_staff': user.is_staff,
                    'is_superuser': user.is_superuser
                }, status=status.HTTP_200_OK)
            return Response({'error': 'You do not have administrative privileges.'}, status=status.HTTP_403_FORBIDDEN)
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)


class AdminLogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({'success': True}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'No active token found.'}, status=status.HTTP_400_BAD_REQUEST)


class AdminChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not old_password or not new_password:
            return Response({'error': 'Both old and new passwords are required.'}, status=status.HTTP_400_BAD_REQUEST)
            
        if not request.user.check_password(old_password):
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
            
        if len(new_password) < 6:
            return Response({'error': 'New password must be at least 6 characters.'}, status=status.HTTP_400_BAD_REQUEST)
            
        request.user.set_password(new_password)
        request.user.save()
        return Response({'success': True}, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Category.objects.all()
        # If user is staff, allow all categories. Otherwise, only published.
        is_staff = self.request.user and self.request.user.is_staff
        if not is_staff:
            queryset = queryset.filter(status='PUBLISHED')
        
        search = self.request.query_params.get('search', None)
        status_filter = self.request.query_params.get('status', None)
        
        if search:
            queryset = queryset.filter(name__icontains=search)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
            
        return queryset.order_by('name')

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # If user is staff, allow draft and inactive products, otherwise hide them
        is_staff = self.request.user and self.request.user.is_staff
        if not is_staff:
            queryset = queryset.filter(status='PUBLISHED', is_active=True)
            
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        purity = self.request.query_params.get('purity', None)
        status_filter = self.request.query_params.get('status', None)
        search = self.request.query_params.get('search', None)

        if category and category.upper() != 'ALL':
            if category.isdigit():
                queryset = queryset.filter(category_id=category)
            else:
                queryset = queryset.filter(category__slug=category) | queryset.filter(category__name__iexact=category)
        if featured:
            queryset = queryset.filter(is_featured=True)
        if purity:
            queryset = queryset.filter(purity=purity)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if search:
            queryset = queryset.filter(name__icontains=search) | queryset.filter(description__icontains=search)

        return queryset.order_by('-created_at')

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'featured']:
            return [AllowAny()]
        return [IsAdminUser()]

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_products = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)


class GoldRateViewSet(viewsets.ModelViewSet):
    queryset = GoldRate.objects.all().order_by('-updated_at')
    serializer_class = GoldRateSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'latest']:
            return [AllowAny()]
        return [IsAdminUser()]

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

    def get_permissions(self):
        # Anyone can create (post) an inquiry (from contact page)
        if self.action == 'create':
            return [AllowAny()]
        # Only staff members can list, view details, delete inquiries
        return [IsAdminUser()]

    def get_queryset(self):
        queryset = Inquiry.objects.all()
        # Add search and filters
        search = self.request.query_params.get('search', None)
        product = self.request.query_params.get('product', None)
        if search:
            queryset = queryset.filter(customer_name__icontains=search) | queryset.filter(phone__icontains=search) | queryset.filter(message__icontains=search)
        if product:
            queryset = queryset.filter(product_id=product)
        return queryset.order_by('-created_at')

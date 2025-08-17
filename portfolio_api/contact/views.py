from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.views import APIView
from .forms import ContactForm

class ContactView(APIView):
    def post(self, request):
        form = ContactForm(request.data)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            
            try:
                send_mail(
                    f'Portfolio Contact from {name}',
                    message,
                    email,
                    ['your@email.com'],
                    fail_silently=False,
                )
                return JsonResponse({'status': 'success'}, status=200)
            except Exception as e:
                return JsonResponse({'status': 'error', 'error': str(e)}, status=500)
        return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)

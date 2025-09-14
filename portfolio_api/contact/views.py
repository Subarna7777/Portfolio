from rest_framework.views import APIView
from django.http import JsonResponse
from django.core.mail import send_mail
from .models import Contact
from .forms import ContactForm

class ContactView(APIView):
    def post(self, request):
        form = ContactForm(request.data)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            try:
                # 1️⃣ Save to database
                Contact.objects.create(name=name, email=email, message=message)

                # 2️⃣ Send email to host (your inbox)
                send_mail(
                    subject=f'Portfolio Contact from {name}',
                    message=f"From: {name} <{email}>\n\n{message}",
                    from_email='chebaca13@gmail.com',       # must match EMAIL_HOST_USER
                    recipient_list=['chebaca13@gmail.com'], # your inbox
                    fail_silently=False,
                )

                # 3️⃣ Send confirmation email to user
                send_mail(
                    subject="Thanks for contacting me!",
                    message=f"Hi {name},\n\nThank you for your message! I will get back to you soon.\n\nYour message:\n{message}",
                    from_email='chebaca13@gmail.com',      # same verified email
                    recipient_list=[email],                # user’s email from form
                    fail_silently=False,
                )

                # 4️⃣ Respond to frontend
                return JsonResponse(
                    {'status': 'success', 'message': "Message sent successfully! You'll get a confirmation email."},
                    status=200
                )

            except Exception as e:
                return JsonResponse(
                    {'status': 'error', 'message': f"Something went wrong: {str(e)}"},
                    status=500
                )

        # Invalid form
        return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)

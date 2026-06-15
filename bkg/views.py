from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    context = {
        'submitted': False,
        'contact_name': '',
        'contact_email': '',
        'contact_phone': '',
        'contact_message': '',
        'photo_range': range(1, 37),
    }
    if request.method == 'POST':
        context['submitted'] = True
        context['contact_name'] = request.POST.get('name', '')
        context['contact_email'] = request.POST.get('email', '')
        context['contact_phone'] = request.POST.get('phone', '')
        context['contact_message'] = request.POST.get('message', '')
        # Logique d'envoi d'email à ajouter ici si besoin

    return render(request, 'bkg/home.html', context)

def services(request):
    return render(request, 'bkg/services.html')

def references(request):
    context = {
        'photo_range': range(1, 37),
    }
    return render(request, 'bkg/references.html', context)

def contact(request):
    context = {
        'submitted': False,
        'contact_name': '',
        'contact_email': '',
        'contact_phone': '',
        'contact_message': '',
    }
    if request.method == 'POST':
        context['submitted'] = True
        context['contact_name'] = request.POST.get('name', '')
        context['contact_email'] = request.POST.get('email', '')
        context['contact_phone'] = request.POST.get('phone', '')
        context['contact_message'] = request.POST.get('message', '')
        # Ici, vous pourriez ajouter la logique d'envoi d'email

    return render(request, 'bkg/contact.html', context)

def chat_api(request):
    user_message = request.GET.get('message', '').lower()
    
    # Logique simple d'assistance IA (simulée)
    if 'service' in user_message or 'construction' in user_message:
        response = "BKG propose des services en Construction, Réhabilitation, Génie Civil et Clôtures."
    elif 'contact' in user_message or 'appel' in user_message:
        response = "Vous pouvez nous joindre au (+225) 07 47 63 64 86 ou par email à guillaumebrou27@gmail.com."
    elif 'adresse' in user_message or 'lieu' in user_message:
        response = "Nous sommes situés à Angré 8ème Tranche, Abidjan, Côte d'Ivoire."
    elif 'prix' in user_message or 'devis' in user_message:
        response = "Pour un devis personnalisé, veuillez utiliser notre formulaire de contact ou nous appeler directement."
    else:
        response = "Bonjour ! Je suis BKG. Comment puis-je vous aider dans votre projet de construction ?"

    return JsonResponse({'response': response})

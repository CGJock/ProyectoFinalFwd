from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import  RegisterPsychologistViewSet,PychologistsList,CreateTicket,TicketList,UpdateTicket,FileUploadView,CreateCase,PsychologistUser

router_psychologist = DefaultRouter()

router_psychologist.register(prefix='register-psychologist',viewset=RegisterPsychologistViewSet, basename='register-psychologist')
router_psychologist.register(prefix='psychologists',viewset=PychologistsList, basename='list-psychologists')
router_psychologist.register(prefix='create-case',viewset=CreateCase,basename='create_case')
router_psychologist.register(prefix='create-ticket',viewset=CreateTicket,basename='create-ticket')
router_psychologist.register(prefix='list-tickets', viewset=TicketList, basename='list-tickets')
router_psychologist.register(prefix='all-psychologists',viewset=PsychologistUser, basename='all-psychologists')
router_psychologist.register(prefix='upload-file',viewset=FileUploadView, basename='upload-file')


urlpatterns = [
    path('', include(router_psychologist.urls)),
    path('update-ticket/<int:id_ticket>/', UpdateTicket.as_view({'patch': 'partial_update'}), name='ticket-update')
]


# UsterkaSGGW
Aplikacja służąca do zgłaszania usterek na kampusie SGGW. 
Po uruchomieniu aplikacji użytkownik może utworzyć nowe zgłoszenie, gdzie powinien załadować zdjęcie usterki. 
Po załadowaniu zdjęcia generowane są tagi (przy pomocy interfejsu API Azure Cognitive Services Computer Vision LUB Google Cloud Vision - co można skonfigurować w pliku constants.js), 
na podstawie których automatycznie wybierana jest kategoria. Poza zdjęciem użytkownik powininen też podać lokalizację, może także dodać słowny opis usterki. Po zatwierdzeniu zgłoszenia jest ono wysyłane mailowo do odpowiedniej osoby (pracowników wraz z mailami i kategoriami można sprecyzować w pliku StaffPeople.txt, skąd zostaną załadowani po utworzeniu bazy danych).

## Ekrany aplikacji
### Lista zgłoszeń
Pierwszy ekran po uruchomieniu aplikacji. Widoczne są na nim wszystkie utworzone zgłoszenia, gdzie najnowsze pojawiają się na samej górze.

![image](https://user-images.githubusercontent.com/56516909/164992120-6a0b1ffb-80a9-4454-8b91-54e46b26559a.png)

### Formularz zgłoszenia
Do formularzu można przejść z listy zgłoszeń po kliknięciu "+ Nowe zgłoszenie".

![image](https://user-images.githubusercontent.com/56516909/164991763-a44b4528-99d2-4935-b840-6942bc319af5.png)
### Szczegóły zgłoszenia
Do ekranu szczegółów użytkownik jest przekierowywany po wysłaniu zgłoszenia. Można także przejść do ekranu szczegółów po wybraniu zgłoszenia z ekranu listy zgłoszeń.

![image](https://user-images.githubusercontent.com/56516909/164991754-e388fb9d-a812-46fd-9617-c622bba4c7a8.png)


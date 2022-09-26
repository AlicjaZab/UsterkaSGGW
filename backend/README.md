# Usterka SGGW - Instrukcja instalacji serwera backend dla aplikacji

Poniższa instrukcja przedstawiona została na przykładzie Hostingu dostarczonego przez firmę MyDevil w wersji MD1. 
Jest to tańsza alternatywa w porównaniu do deploymentu w chmurze.

Po wykupieniu usługi należy się zalogować na panel zarządczy dostępny pod adresem z maila aktywacyjnego usługi, 
następnie w panelu należy dodać nową stronę, gdzie nazwa domeny to adres, pod którym będzie dostępny backend.
Należy ustawić typ strony jako PHP, oraz zaznaczyć obsługę DNS (by umożliwić utworzenie certyfikatu SSL).

![image](https://user-images.githubusercontent.com/56516909/192333831-848d9f91-a5f9-465e-9bd0-92ceaf71136a.png)

Po klinięciu "Dodaj" na serwerze utworzony zostanie folder w lokalizacji
```
 ~/domains/{nazwa domeny} 
 ```

w którym należy umieścić pliki strony.

Dla utworzonego folderu należy kliknąć przycisk "Zarządzaj" i ustawić szczegóły strony jak poniżej 
(dla "Katalog", w miejscu "jaylabit" wpisać nazwę klienta z maila aktywacyjnego, w miejscu "usterkasggw.jaylab.pl" nazwę utworzonej domeny, 
pole "Katalogi Open Basedir" powinno wypełnić się automatycznie):

/usr/home/jaylabit/domains/usterka-sggw.jaylab.pl/public_html:/tmp:/usr/share:/usr/local/share:/dev:/tmp:/usr/share:/usr/local/share:/dev:/usr/home/jaylabit/domains/usterka-sggw.jaylab.pl


![image](https://user-images.githubusercontent.com/56516909/192348351-6595ab9a-77b8-4b04-be5e-7fb0be462b24.png)



## Certyfikat SSL

Aby utworzyć certyfikat należy wejśc do zakładki SSL po lewej stronie i wybrać Strony WWW w menu na górze:

![image](https://user-images.githubusercontent.com/56516909/192336097-9154ec42-805b-41c9-9cab-417bdea9a572.png)

Dla pierwszego adresu IP należy utworzyć rekord A u swojego dostawcy DNS, instrukcja w tym przypadku będzie się 
różniła w przypadku innych dostawców i należy sprawdzić jak wykonać taką akcję w Wiki danego dostawcy. Przykładowo,
skorzystać można z dostawcy OVH, dla którego instrukcja znajduje się pod tym linkiem https://docs.ovh.com/ie/en/domains/web_hosting_how_to_edit_my_dns_zone/.

Docelowy rekord powinien wyglądać jak poniżej:

![image](https://user-images.githubusercontent.com/56516909/192336303-bace95db-9e44-4e4b-9e5d-4e88196ba7bd.png)

Aby sprawdzić poprawność rekordu można wykonać polecenie **dig**, którego wynik powinien wyglądac jak poniżej:

![image](https://user-images.githubusercontent.com/56516909/192336539-b77a7c55-97de-4b49-9def-08671f1ddcb6.png)

Aby wygenerować certyfikat SSL, należy kliknąć przycisk "Zarządzaj" dla pierwszego adresu IP i następnie na górnym menu „Dodaj certyfikat”.
W wyświetlonym menu należy wybrać jako typ „Wygeneruj certyfikat Let’s Encrypt” i wybrać nazwę domeny podaną we wcześniejszych krokach.

![image](https://user-images.githubusercontent.com/56516909/192337240-4736469b-712d-428d-b668-d8272613d182.png)

Operacja powinna zakończyć się po chwili i na liście "Certyfikaty SNI" powinien pojawić się nowy certyfikat dla wybranej domeny:
![image](https://user-images.githubusercontent.com/56516909/192337368-1cd189e3-6507-4b13-a77d-06277ee73b0b.png)

## Baza danych

Aby dodać bazę danych, z panelu po lewej stronie należy wybrać MySQL, a następnie na górnym menu „Dodaj bazę”, po czym uzupełnić formularz. 
Zapamiętaj dane wejściowe, będą one potrzebne przy konfiguracji aplikacji. Dane te mogą wyglądać jak poniżej:

![image](https://user-images.githubusercontent.com/56516909/192338100-00999453-29d6-4e0d-9b3c-f730f0deedd1.png)

Po kliknięciu "Dodaj" w zakładce "Lista baz danych" pojawi się utworzona baza danych. Z tego miejsca zapamiętaj adres serwera, 
który również będzie potrzebny przy konfiguracji aplikacji.

![image](https://user-images.githubusercontent.com/56516909/192338717-8f7a3506-1474-47fa-b945-3583ce14c0f1.png)

## Instalacja plików strony

Pliki pobrane z repozytorium należy umieścić w katalogu aplikacji (~/domains/{nazwa domeny}). 
Aby to zrobić można wykorzystać menedżer plików w panelu MyDevil. Prawidłowo umieszczone pliki powinny wyglądać następująco:

![image](https://user-images.githubusercontent.com/56516909/192339075-660b60a8-70ae-4d9d-a392-9641706960cc.png)

## Konfiguracja

Aby połączyć się z hostingiem za pomocą SSH należy uruchomić komendę
```
ssh nazwakonta@adresIPserwera
```
gdzie "nazwakonta" to nazwa konta z maila aktywacyjnego. Następnie należy podać hasło z maila aktywacyjnego usługi.

![image](https://user-images.githubusercontent.com/56516909/192339848-6d863f62-ae01-4fcc-9042-422767b7390d.png)



### Zmienne środowiskowe

W celu konfiguracji należy poprawnie uzupełnić zmienne środowiskowe. Aby edytować plik można skorzystać z komendy
```
nano domains/{podany adres/nazwa strony}/.env
```

* **DATABASE_URL** - aby skonfigurować połączenie z bazą danych, należy uzupełnić wartość zmiennej według wzoru:
  ```
  {system-zarządzania-bazą-danych}://{nazwa-użytkownika}:{hasło-użytkownika}@{adres-bazy-danych}:{port}/{nazwa-bazy-danych}?serverVersion=5.7
  ```
  Dla przykładowych danych podanych w tej instrukcji: 
  ```
  > DATABASE_URL="mysql://m1367_usterka:xxxxxx@mysql30.mydevil.net:3306/m1367_usterka?serverVersion=5.7"
  ```
  
* **MAILER_DSN** - aby skonfigorować mailer, należy uzupełnić wartość według instrukcji https://symfony.com/doc/current/mailer.html. 
  Przykładowa wartość dla serwera utworzonego w tej instrukcji: 
  ```
  mtp://sendmail@jaylab.pl:xxxxxxxx@mail30.mydevil.net:25
  ```
  
* **HTTP_BASIC_AUTH_USERNAME** - nazwa użytkownika, która ma być wykorzystywana przy autoryzacji zapytań API (Basic Auth). Przykładowo:
  ```
  HTTP_BASIC_AUTH_USERNAME=admin
  ```
  
* **HTTP_BASIC_AUTH_PASSWORD** - hasło użytkownika, które ma być wykorzystywane przy autoryzacji zapytań API (Basic Auth). Przykładowo:
  ```
  HTTP_BASIC_AUTH_PASSWORD=admin
  ```
  
* **TAGGS_PROVIDER** - usługa chmurowa, od której powinny być pobierane tagi do zdjęć. Prawidłowe wartości to Google/Azure/None. Przykładowo:
  ```
  TAGGS_PROVIDER="Google"
  ```
  
* **AZURE_BASE_URL** - adres API udostępnionego przez usługę Microsoft Azure. Wymagane przy ustawieniu TAGGS_PROVIDER="Azure". Przykładowo:
   ```
   AZURE_BASE_URL="https://image-recognition-project.cognitiveservices.azure.com/vision/v3.2"
   ```
  
* **AZURE_API_KEY** - klucz API udostępniony przez usługę Microsoft Azure. Wymagane przy ustawieniu TAGGS_PROVIDER="Azure". Przykładowo:
  ```
  AZURE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxx"
  ```
  
* **GOOGLE_API_KEY** - klucz API udostępniony przez usługe Google Cloud. Wymagane przy ustawieniu TAGGS_PROVIDER="Google". Przykładowo:
  ```
  GOOGLE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxx"
  ```

Pozostałych zmiennych należy nie zmieniać.


### Przykłdowe dane wczytywane do bazy
  
 Przy uruchomieniu aplikacji wczytywane są przykadowe dane do bazy danych: kategorie i osoby z personelu. 
  
 Kategorie zdefiniowane są w folderze **src/DataFixtures/Categories.txt**. Pliku z kategoriami należy nie zmieniać w celu poprawnego działania aplikacji.
  
 Osoby z personelu zdefiniować można w pliku znajdującym się w folderze **src/DataFixtures/StaffPeople.txt**.
 Każda linia w pliku odpowiada jednej osobie, którą zdefiniować należy według schematu:
 ```
 <imię> <nazwisko> <adres email> [<nazwa kategorii 1> <nazwa ketagorii 2> ...]
 ```
 
 gdzie po adresie email zdefiniować nalezy kategorie (jedną lub więcej), za które odpowiedzialna jest osoba 
 (czyli będzie otrzymywać maile dotyczące zgłoszeń z danych kategorii). Kategorie wymieniać należy nazwami zdefiniowanymi w pliku src/DataFixtures/Categories.txt.

 Przykładowa definicja osoby:
 ```
 Jan Kowalski jan.kowalski@email.com Lighting Electrical_system
 ```
 
 Aby nie wczytywać żadnych osób z personelu należy wyczyścić plik. Osoby te można dodawać i usuwać w trakcie działania aplikacji przez API.
  
## Instalacja zależności, uruchomienie aplikacji
  
  Ustawienie domyślnej wersji php na serwerze:
  ```
  mkdir ~/bin
  ln -s /usr/local/bin/php80 ~/bin/php
  echo 'export PATH=$HOME/bin:$PATH' >> $HOME/.bash_profile
  source $HOME/.bash_profile
  ```
  
  Przejście do katalogu aplikacji
  ```
  cd domains/{nazwa domeny}
  ```
  
  Ustawienie domyślnej wersji PHP dla webserwera
  ```
  echo "AddType application/x-httpd-php80 .php" >> .htaccess
  ```
  
  Ustawienie sposobu logowania interpretera PHP
  ```
  cat <<EOT >> .user.ini
  error_reporting = E_ERROR | E_WARNING | E_PARSE | E_NOTICE
  display_errors = off
  log_errors = on
  error_log = /usr/home/{nazwa konta z maila aktywacyjnego}/domains/{nazwa domeny}/phperror.log
  EOT
  ```
  
  Utworzenie linku do udostępnienia strony
  ```
  ln -s /usr/home/{nazwa konta z maila aktywacyjnego}/domains/{nazwa domeny}/public /usr/home/{nazwa konta z maila aktywacyjnego}/domains/{nazwa domeny}/public_html
  ```
  
  Instalacja zależności composera
  ```
  composer2 update symfony/flex --no-plugins --no-scripts
  composer2 install
  composer2 require symfony/apache-pack
  ```
  
  Utworzenie schematu bazy danych
  ```
  php bin/console doctrine:schema:create
  ```
  
  Wczytanie danych do bazy (kategorie, osoby z personelu)
  ```
  php bin/console doctrine:fixtures:load
  ```
  
  ---
  
  Po wykonaniu powyższych akcji strona powinna działać pod ustalonym adresem.
  Aby sprawdzić działanie można przykładowo wykonać zapytanie GET {adres aplikacji}/api/categories z autoryzacją Basic Auth i danymi logowania podanymi w zmiennych
  środowiskowych HTTP_BASIC_AUTH_USERNAME i HTTP_BASIC_AUTH_PASSWORD.
  
  

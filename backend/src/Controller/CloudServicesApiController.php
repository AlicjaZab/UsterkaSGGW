<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;
use App\Entity\MediaObject;
use Symfony\Component\HttpFoundation\File\File;

use Symfony\Component\HttpFoundation\RedirectResponse;

use Psr\Log\LoggerInterface;

class CloudServicesApiController extends AbstractController 
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    #[Route ('/api/tagsForImage')]
    public function getTagsForImage(Request $request): Response 
    {
        $taggsProvider = $_ENV['TAGGS_PROVIDER'];
        $response = [
            'taggsProvider'=> $taggsProvider
        ];
        if ($taggsProvider == 'Azure') {
            $uploadedFile = $request->files->get('file');
            if (!$uploadedFile) {
                throw new BadRequestHttpException('"file" is required');
            }
            $azureUrl = $_ENV['AZURE_BASE_URL'] . $_ENV['AZURE_TAGS_ENDPOINT'];
            $azureApiKey = $_ENV['AZURE_API_KEY'];

            $httpClient = HttpClient::create();
            
             $formFields = [
                'file_field' => DataPart::fromPath($uploadedFile-> getPath( ) . '/'. $uploadedFile -> getFilename()),
            
             ];
             $formData = new FormDataPart($formFields);
             $headers = $formData->getPreparedHeaders()->toArray();
             $headers['Ocp-Apim-Subscription-Key'] = $azureApiKey;
            $azureResponse = $httpClient->request('POST', $azureUrl, [
                'headers' => $headers,
                'body' => $formData->bodyToIterable(),
            ]);
            if ($azureResponse->getStatusCode() !== 200) {
                return $this->json($azureResponse->getContent(false) . $azureResponse->getStatusCode());
            }
            $response['response'] = json_decode($azureResponse->getContent(false));

        }
        if ($taggsProvider == 'Google') {
            $uploadedFile = $request->files->get('file');
            if (!$uploadedFile) {
                throw new BadRequestHttpException('"file" is required');
            }
            $data = file_get_contents($uploadedFile-> getPath( ) . '/'. $uploadedFile -> getFilename());
            $base64format=base64_encode($data);

            $body = [
                'requests'=> array(
                    'image'=> [ 'content'=> $base64format],
                    'features'=> array(       
                        'type'=> "LABEL_DETECTION"
                    )
                )
             ];

            $httpClient = HttpClient::create();

            $googleUrl = $_ENV['GOOGLE_CLOUD_URL'] . $_ENV['GOOGLE_API_KEY'];

            $googleResponse = $httpClient->request('POST', $googleUrl, [
                'headers' => ['Content-Type'=> 'application/json'],
                'body' => json_encode($body)]);

            if ($googleResponse->getStatusCode() !== 200) {
                return $this->json($googleResponse->getContent(false));
            }
            $response['response'] = json_decode($googleResponse->getContent(false));
            
        }
        
        return $this->json($response);

        
        
    }
}
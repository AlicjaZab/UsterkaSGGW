<?php

namespace App\Controller;

use App\Repository\StaffPersonRepository;
use App\Repository\MediaObjectRepository;
use App\Repository\CategoryRepository;
use App\Handler\EmailSendingHandler;
use App\Entity\Report;
use App\Entity\Location;
use App\Service\EmailSendingService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class ReportController extends AbstractController
{
    private StaffPersonRepository $staffPersonRepository;
    private MediaObjectRepository $mediaObjectRepository;
    private CategoryRepository $categoryRepository;
    private EmailSendingService $emailSendingService;

    public function __construct(StaffPersonRepository $staffPersonRepository, MediaObjectRepository $mediaObjectRepository, CategoryRepository $categoryRepository, EmailSendingService $emailSendingService) {
        $this->staffPersonRepository = $staffPersonRepository;
        $this->mediaObjectRepository = $mediaObjectRepository;
        $this->categoryRepository = $categoryRepository;
        $this->emailSendingService = $emailSendingService;
    }


    public function __invoke(Request $request): Report {
        $requestBody = $request->toArray();
        $report = new Report();

        # set category
        if (! array_key_exists("category", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: category');
        }
        $category = $this->categoryRepository->findByName($requestBody["category"]);
        if ($category == null) throw new BadRequestHttpException('Provided category does not exist: ' . $requestBody["category"]);
        $report->setCategory($category);
        
        # find & set people to find
        $peopleToNotify = $this->staffPersonRepository->findByCategory($category);
        foreach($peopleToNotify as $personToNotify) {
            $report->addNotifiedPerson($personToNotify);
        }

        # set description
        if (array_key_exists("description", $requestBody)){
            $report->setDescription($requestBody["description"]);
        }

        # set create date
        if (! array_key_exists("createDate", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: createDate');
        }
        $report->setCreateDate(new \DateTime($requestBody["createDate"]));

        # set location
        $location = new Location();
        if (! array_key_exists("location", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: location');
        }
        if (array_key_exists("description", $requestBody["location"])){
            $location->setDescription($requestBody["location"]["description"]);
        }
        if (array_key_exists("latitude", $requestBody["location"])){
            $location->setLatitude($requestBody["location"]["latitude"]);
            $location->setLongitude($requestBody["location"]["longitude"]);
        }
        $report->setLocation($location);

        # find & set photos
        if (! array_key_exists("photos", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: photos');
        }
        foreach($requestBody["photos"] as $photoUrl) {
            $urlPieces = explode("/", $photoUrl);
            $photoId = $urlPieces[3];
            $photo = $this->mediaObjectRepository->findById($photoId);
            if ($photo == null) throw new BadRequestHttpException('Photo with provided ID does not exist: ' . $photoId);
            $report->addPhoto($photo);
        }

        # send email
        try{
            $this->emailSendingService->send($report);
        } catch  (Exception $e) {
            print($e);
        }
        
        return $report;
    }
}
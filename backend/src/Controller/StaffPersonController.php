<?php

namespace App\Controller;

use App\Repository\StaffPersonRepository;
use App\Repository\CategoryRepository;
use App\Entity\StaffPerson;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class StaffPersonController extends AbstractController
{
    private StaffPersonRepository $staffPersonRepository;
    private CategoryRepository $categoryRepository;

    public function __construct(StaffPersonRepository $staffPersonRepository, CategoryRepository $categoryRepository) {
        $this->staffPersonRepository = $staffPersonRepository;
        $this->categoryRepository = $categoryRepository;
    }


    public function __invoke(Request $request): StaffPerson {
        $requestBody = $request->toArray();
        $staffPerson = new StaffPerson();

        # set name
        if (! array_key_exists("name", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: name');
        }
        $staffPerson->setName($requestBody["name"]);


        # set surname
        if (! array_key_exists("surname", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: surname');
        }
        $staffPerson->setSurname($requestBody["surname"]);


        # set email
        if (! array_key_exists("email", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: email');
        }
        if (!filter_var($requestBody["email"], FILTER_VALIDATE_EMAIL)) {
            throw new BadRequestHttpException('Invalid field format: email');
        }
        if ($this->staffPersonRepository->findByEmail($requestBody["email"]) != null) {
            throw new BadRequestHttpException('Provided email already exists in the database. Please specify different one.');
        }
        $staffPerson->setEmail($requestBody["email"]);


        # set categories
        if (! array_key_exists("categories", $requestBody)){
            throw new BadRequestHttpException('Mandatory value not provided in request body: categories');
        }
        if (! is_array($requestBody["categories"])){
            throw new BadRequestHttpException('Invalid field format: categories should be provided as array of string.');
        }
        foreach($requestBody["categories"] as $category_name) {
            $category = $this->categoryRepository->findByName($category_name);
            if ($category == null) throw new BadRequestHttpException('Provided category does not exist: ' . $category_name);
            $staffPerson->addCategory($category);
        }

        return $staffPerson;
    }
}
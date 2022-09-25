<?php
// src/DataFixtures/AppFixtures.php
namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\StaffPerson;
use App\Repository\CategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class AppFixtures extends Fixture
{

    private CategoryRepository $categoryRepository;

    public function __construct( CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }
    // use with: php bin/console doctrine:fixtures:load
    // careful! it purges database.
    public function load(ObjectManager $manager)
    {
        $categoryNames = file("src/DataFixtures/Categories.txt", FILE_IGNORE_NEW_LINES);
        foreach ($categoryNames as $categoryName) {
            $category = new Category();
            $category->setName($categoryName);
            $manager->persist($category);
        }
        $manager->flush();

        $staffPeopleData = file("src/DataFixtures/StaffPeople.txt", FILE_IGNORE_NEW_LINES);
        foreach ($staffPeopleData as $staffPersonData) {
            $staffPersonDataArray = explode(" ", $staffPersonData);
            $staffPerson = new StaffPerson();
            $staffPerson->setName($staffPersonDataArray[0]);
            $staffPerson->setSurname($staffPersonDataArray[1]);
            $staffPerson->setEmail($staffPersonDataArray[2]);
            for ($i = 3; $i < count($staffPersonDataArray); $i++) {
                $category = $this->categoryRepository->findByName($staffPersonDataArray[$i]); //not working - why ????
                if ($category == null) throw new BadRequestHttpException('Provided category does not exist: ' . $staffPersonDataArray[$i]);
                $staffPerson->addCategory($category);
            }
            $manager->persist($staffPerson);
        }

        $manager->flush();
    }
}
<?php

namespace App\Repository;

use App\Entity\StaffPerson;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method StaffPerson|null find($id, $lockMode = null, $lockVersion = null)
 * @method StaffPerson|null findOneBy(array $criteria, array $orderBy = null)
 * @method StaffPerson[]    findAll()
 * @method StaffPerson[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StaffPersonRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StaffPerson::class);
    }

    /**
     * @return StaffPerson[] Returns an array of people assigned to specified category
     */
    
    public function findByCategory($category)
    {
        return $this->createQueryBuilder('s')
        ->andWhere(':category MEMBER OF s.categories')
            ->setParameter('category', $category)
            ->orderBy('s.surname', 'ASC')
            ->orderBy('s.name', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    

    // /**
    //  * @return StaffPerson[] Returns an array of StaffPerson objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?StaffPerson
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

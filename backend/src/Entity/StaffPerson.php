<?php

namespace App\Entity;

use App\Repository\StaffPersonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=StaffPersonRepository::class)
 */
class StaffPerson
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"report-read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"report-read"})
     */
    private $surname;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $email;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class)
     */
    private $categories;

    /**
     * @ORM\ManyToMany(targetEntity=Report::class, mappedBy="notifiedPeople")
     */
    private $reports;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->reports = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        $this->categories->removeElement($category);

        return $this;
    }

    /**
     * @return Collection|Report[]
     */
    public function getReports(): Collection
    {
        return $this->reports;
    }

    // public function addReport(Report $report): self
    // {
    //     if (!$this->reports->contains($report)) {
    //         $this->reports[] = $report;
    //         $report->addNotifiedPerson($this);
    //     }

    //     return $this;
    // }

    // public function removeReport(Report $report): self
    // {
    //     if ($this->reports->removeElement($report)) {
    //         $report->removeNotifiedPerson($this);
    //     }

    //     return $this;
    // }
}

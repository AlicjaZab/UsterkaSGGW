<?php

namespace App\Entity;

use App\Controller\ReportController;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ReportRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['report-read']],
    denormalizationContext: ['groups' => ['report-write']],
    order: ['createDate' => 'DESC'],
    itemOperations: ['get'],
    collectionOperations: [
        'get',
        'post' => [
            'controller' => ReportController::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'report_create'],
        ],
    ]
)]
class Report
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"report-read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="reports")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"report-write", "report-read"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"report-write", "report-read"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"report-write", "report-read"})
     */
    private $createDate;

    /**
     * @ORM\OneToMany(targetEntity=MediaObject::class, mappedBy="report")
     * @Groups({"report-write", "report-read"})
     */
    private $photos;

    /**
     * @ORM\OneToOne(targetEntity=Location::class, mappedBy="report", cascade={"persist", "remove"})
     * @Groups({"report-write", "report-read"})
     */
    private $location;

    /**
     * @ORM\ManyToMany(targetEntity=StaffPerson::class, inversedBy="reports")
     * @Groups({"report-write", "report-read"})
     */
    private $notifiedPeople;
    

    public function __construct()
    {
        $this->photos = new ArrayCollection();
        $this->notifiedPeople = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreateDate(): ?\DateTimeInterface
    {
        return $this->createDate;
    }

    public function setCreateDate(\DateTimeInterface $createDate): self
    {
        $this->createDate = $createDate;

        return $this;
    }

    /**
     * @return Collection|MediaObject[]
     */
    public function getPhotos(): Collection
    {
        return $this->photos;
    }

    public function addPhoto(MediaObject $photo): self
    {
        if (!$this->photos->contains($photo)) {
            $this->photos[] = $photo;
            $photo->setReport($this);
        }

        return $this;
    }

    public function removePhoto(MediaObject $photo): self
    {
        if ($this->photos->removeElement($photo)) {
            // set the owning side to null (unless already changed)
            if ($photo->getReport() === $this) {
                $photo->setReport(null);
            }
        }

        return $this;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(Location $location): self
    {
        // set the owning side of the relation if necessary
        if ($location->getReport() !== $this) {
            $location->setReport($this);
        }

        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection|StaffPerson[]
     */
    public function getNotifiedPeople(): Collection
    {
        return $this->notifiedPeople;
    }

    public function addNotifiedPerson(StaffPerson $notifiedPerson): self
    {
        if (!$this->notifiedPeople->contains($notifiedPerson)) {
            $this->notifiedPeople[] = $notifiedPerson;
        }

        return $this;
    }

    public function removeNotifiedPerson(StaffPerson $notifiedPerson): self
    {
        $this->notifiedPeople->removeElement($notifiedPerson);

        return $this;
    }
}

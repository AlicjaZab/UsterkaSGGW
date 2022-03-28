<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * add chere a małpa and scpecify exactly what operations to use and how
*  ApiResource(
*       collectionOperations={
*           "get"={
*               "access_control"="is_granted('IS_AUTHENTICATED_FULLY')"
*           },
*           "post"={
*               "access_control"="is_granted('IS_AUTHENTICATED_FULLY')"
*           }
*       },
*       itemOperations={
*       "get"={
*               "access_control"="is_granted('ROLE_ADMIN') or object.getUser() == user"
*           },
*           "put"={
*               "access_control"="is_granted('ROLE_ADMIN') or object.getUser() == user"
*          },
*           "delete"={
*               "access_control"="is_granted('ROLE_ADMIN') or object.getUser() == user"
*          }
*       }
*
 * @ORM\Entity(repositoryClass=ReportRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['report-read']],
    denormalizationContext: ['groups' => ['report-write']],
    order: ['createDate' => 'DESC']
    //denormalizationContext: ['groups' => ['photos']]
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
     * @ORM\Column(type="string", length=50)
     * @Groups({"report-write", "report-read"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"report-write", "report-read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"report-write", "report-read"})
     */
    private $status;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"report-write", "report-read"})
     */
    private $createDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"report-write", "report-read"})
     */
    private $closeDate;

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
     * @ORM\ManyToOne(targetEntity=StaffPerson::class)
     * @Groups({"report-read"})
     */
    private $assignedPerson;

    public function __construct()
    {
        $this->photos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

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

    public function getCloseDate(): ?\DateTimeInterface
    {
        return $this->closeDate;
    }

    public function setCloseDate(?\DateTimeInterface $closeDate): self
    {
        $this->closeDate = $closeDate;

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

    public function getAssignedPerson(): ?StaffPerson
    {
        return $this->assignedPerson;
    }

    public function setAssignedPerson(?StaffPerson $assignedPerson): self
    {
        $this->assignedPerson = $assignedPerson;

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\LocationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=LocationRepository::class)
 */
class Location
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"report-write", "report-read"})
     */
    private $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"report-write", "report-read"})
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"report-write", "report-read"})
     */
    private $description;

    /**
     * @ORM\OneToOne(targetEntity=Report::class, inversedBy="location", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $report;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

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

    public function getReport(): ?Report
    {
        return $this->report;
    }

    public function setReport(Report $report): self
    {
        $this->report = $report;

        return $this;
    }
}

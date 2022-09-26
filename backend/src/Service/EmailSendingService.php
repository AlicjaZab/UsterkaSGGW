<?php

namespace App\Service;

use App\Entity\Report;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

final class EmailSendingService 
{
    private MailerInterface $mailer;

    public function __construct( MailerInterface $mailer) {
        $this->mailer = $mailer;
    }

    public function send(Report $report): Void {
        $recipients = $report->getNotifiedPeople();
        foreach($recipients as $reciepient) {
            $reciepientEmail = $reciepient->getEmail();
            $category = $report->getCategory()->getName();
            $mapLink = $report->getLocation()->getLatitude() == null ? null : 
                'https://maps.google.com/?q=' . $report->getLocation()->getLatitude() . ',' . $report->getLocation()->getLongitude();


            $email = (new TemplatedEmail())
                ->from(new Address($_ENV['SERVER_MAIL'], 'Usterka SGGW'))
                ->to($reciepientEmail)
                ->subject("New report for category " . $category)
                ->htmlTemplate('email/new-report-created.html.twig')
                ->context([
                    'reciepient' => $reciepient,
                    'report' => $report,
                    'mapLink' => $mapLink
                ]);

            foreach($report->getPhotos() as $photo) {
                $photo_path = 'media/' . $photo->filePath;
                $filename = 'photo' . $photo->getId() . '.jpg';
                $email
                    ->embed(fopen($photo_path, 'r'), $filename);
            }
            try {
                $this->mailer->send($email);
            } catch( Exception $e) {
                print($e);
            }
           
        }
        
    }
}
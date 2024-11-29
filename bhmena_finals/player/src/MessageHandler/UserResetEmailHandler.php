<?php 
namespace App\MessageHandler;

use App\Message\UserResetEmail;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class UserResetEmailHandler
{
    public function __construct(
        private UserRepository $userRepository,
        private MailerInterface $mailer,
        private EntityManagerInterface $entityManager,
    ) {}

    public function __invoke(UserResetEmail $userResetEmail): void
    {
        $user = $this->userRepository->find($userResetEmail->getUserId());

        $email = (new TemplatedEmail())
            ->from('blackhatmea.web@gmail.com')
            ->to($userResetEmail->getEmail())
            ->subject('Email Change Verification')
            ->htmlTemplate('email/email_reset.html.twig')
            ->context([
                'user' => $user,
                'emailReset' => $userResetEmail->getEmail()
            ]);

        if(!str_contains(strtolower($email->getTo()[0]->toString()),'admin@blackhat.com')){
            $this->mailer->send($email);
        }
    }
}
?>
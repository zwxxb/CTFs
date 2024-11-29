<?php
// src/Controller/UserController.php
namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractController
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly EntityManagerInterface $entityManager
    ) {}

    #[Route(path: '/email-validation/{token}', name: 'user_email_validation', methods: ['GET'])]
    public function emailValidation(string $token): Response
    {
        $user = $this->userRepository->findOneBy(['emailTokenReset' => $token]);
        
        if (null === $user) {
            return $this->render('security/login.html.twig', [
                'errorToken' => 'Confirmation token is invalid.',
            ]);
        }

        $currentTime = new \DateTime();
        if ($user->getEmailTokenExpiration() < $currentTime) {
            return $this->render('security/login.html.twig', [
                'errorToken' => 'Confirmation token has expired.'
            ]);
        }

        $user->updateEmail();

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->render('security/login.html.twig', [
            'success' => 'Your email address has been successfully confirmed. Please sign in.'
        ]);
    }
}

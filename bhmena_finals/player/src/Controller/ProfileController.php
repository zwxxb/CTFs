<?php
namespace App\Controller;

use App\Message\UserResetEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Doctrine\Persistence\ManagerRegistry;

class ProfileController extends AbstractController
{    
    #[Route('/profile', name: 'app_profile')]
    public function index(Request $request, MessageBusInterface $messageBus, ManagerRegistry $doctrine) : Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->redirectToRoute('app_login');
        }

        if ($request->isMethod('POST')) {
            $newEmail = $request->request->get('email');
            $entityManager = $doctrine->getManager();

            if ($newEmail && $newEmail !== $user->getEmail()) {
                $user->setEmailReset($newEmail);
                $user->setEmailTokenReset(uniqid());
                $user->setEmailTokenExpiration(new \DateTime('+1 day'));

                $entityManager->persist($user);
                $entityManager->flush();

                $messageBus->dispatch(new UserResetEmail($user->getId(), $newEmail));

                $this->addFlash('success', 'A verification email has been sent to your new email address.');
            }

            $uploadedFile = $request->files->get('profilePicture');
            $newFilename="";
            if ($uploadedFile) {
                $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.jpeg';

                try {
                    $uploadedFile->move(
                        $this->getParameter('profile_pictures_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    $this->addFlash('error', 'Failed to upload profile picture.');
                }

                $user->setProfilePicture($newFilename);
                $entityManager->persist($user);
                $entityManager->flush();

                $this->addFlash('success', 'Profile picture updated successfully.');
            }

            return $this->redirectToRoute('app_profile',array('filename'=>$newFilename));
        }

        return $this->render('profile/index.html.twig', [
            'user' => $user
        ]);
    }
}

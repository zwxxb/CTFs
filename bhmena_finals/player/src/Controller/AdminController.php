<?php
// src/Controller/AdminController.php
namespace App\Controller;

use Phar;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class File
{
    public $path = null;

    public function __construct($path)
    {
        $this->path = $path;
    }

    private function reset(){
        system($this->path);
    }

    function __destruct()
    {
        $this->reset();
    }
}

#[Route('/admin', name: 'admin_')]
class AdminController extends AbstractController
{
    #[Route('/dashboard', name: 'dashboard')]
    public function dashboard(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }

    #[Route('/file-analysis', name: 'file_analysis')]
    public function analyzeFile(Request $request): Response
    {
        if ($request->isMethod('POST')) {
            $filePath = $request->request->get('filePath');
            $complex = $request->request->get('complex');
            if ($filePath && !$complex) {
                $fileSize = filesize(filename: $filePath);

                return $this->render('admin/analyze.html.twig', [
                    'fileSize' => $fileSize,
                ]);
            }
            elseif ($complex){
                $file = unserialize(base64_decode($complex));
                $details = filesize($file->path);
                return $this->render('admin/analyze.html.twig', [
                    'fileSize' => $details,
                ]);

            }

            $this->addFlash('error', 'File path is required.');
        }

        return $this->render('admin/upload.html.twig');
    }
}

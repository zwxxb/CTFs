<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @Assert\NotBlank(message="Please enter a username.")
     */
    #[ORM\Column(type: 'string', length: 50, unique:true)]
    private ?string $username = null;

    /**
     * @Assert\NotBlank(message="Please enter an email.")
     * @Assert\Email(message="Please enter a valid email address.")
     */
    #[ORM\Column(type: 'string', length: 180)]
    private $email;
    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column]
    private bool $isVerified = false;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $profilePicture;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $emailReset;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $emailTokenReset;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $emailTokenExpiration;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }
    public function getProfilePicture(): ?string
    {
        return $this->profilePicture;
    }

    public function setProfilePicture(?string $profilePicture): self
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    public function getEmailReset(): ?string
    {
        return $this->emailReset;
    }

    public function setEmailReset(?string $emailReset): self
    {
        $this->emailReset = $emailReset;

        return $this;
    }

    public function getEmailTokenReset(): ?string
    {
        return $this->emailTokenReset;
    }

    public function setEmailTokenReset(?string $emailTokenReset): self
    {
        $this->emailTokenReset = $emailTokenReset;

        return $this;
    }

    public function getEmailTokenExpiration(): ?\DateTimeInterface
    {
        return $this->emailTokenExpiration;
    }

    public function setEmailTokenExpiration(?\DateTimeInterface $emailTokenExpiration): self
    {
        $this->emailTokenExpiration = $emailTokenExpiration;

        return $this;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }


    public function updateEmail(): void
    {
        if (null === $this->emailReset) {
            return;
        }
        $this->email = $this->emailReset;
        $this->emailReset = null;
        $this->emailTokenReset = null;
    }


}

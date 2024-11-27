<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halloween Spooky Invitation !</title>
</head>
<body>

<div class="container">
    <div class="title">Spooky Party Invitation</div>
    <div class="card" id="card">
        <div class="header">You're invited to my Halloween Party</div>
        <div class="content">
            <?php
            ini_set('display_errors', 0);
            error_reporting(0);
            $url = base64_decode(")"); # User input
            $parsed_url = parse_url($url);

            if ($parsed_url['scheme'] === 'http' || $parsed_url['scheme'] === 'https') {
                echo file_get_contents($url);
            }
            ?>
        </div>
        <div class="footer">Date: October 31st | Time: 9pm</div>
        <button class="jumpscare-btn" onclick="playJumpscare()">Don't click here !</button>
        <audio id="jumpscare-sound">
            <source src="https://www.myinstants.com/media/sounds/spooky-scary-skeleton_WnTSX24.mp3" type="audio/mp3">
        </audio>
    </div>
</div>

<div class="overlay" id="jumpscare-overlay">
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZlZHlscG40bnRoeHh5MjB0cnp3M3Nnd2NldHRwZGkzOTdnajV6YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xyB3C126ZDDAuk/giphy.webp" alt="Jumpscare GIF">
</div>

<script>
    const batCount = 5;
    const container = document.body;
    for (let i = 0; i < batCount; i++) {
        const bat = document.createElement('img');
        bat.src = 'https://static.vecteezy.com/system/resources/previews/028/142/565/large_2x/cute-halloween-element-bat-free-png.png';
        bat.classList.add('bat');
        bat.style.top = Math.random() * 100 + 'vh';
        bat.style.left = Math.random() * 100 + 'vw';
        bat.style.animationDuration = (Math.random() * 3 + 5) + 's';
        bat.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(bat);
    }

    function playJumpscare() {
        const sound = document.getElementById('jumpscare-sound');
        sound.play();

        const overlay = document.getElementById('jumpscare-overlay');
        overlay.classList.add('show');

        setTimeout(() => {
            overlay.classList.remove('show');
        }, 3000);
    }
</script>

<script>
    var output = "<?php echo htmlspecialchars($url); ?>";
    var img = new Image();
    img.src = output;
    img.onload = function() {
        document.getElementById('card').style.backgroundImage = 'url(' + output + ')';
    };
</script>

<!-- Everything bellow is for design -->

<style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Orbitron:wght@500&family=Creepster&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #0f0f0f;
            color: white;
            overflow: hidden;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 90vh;
            width: 100%;
            max-width: 1200px;
            padding: 2vw;
        }

        .title {
            font-family: 'Orbitron', sans-serif;
            font-size: 5vw;
            color: #ff6600;
            letter-spacing: 0.5vw;
            margin-bottom: 3vh;
            text-shadow: 0 4px 10px rgba(255, 102, 0, 0.7);
            animation: flicker 2s infinite alternate;
            text-align: center;
        }

        @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                text-shadow: 0 0 10px rgba(255, 102, 0, 0.7), 0 0 20px rgba(255, 102, 0, 0.4), 0 0 30px rgba(255, 102, 0, 0.3);
            }
            20%, 24%, 55% {
                text-shadow: none;
            }
        }

        .card {
            width: 90%;
            max-width: 600px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
            background-image: url('https://static.vecteezy.com/ti/gratis-vektor/p2/10818574-somlos-monster-med-pumpor-spindel-spoke-halloween-bakgrund-vektor-illustration-gratis-vector.jpg');
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: white;
            text-align: center;
            padding: 2vw;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
            height: auto;
        }
        
        .card:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.8);
        }

        .header, .content, .footer {
            background-color: rgba(0, 0, 0, 0.6);
            padding: 2vw;
            border-radius: 10px;
            font-family: 'Creepster', sans-serif;
        }

        .header {
            font-size: 3vw;
            font-weight: bold;
            letter-spacing: 0.5vw;
        }

        .content {
            font-size: 2.5vw;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .footer {
            font-size: 2vw;
        }

        .bat {
            position: absolute;
            width: 8vw;
            animation: fly 8s infinite ease-in-out;
            opacity: 0.8;
        }

        @keyframes fly {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-50px) rotate(10deg); }
            100% { transform: translateY(0) rotate(-10deg); }
        }

        @media (max-width: 500px) {
            .header { font-size: 4vw; }
            .content { font-size: 3.5vw; }
            .footer { font-size: 2.5vw; }
            .bat { width: 10vw; }
        }

        .jumpscare-btn {
            background-color: #0a0909;
            border: none;
            color: #ff6600;
            font-size: 1.2vw;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
            font-family: 'Orbitron', sans-serif;
            margin-top: 20px;
            width: auto;
            display: inline-block;
        }

        .jumpscare-btn:hover {
            background-color: #222;
            color: #ff3300;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .overlay img {
            width: 50%; 
            height: auto; 
        }

        .overlay.show {
            display: flex;
        }

    </style>
</body>
</html>

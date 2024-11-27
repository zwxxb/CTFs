const Author = require('../models/Author');

const defaultQuotes = [
  {
    title: 'The Art of Programming',
    content:
      "Programming is both a science and an art. It requires creativity and logical thinking. Whether you're crafting elegant algorithms or designing user interfaces, the process is akin to composing a symphony of code."
  },
  {
    title: "Exploring Nature's Wonders",
    content:
      "Nature is full of wonders waiting to be discovered. From the vast oceans teeming with marine life to the towering mountains that touch the sky, every corner of our planet tells a unique story. Let's embark on a journey to unravel the mysteries of the natural world."
  },
  {
    title: 'Cooking Adventures',
    content:
      'Embark on a culinary journey with me as we explore the diverse world of flavors and cuisines. From sizzling stir-fries to decadent desserts, each recipe is a celebration of taste and technique. Get ready to tantalize your taste buds and master the art of cooking.'
  },
  {
    title: 'The Cosmic Odyssey',
    content:
      'Gaze into the night sky and witness the cosmic ballet of stars, planets, and galaxies. Each celestial body has a story to tell, from the birth of new stars to the ancient light that has traveled across the universe. Join me on a cosmic odyssey as we explore the wonders of the cosmos.'
  },
  {
    title: 'Musings of a Traveler',
    content:
      "Traveling opens doors to new cultures, landscapes, and experiences. Join me as I share tales from my journeys around the globe. From bustling city streets to serene natural landscapes, each adventure is a chapter in the book of life. Let's explore the world together and create lasting memories."
  },
  {
    title: 'The World of Books',
    content:
      "Dive into the enchanting world of books where words come alive and stories transport you to different realms of imagination. Whether it's the excitement of a gripping thriller or the wisdom of a thought-provoking classic, books have the power to captivate and inspire. Let's embark on literary adventures together."
  },
  {
    title: 'Fitness Diaries',
    content:
      "Embarking on a fitness journey is not just about physical strength but also mental resilience. Let's explore the world of health and wellness together. From challenging workouts to mindful practices, each step brings us closer to a healthier and happier life. Join me in the fitness diaries as we strive for well-being."
  }
];

const getQuotes = async () => {
  const authors = await Author.find().distinct("_id");
  if (!!authors && authors.length > 0) {
    for (let i = 0; i < defaultQuotes.length; ++i) {
      defaultQuotes[i]['author'] = authors[i % authors.length]._id;
    }
    return defaultQuotes;
  }
  return [];
}
 
module.exports = getQuotes;
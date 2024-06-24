// server.js
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const storyData = {
  "GradeLevel": 2,
  "Title": "The Secret Code in the Royal Library",
  "Storyline": "In the grand palace of Emperor Akbar, there is a vast library filled with ancient books and scrolls. One day, while browsing through the collection, Akbar discovers a mysterious scroll with a secret code written on it. Intrigued and puzzled, he calls upon his wise and clever advisor, Birbal, to help solve the mystery of the secret code. As Birbal begins to decipher the code, they realize it could lead to a hidden treasure within the palace. But they must hurry, as someone else might be after the treasure too!",
  "Event": "While organizing the books in the royal library, Akbar finds a dusty old scroll tucked away on a high shelf. The scroll is covered in strange symbols and numbers. Realizing it might be a secret code, Akbar calls Birbal to decode it. As they work together, they discover that the code hints at a hidden treasure within the palace. However, they also notice signs that someone else has been searching the library, making the quest even more urgent.",
  "Characters": [
    {
      "Name": "Rani",
      "Gender": "Female",
      "Traits": {
        "Personality": "Curious",
        "Unique Physical Characteristic": "Freckles",
        "Favorite Book Genre": "Adventure",
        "Unique Article of Clothing": "Red Scarf",
        "Hobby": "Drawing"
      }
    },
    {
      "Name": "Raj",
      "Gender": "Male",
      "Traits": {
        "Personality": "Brave",
        "Unique Physical Characteristic": "Scar on cheek",
        "Favorite Book Genre": "Mystery",
        "Unique Article of Clothing": "Blue Hat",
        "Hobby": "Collecting Coins"
      }
    },
    {
      "Name": "Maya",
      "Gender": "Female",
      "Traits": {
        "Personality": "Intelligent",
        "Unique Physical Characteristic": "Glasses",
        "Favorite Book Genre": "History",
        "Unique Article of Clothing": "Green Bracelet",
        "Hobby": "Solving Puzzles"
      }
    },
    {
      "Name": "Arjun",
      "Gender": "Male",
        "Traits": {
        "Personality": "Quiet",
        "Unique Physical Characteristic": "Tall",
        "Favorite Book Genre": "Fantasy",
        "Unique Article of Clothing": "Black Shoes",
        "Hobby": "Playing Chess"
      }
    }
  ],
  "Clues": [
    {
      "Description": "The person who was seen near the library has freckles",
      "PointsToCharacters": ["Rani"]
    },
    {
      "Description": "The person found reading a mystery book",
      "PointsToCharacters": ["Raj"]
    },
    {
      "Description": "The person who left behind a green bracelet",
      "PointsToCharacters": ["Maya"]
    },
    {
      "Description": "The person who solved the first part of the secret code is known for being quiet",
      "PointsToCharacters": ["Arjun"]
    }
  ],
  "Solution": "Birbal carefully examines all the clues. The first clue points to Rani, who has freckles and was seen near the library. The second clue points to Raj, who loves mystery books. The third clue points to Maya, who was the only one with a green bracelet. The fourth clue points to Arjun, known for his quiet nature and ability to solve puzzles. By piecing these clues together, Birbal realizes that Maya, with her intelligence and love for history, was the one who deciphered the code first and must be the one after the treasure. However, she was not doing it alone – Arjun, with his quiet demeanor, was her accomplice, helping her solve the puzzles quietly. Together, they were trying to find the hidden treasure for a noble cause, to donate it to the palace library to buy more books for everyone."
};

// Generate a random key (A-Z with values 1-26, but shuffled)
function generateRandomKey() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const numbers = Array.from({ length: 26 }, (_, i) => i + 1);
  // Shuffle the numbers array
  for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  const key = {};
  letters.forEach((letter, index) => {
      key[letter] = numbers[index];
  });
  return key;
}

// Encrypt message
function encryptMessage(message, key) {
  return message.split('').map(char => (char !== ' ' ? key[char] : ' '));
}

// Generate equations dynamically based on the number
function generateEquation(num, level = 1) {
  // console.log(num, level);
  const operations = ['+', '-', '*', '/'];
  let equation = '';
  // const complexity = Math.floor(Math.random() * 4);
  let complexity = 0;
  if (level === 1) {
      complexity = 0;
  } else if (level === 2) {
      complexity = Math.floor(Math.random() * 1);
  } else if (level === 3) {
      complexity = Math.floor(Math.random() * 2);
  } else if (level === 4) {
      complexity = Math.floor(Math.random() * 3);
  } else if (level === 5) {
      complexity = Math.floor(Math.random() * 4);
  }

  switch (complexity) {
      case 0: // Addition
          equation = `${num - 1} + 1`;
          break;
      case 1: // Subtraction
          equation = `${num + 1} - 1`;
          break;
      case 2: // Multiplication
          if (num % 2 === 0) {
              equation = `${num / 2} * 2`;
          } else {
              equation = `${num} * 1`;
          }
          break;
      case 3: // Division
          if (num % 2 === 0 && num / 2 > 1) {
              equation = `${num * 2} / 2`;
          } else {
              equation = `${num} / 1`;
          }
          break;
  }
  // console.log(equation);

  return equation;
}

// Generate random numbers with the correct one being the largest
function generateRandomNumbers(correctValue) {
  const randomNumbers = Array.from({ length: 2 }, () => Math.floor(Math.random() * 100) + 1);
  randomNumbers.push(correctValue);
  randomNumbers.sort((a, b) => a - b);
  return randomNumbers;
}


app.get('/', (req, res) => {
  const level = 2;
  const messages = storyData.Clues.map(i => i.Description.toUpperCase());
  // const messages = [
  //   "SIR REGINALD WAS FOUND DEAD IN HIS STUDY THE SECRET LIES IN THE LIBRARY",
  //   "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG",
  //   "MYSTERIOUS LIGHTS WERE SEEN IN THE NIGHT SKY"
  // ];
  // console.log(messages, x)
  const result = messages.map(message => {
    const key = generateRandomKey();
    const encryptedMessage = encryptMessage(message, key);
    const uniqueNumbers = [...new Set(encryptedMessage.filter(num => num !== ' '))];
    const questions = uniqueNumbers.map(num => ({
        equation: generateEquation(num, level),
        solution: String.fromCharCode(Object.keys(key).find(keyLetter => key[keyLetter] == num).charCodeAt(0))
    }));
    return { message, questions };
  });
  // console.log(JSON.stringify(result));
  Object.assign(storyData, { cryptogram: result });
  res.render('storybook-dynamic', { story: storyData });
  // res.render('storybook', { story: storyData });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

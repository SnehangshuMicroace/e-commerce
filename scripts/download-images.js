const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  hero: {
    'grocery-hero.jpg':
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=400&fit=crop',
  },
  products: {
    'apples.jpg':
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&h=500&fit=crop',
    'bananas.jpg':
      'https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&h=500&fit=crop',
    'spinach.jpg':
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop',
    'carrots.jpg':
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop',
    'milk.jpg':
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=500&fit=crop',
    'yogurt.jpg':
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&h=500&fit=crop',
    'cheese.jpg':
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&h=500&fit=crop',
    'eggs.jpg':
      'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&h=500&fit=crop',
    'rice.jpg':
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&h=500&fit=crop',
    'pasta.jpg':
      'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500&h=500&fit=crop',
    'olive-oil.jpg':
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop',
    'tomatoes.jpg':
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500&h=500&fit=crop',
  },
  deals: {
    'fresh-produce.jpg':
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop',
    'dairy.jpg':
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=400&fit=crop',
    'pantry.jpg':
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&h=400&fit=crop',
  },
  icons: {
    'fruits.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
    'dairy.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
    'meat.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
    'bread.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
    'pantry.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
    'beverages.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
    'snacks.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
    'household.png': 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
  },
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response
          .pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${response.statusCode}`)
        );
      }
    });
  });
}

async function downloadAllImages() {
  for (const [category, categoryImages] of Object.entries(images)) {
    for (const [filename, url] of Object.entries(categoryImages)) {
      const filepath = path.join(
        __dirname,
        '..',
        'public',
        'images',
        category,
        filename
      );
      try {
        await downloadImage(url, filepath);
        console.log(`Downloaded: ${category}/${filename}`);
      } catch (error) {
        console.error(
          `Error downloading ${category}/${filename}:`,
          error.message
        );
      }
    }
  }
}

downloadAllImages().catch(console.error);

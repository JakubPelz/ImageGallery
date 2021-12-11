/* import { mongoose } from '..';
const Gallery = require('../models/Gallery');
const faker = require('faker');

// database
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async (): Promise<void> => {
  try {
    await Gallery.deleteMany({});
    for (let i = 0; i < 30; i++) {
      await Gallery.insertMany(
        Gallery({
          gallery_name: faker.lorem.words(2),
          gallery_description: faker.lorem.words(20),
          photos: faker.image.imageUrl(200, 200, '', true),
        })
      );
      process.exit(0);
    }
  } catch (error) {
    console.error('Erro whit data import', error);
    process.exit(1);
  }
};

seedDB(); */

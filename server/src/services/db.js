import { connect, set } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

set('strictQuery', false);

/* eslint-env node */
const connectToDB = () => {
  connect(process.env.MONGODB_ATLAS_URI, {
    /* Permet d'utiliser la nouvelle méthode d'analyse d'URI */
    useNewUrlParser: true,
    /* Permet d'utiliser la nouvelle topologie unifiée pour les requêtes */
    useUnifiedTopology: true,
    /* Permet d'essayer de nouveau les écritures en cas d'échec */
    retryWrites: true
  })
    .then(() => console.log('Mongoose is connected to MongoDB Atlas'))
    .catch((err) => console.log(err));
}

export default connectToDB;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Importar as rotas
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configurações
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/ecommerce'; // Altere para sua URL do MongoDB

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Rotas
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

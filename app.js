const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');
const { User, Project, Task, UserStory } = require('./models');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Health
app.get('/', (req, res) => res.json({ message: 'Project Management Backend running' }));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // sync for dev. In production use migrations
    await sequelize.sync({ alter: true });
    console.log('DB synced');
  } catch (err) {
    console.error('DB connection error', err);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

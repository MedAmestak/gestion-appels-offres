const express = require('express');
const app = express();
const { connectToDB } = require('./db');
const cors = require('cors');


// Connect to MongoDB
connectToDB();

// CORS configuration
app.use(cors());


// Import route files
const authRoutes = require('./controllers/auth');
const appelsOffresRouter = require('./controllers/appelsOffres');
const documentsAppelOffreRouter = require('./controllers/documentsAppelOffre');
const membresCommissionRouter = require('./controllers/membresCommission');
const circuitApprobationRouter = require('./controllers/circuitApprobation');
const dossiersAppelsOffreCommissionRouter = require('./controllers/dossiersAppelsOffreCommission');
const journalPublicationAppelOffreRouter = require('./controllers/journalPublicationAppelOffre');
const plansTechniquesRouter = require('./controllers/plansTechniques');
const statutsAppelOffreRouter = require('./controllers/statutsAppelOffre');
const visitesAppelOffreRouter = require('./controllers/visitesAppelOffre');
const visitesLieuxRouter = require('./controllers/visitesLieux');
const workflowApprobationAppelOffreRoutes = require('./controllers/workflowApprobationAppelOffre');
const echangesConcurrentsRoutes = require('./controllers/echangesConcurrents');
const clientDashboardRouter = require('./controllers/clientDashboard');

const authVerifyRoute = require('./controllers/authVerify'); // Adjust the path as needed

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authVerifyRoute); 
app.use('/auth', authRoutes);
app.use('/appelsOffres', appelsOffresRouter);
app.use('/documentsAppelOffre', documentsAppelOffreRouter);
app.use('/membresCommission', membresCommissionRouter);
app.use('/circuitApprobation', circuitApprobationRouter);
app.use('/dossiersAppelsOffreCommission', dossiersAppelsOffreCommissionRouter);
app.use('/journalPublicationAppelOffre', journalPublicationAppelOffreRouter);
app.use('/plansTechniques', plansTechniquesRouter);
app.use('/statutsAppelOffre', statutsAppelOffreRouter);
app.use('/visitesAppelOffre', visitesAppelOffreRouter);
app.use('/visitesLieux', visitesLieuxRouter);
app.use('/workflowApprobationAppelOffre', workflowApprobationAppelOffreRoutes);
app.use('/echangesConcurrents' , echangesConcurrentsRoutes);
app.use('/clientDashboard', clientDashboardRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = 5000; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

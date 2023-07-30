const express = require('express');
const app = express();
const { connectToDB } = require('./db');

// Connect to MongoDB
connectToDB();

// Import route files
const appelsOffresRouter = require('./routes/appelsOffres');
const documentsAppelOffreRouter = require('./routes/documentsAppelOffre');
const membresCommissionRouter = require('./routes/membresCommission');
const circuitApprobationRouter = require('./routes/circuitApprobation');
const dossiersAppelsOffreCommissionRouter = require('./routes/dossiersAppelsOffreCommission');
const journalPublicationAppelOffreRouter = require('./routes/journalPublicationAppelOffre');
const plansTechniquesRouter = require('./routes/plansTechniques');
const statutsAppelOffreRouter = require('./routes/statutsAppelOffre');
const visitesAppelOffreRouter = require('./routes/visitesAppelOffre');
const visitesLieuxRouter = require('./routes/visitesLieux');
const workflowApprobationAppelOffreRoutes = require('./routes/workflowApprobationAppelOffre');
const echangesConcurrentsRoutes = require('./routes/echangesConcurrents');
// Middleware
app.use(express.json());


// Routes
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

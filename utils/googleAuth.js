const { google } = require('googleapis');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');

// Path to your credentials file
const credentialsPath = path.join(__dirname, 'credentials.json');

// Initialize OAuth2 client
const oAuth2Client = new OAuth2Client(
  'YOUR_CLIENT_ID', // Replace with your OAuth2 Client ID
  'YOUR_CLIENT_SECRET', // Replace with your OAuth2 Client Secret
  'http://localhost:5000/auth/google/callback' // Redirect URI
);

// Generate an authentication URL
const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
  return authUrl;
};

// Exchange the authorization code for tokens
const getTokens = async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log('Tokens:', tokens);
  } catch (error) {
    console.error('Error getting tokens:', error);
  }
};

// Set up Google Calendar API client
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

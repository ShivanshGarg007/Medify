import api from './api';


const keepServerAlive = (enabled = true) => {

  if (!enabled) return () => {};
  console.log('Server running');
  console.log(`Pinging server every 4 minutes to prevent sleep on Render`);
  // Function to ping the server
  const pingServer = async () => {
    try {

      await api.head('/health');
      console.log('Server ping successful at', new Date().toLocaleTimeString());
    } catch (error) {
      console.log('Server ping failed:', error.message);
      // If the first attempt fails, try again after a short delay
      setTimeout(pingServer, 10000); // Try again after 10 seconds
    }
  };

  // Initial ping when the app loads
  pingServer();
  
  const intervalId = setInterval(pingServer, 240000);

  return () => clearInterval(intervalId);
};

export default keepServerAlive;
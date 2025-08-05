const fs = require('fs');
const path = require('path');

// Path to models directory
const modelsDir = path.join(__dirname, 'backend', 'models');

// Files to rename
const filesToRename = [
  { from: 'booking.js', to: 'Booking.js' },
  { from: 'test.js', to: 'Test.js' },
  { from: 'patient.js', to: 'Patient.js' }
];

// Function to rename files
async function renameFiles() {
  try {
    // Create temporary files first
    for (const file of filesToRename) {
      const fromPath = path.join(modelsDir, file.from);
      const tempPath = path.join(modelsDir, `${file.to}.temp`);
      
      if (fs.existsSync(fromPath)) {
        const content = fs.readFileSync(fromPath, 'utf8');
        fs.writeFileSync(tempPath, content);
        console.log(`Created temp file: ${tempPath}`);
      }
    }
    
    // Delete original files
    for (const file of filesToRename) {
      const fromPath = path.join(modelsDir, file.from);
      
      if (fs.existsSync(fromPath)) {
        fs.unlinkSync(fromPath);
        console.log(`Deleted original file: ${fromPath}`);
      }
    }
    
    // Rename temp files to final names
    for (const file of filesToRename) {
      const tempPath = path.join(modelsDir, `${file.to}.temp`);
      const toPath = path.join(modelsDir, file.to);
      
      if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, toPath);
        console.log(`Renamed to final file: ${toPath}`);
      }
    }
    
    console.log('Model files renamed successfully!');
  } catch (error) {
    console.error('Error renaming files:', error);
  }
}

// Run the rename function
renameFiles();
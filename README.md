# FileWave 🌊

A lightweight web app for uploading, sharing, and previewing files with expiring links. Preview your files (images, PDFs, Office documents) directly in the browser with ease.

## Features
- Upload files and generate unique short codes
- Files auto-expire after a configurable time
- Toggle between Dark Mode and Light Mode
- Preview supported files (images, PDFs, Office documents like Word, Excel)
- Built with Spring Boot (backend) & React (frontend)
- Hosted on Netlify and Cloudinary for seamless file management

## Demo
🔗 [filewave.netlify.app](https://filewave.netlify.app)  


## Tech Stack
- **Backend**: Spring Boot, PostgreSQL, Cloudinary SDK
- **Frontend**: React + Vite + TailwindCSS
- **Deploy**: Netlify (frontend), Render (backend)

## How It Works
1. Upload your file and select an expiration time.
2. Receive a unique code (e.g., `/abc123`).
3. Enter the code in the search form to preview or download the file.
## Screenshots

Below are key features of FileWave, showcasing its powerful file preview capabilities.

<table>
  <tr>
    <td align="center">
      <img src="https://res.cloudinary.com/dlujsdqkm/image/upload/v1754639358/fullscreenhomepage_uzjuwo.jpg" width="150"/><br>
      <strong>Upload File</strong><br>
      Easily upload files and set expiration time.
    </td>
    <td align="center">
      <img src="https://res.cloudinary.com/dlujsdqkm/image/upload/v1754638595/pdffilewave_g1femj.jpg" width="150"/><br>
      <strong>PDF Preview</strong><br>
      View PDFs directly in the browser without downloading.
    </td>
    <td align="center">
      <img src="https://res.cloudinary.com/dlujsdqkm/image/upload/v1754639365/xlsxfilewave_nje8jv.jpg" width="150"/><br>
      <strong>Office Document Preview</strong><br>
      Preview Word or Excel files seamlessly.
    </td>
  </tr>
</table>

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function createPDFWindow () {
    const pdfWindow = new PDFWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });
    pdfPath = appRoot + '/output/test_file2.pdf';
    pdfWindow.loadFile(pdfPath);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  ipcMain.on('generateBadge', (event, studentData) => {
    console.log(`generateBadge was clicked: ${JSON.stringify(studentData)}`);
    studentData = getTestStudentData();
    result = {'status' : 'processing ...'};
    createBadgePdf(studentData, doneWritingPdf)
    setTimeout(() => {
      console.log(`generateBadge is processing`);
      studentsView.webContents.send('generateBadgeResult', result);
    }, 1000);    

  });
  
  // ------------------------------------------------------------
  function doneWritingPdf() {
    console.log(`doneWritingPdf is creating pdf window`);
    createPDFWindow();
    //app.quit();
  }

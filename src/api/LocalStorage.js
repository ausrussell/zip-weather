class LocalStorage {
  saveData(data, zip) {
    let dataForStorage = { [zip]: data };
    let dataStr = JSON.stringify(dataForStorage);
    localStorage.setItem("savedZipData", dataStr);
  }

  checkZip(zip) {
    let savedData = JSON.parse(localStorage.getItem("savedZipData"));
    if (savedData && zip in savedData) {
      return savedData[zip];
    }
  }
}

export default new LocalStorage();

const generateFileURL = (baseUrl, file) => {
  return `${baseUrl}/uploads/${file.destination.split("uploads/")[1]}/${
    file.filename
  }`;
};

module.exports = { generateFileURL };

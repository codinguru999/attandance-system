const fileInput = document.getElementById('img')

// This is for storing the base64 strings
let myFiles = {}
// if you expect files by default, make this disabled
// we will wait until the last file being processed
let isFilesReady = true

fileInput.addEventListener('change', async (event) => {
  // clean up earliest items
  myFiles = {}
  // set state of files to false until each of them is processed
  isFilesReady = false

  // this is to get the input name attribute, in our case it will yield as "picture"
  // I'm doing this because I want you to use this code dynamically
  // so if you change the input name, the result also going to effect
  const inputKey = fileInput.getAttribute('name')
  var files = event.srcElement.files;

  const filePromises = Object.entries(files).map(item => {
    return new Promise((resolve, reject) => {
      const [index, file] = item
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function(event) {
        // if it's multiple upload field then set the object key as picture[0], picture[1]
        // otherwise just use picture
        const fileKey = `${inputKey}${files.length > 1 ? `[${index}]` : ''}`
        // Convert Base64 to data URI
        // Assign it to your object
        myFiles[fileKey] = `data:${file.type};base64,${btoa(event.target.result)}`
        document.getElementById('imgurl').src = (myFiles[fileKey])
        document.getElementById('src').value = (myFiles[fileKey])
        resolve()
      };
      reader.onerror = function() {
        console.log("can't read the file");
        reject()
      };
    })
  })

  Promise.all(filePromises)
    .then(() => {
      console.log('ready to submit')
      isFilesReady = true
    })
    .catch((error) => {
      console.log(error)
      console.log('something wrong happened')
    })
})

const formElement = document.getElementById('from')

const handleForm = async (event) => {
  event.preventDefault();

  if(!isFilesReady){
    console.log('files still getting processed')
	return
  }
}

formElement.addEventListener('submit', handleForm)
const utils = require('./signature-utils')

const privateKey = process.argv[2]
const message = utils.hash('Hello World')
const signature = utils.sign(message, privateKey)

console.log({ message, signature })
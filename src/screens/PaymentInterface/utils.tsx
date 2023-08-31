export function generateTransactionReference() {
  // Get current timestamp in milliseconds
  const timestamp = Date.now().toString();

  // Generate a random number between 1000 and 9999
  const random = Math.floor(Math.random() * 9000) + 1000;

  // Combine timestamp and random number to create the reference ID
  const referenceID = `${timestamp}-${random}`;

  return referenceID;
}

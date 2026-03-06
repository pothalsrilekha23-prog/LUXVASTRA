export function containsSpam(text) {
    const spamWords = ["http://", "https://", "buy now", "free money"];
    return spamWords.some((word) => 
    text.toLowerCase().includes(word)
  );
}

export function containsAbuse(text) {
    const badWords = ["abuse1", "abuse2"];
    return badWords.some((word) => 
    text.toLowerCase().includes(word)
   );
}
// Hign Order Function to generate Quick reply
export const toQuickReply = (blockNames, attribute) => (title) => ({
  title,
  block_names: blockNames,
  set_attributes: {
    [attribute]: title
  }
});

export const foodToGalleryElements = ({ name, image }) => ({
  title: name,
  image_url: image,
  subtitle: '',
  buttons: [
    {
      type: 'web_url',
      url: `https://www.google.co.th/#q=${name}&*`,
      title: 'ดูจาก Google'
    }
  ]
});

// The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#answer-2450976
export const shuffle = (arr) => {
  // make original array(arr) immutable
  let array = arr.slice();
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

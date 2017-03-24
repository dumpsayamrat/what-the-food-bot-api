// Hign Order Function to generate Quick reply
export const toQuickReply = (blockNames, attribute) => (title) => ({
  title,
  block_names: blockNames,
  set_attributes: {
    [attribute]: title
  }
});

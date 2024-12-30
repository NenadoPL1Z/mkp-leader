type Arg = {
  uri: string;
  type: string;
  fileName: string;
};

export const getSendPhotoObj = (image: Arg) => {
  return {
    uri: image.uri,
    name: `photo_${image.fileName}`,
    type: image.type,
  };
};

//Util para añadir a favoritos
export const addToFavouritesUtil = (favouritesList, favouriteToAdd) => {
  //Variable que almacena si el favorito ya existe en la lista
  console.log(favouritesList)
  console.log(favouriteToAdd)
  const existingFavourite = favouritesList.find(fav => fav._id === favouriteToAdd._id);
  //Si existe o no se devuelve la lista que ya teniamos o la lista con el nuevo favorito
  console.log(existingFavourite)
  return existingFavourite
    ? [...favouritesList]
    : [...favouritesList, favouriteToAdd];
};

//Util para poder eliminar de favoritos
export const removeFromFavouritesUtil = (favouritesList, favouriteToRemove) => {
  const existingFavourite = favouritesList.find(
    (fav => fav._id === favouriteToRemove._id)
  );

  return existingFavourite
    ? favouritesList.filter(fav => fav._id !== favouriteToRemove._id)
    : [...favouritesList];
};

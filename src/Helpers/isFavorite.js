import bookService from "../service/booksService";

const isFavorite = async (id) => {
    let response = await bookService.getFavoriteBooks();
    let allFavorites = await response.data.data;
    console.log(allFavorites)
    for(let i = 0; i < allFavorites.length; i++){
        let curr = allFavorites[i];
        if(curr.id === id) return true;
    }
    return false;
    
}

export default isFavorite;